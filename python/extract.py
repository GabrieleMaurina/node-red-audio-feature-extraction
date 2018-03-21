import sys
import os
import json
import librosa
import numpy
from datetime  import datetime

last_y, last_features, last_wav, last_csv = [None] * 4

while(True):
	y, sr, stft, features, chroma, mfcc, mel, rmse, centroid, bandwidth, contrast, flatness, rolloff, poly, zeroCrossingRate, tonnetz, csvConfig, csvPath, wavConfig, wavPath = [None] * 20

	data = json.loads(input())

	basePath = ''
	if 'basePath' in data:
		basePath = data['basePath']['path'] + '\\'

	if 'sampler' in data:
		file = basePath + data['sampler']['file']
		del data['sampler']['file']
		y, sr = librosa.load(file, **data['sampler'])
	elif 'converter' in data:
		data['converter']['y'] = numpy.array(data['converter']['y'], dtype=numpy.float32)
		if data['converter']['target_sr'] != data['converter']['orig_sr']:
			y = librosa.resample(**data['converter'])
			sr = data['converter']['target_sr']
		else:
			y = data['converter']['y']
			sr = data['converter']['orig_sr']

	if 'stft' in data:
		stft = abs(librosa.stft(y, **data['stft']))
	elif 'collector' in data:
		stft = numpy.array(data['collector']['stft']).T

	if stft is not None:
		features = []
		if 'chroma' in data:
			chroma = librosa.feature.chroma_stft(S=stft, **data['chroma'])
			features.append(chroma.T)
		if 'mfcc' in data:
			mfcc = librosa.feature.mfcc(S=stft, **data['mfcc'])
			features.append(mfcc.T)
		if 'mel' in data:
			mel = librosa.feature.melspectrogram(S=stft, **data['mel'])
			features.append(mel.T)
		if 'rmse' in data:
			rmse = librosa.feature.rmse(S=stft, **data['rmse'])
			features.append(rmse.T)
		if 'centroid' in data:
			centroid = librosa.feature.spectral_centroid(S=stft, **data['centroid'])
			features.append(centroid.T)
		if 'bandwidth' in data:
			bandwidth = librosa.feature.spectral_bandwidth(S=stft, **data['bandwidth'])
			features.append(bandwidth.T)
		if 'contrast' in data:
			contrast = librosa.feature.spectral_contrast(S=stft, **data['contrast'])
			features.append(contrast.T)
		if 'flatness' in data:
			flatness = librosa.feature.spectral_flatness(S=stft, **data['flatness'])
			features.append(flatness.T)
		if 'rolloff' in data:
			rolloff = librosa.feature.spectral_rolloff(S=stft, **data['rolloff'])
			features.append(rolloff.T)
		if 'poly' in data:
			poly = librosa.feature.poly_features(S=stft, **data['rolloff'])
			features.append(poly.T)
		if 'zeroCrossingRate' in data:
			zeroCrossingRate = librosa.feature.zero_crossing_rate(y, **data['zeroCrossingRate'])
			features.append(zeroCrossingRate.T)
		if 'tonnetz' in data:
			kwargs = {'y': y}
			if sr is not None:
				kwargs['sr'] = sr
			if chroma is not None:
				kwargs['chroma'] = chroma
			tonnetz = librosa.feature.tonnetz(**kwargs, **data['tonnetz'])
			features.append(tonnetz.T)

		features = numpy.hstack(features)

		if 'persistance' in data:
			csvConfig = data['persistance']['file']
			csvPath = basePath + data['persistance']['save']

		if csvConfig == 'append':
			if last_features is None:
				try:
					last_features = numpy.loadtxt(csvPath + '.csv', delimiter=',')
				except:
					pass
			if last_features is not None:
				features = numpy.vstack([last_features, features])
				last_features = features

		elif csvConfig == 'generate new':
			if last_csv is None:
				i = 0
			else:
				i = last_csv + 1
			while os.path.exists(csvPath + str(i) + '.csv'):
			    i += 1
			csvPath += str(i)
			last_csv = i

		numpy.savetxt(csvPath + '.csv', features, delimiter=',')

	if 'wav' in data:
		wavPath, wavConfig = data['wav'].values()
		wavPath = basePath + wavPath
		if wavConfig == 'append':
			if last_y is None:
				try:
					last_y, last_sr = librosa.load(wavPath + '.wav', sr=None)
				except:
					pass
			if last_y is not None:
				y = numpy.concatenate((last_y, y))
				last_y = y
		elif wavConfig == 'generate new':
			if last_wav is None:
				i = 0
			else:
				i = last_wav + 1
			while os.path.exists(wavPath + str(i) + '.wav'):
			    i += 1
			wavPath += str(i)
			last_wav = i
		librosa.output.write_wav(wavPath + '.wav', y, sr)

	res = []
	res.append(str(datetime.now()))
	if y is not None:
		res.append('samples: ' + str(y.shape))
	if sr is not None:
		res.append('sample rate: ' + str(sr))
	if stft is not None:
		res.append('stft: ' + str(stft.shape))
	if features is not None:
		res.append('features: ' + str(features.shape))
	if chroma is not None:
		res.append('chroma: ' + str(chroma.shape))
	if mfcc is not None:
		res.append('mfcc: ' + str(mfcc.shape))
	if mel is not None:
		res.append('mel: ' + str(mel.shape))
	if rmse is not None:
		res.append('rmse: ' + str(rmse.shape))
	if centroid is not None:
		res.append('centroid: ' + str(centroid.shape))
	if bandwidth is not None:
		res.append('bandwidth: ' + str(bandwidth.shape))
	if contrast is not None:
		res.append('contrast: ' + str(contrast.shape))
	if flatness is not None:
		res.append('flatness: ' + str(flatness.shape))
	if rolloff is not None:
		res.append('rolloff: ' + str(rolloff.shape))
	if poly is not None:
		res.append('poly: ' + str(poly.shape))
	if zeroCrossingRate is not None:
		res.append('zeroCrossingRate: ' + str(zeroCrossingRate.shape))
	if tonnetz is not None:
		res.append('tonnetz: ' + str(tonnetz.shape))
	if csvConfig is not None:
		res.append('csvConfig: ' + csvConfig)
	if csvPath is not None:
		res.append('csvPath: ' + csvPath)
	if wavConfig is not None:
		res.append('wavConfig: ' + wavConfig)
	if wavPath is not None:
		res.append('wavPath: ' + wavPath)

	res = '\n'.join(res)

	print(res)
