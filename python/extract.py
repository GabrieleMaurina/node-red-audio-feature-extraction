import sys
import os
import json
import librosa
import numpy

while(True):
	data = json.loads(input())

	basePath = ''
	if 'basePath' in data:
		basePath = data['basePath']['path'] + '\\'

	if ('sampler' in data or 'samples' in data) and 'stft' in data and 'persistance' in data:

		if 'sampler' in data:
			file = basePath + data['sampler']['file']
			del data['sampler']['file']
			y, sr = librosa.load(file, **data['sampler'])
		elif 'samples' in data:
			y = data['samples']

		stft = abs(librosa.stft(y, **data['stft']))
		chroma = None

		features = []
		if 'chroma' in data:
			chroma = librosa.feature.chroma_stft(S=stft, **data['chroma'])
			features.append(chroma.T)
		if 'mfcc' in data:
			features.append(librosa.feature.mfcc(S=stft, **data['mfcc']).T)
		if 'mel' in data:
			features.append(librosa.feature.melspectrogram(S=stft, **data['mel']).T)
		if 'rmse' in data:
			features.append(librosa.feature.rmse(S=stft, **data['rmse']).T)
		if 'centroid' in data:
			features.append(librosa.feature.spectral_centroid(S=stft, **data['centroid']).T)
		if 'bandwidth' in data:
			features.append(librosa.feature.spectral_bandwidth(S=stft, **data['bandwidth']).T)
		if 'contrast' in data:
			features.append(librosa.feature.spectral_contrast(S=stft, **data['contrast']).T)
		if 'flatness' in data:
			features.append(librosa.feature.spectral_flatness(S=stft, **data['flatness']).T)
		if 'rolloff' in data:
			features.append(librosa.feature.spectral_rolloff(S=stft, **data['rolloff']).T)
		if 'poly' in data:
			features.append(librosa.feature.poly_features(S=stft, **data['rolloff']).T)
		if 'zeroCrossingRate' in data:
			features.append(librosa.feature.zero_crossing_rate(y, **data['zeroCrossingRate']).T)
		if 'tonnetz' in data:
			kwargs = {'y': y}
			if sr:
				kwargs['sr'] = sr
			if chroma:
				kwargs['chroma'] = chroma
			features.append(librosa.feature.tonnetz(**kwargs, **data['tonnetz']).T)

		features = numpy.hstack(features)

		saveConfig = data['persistance']['file']
		savePath = basePath + data['persistance']['save']

		if saveConfig == 'append':
			try:
				old_features = numpy.loadtxt(savePath + '.csv', delimiter=',')
				features = numpy.vstack([old_features, features])
			except:
				pass

		elif saveConfig == 'generate new':
			i = 0
			while os.path.exists(savePath + str(i) + '.csv'):
			    i += 1
			savePath += str(i)

		numpy.savetxt(savePath + '.csv', features, delimiter=',')

	res = 'Sample size: ' + str(y.shape) + ' STFT size: ' + str(stft.shape) + ' Features size: ' + str(features.shape) + ' Features extracted.'

	print(res)
