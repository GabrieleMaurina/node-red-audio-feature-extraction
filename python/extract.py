import sys
import os
import json
import librosa
import numpy

data = json.load(open(sys.argv[1], 'r'))
os.remove(sys.argv[1])

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

	features = []
	if 'chroma' in data:
		features.append(librosa.feature.chroma_stft(S=stft, **data['chroma']).T)
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

	features = numpy.hstack(features)

	saveConfig = data['persistance']['file']
	savePath = basePath + data['persistance']['save']

	if saveConfig == 'append':
		try:
			old_features = numpy.load(basePath + data['persistance']['save'] + '.npy')
			features = numpy.vstack([old_features, features])
		except:
			pass

	elif saveConfig == 'generate new':
		i = 0
		while os.path.exists(savePath + str(i) + '.npy'):
		    i += 1
		savePath += str(i) + '.npy'

	numpy.save(savePath, features)

print('Sample size: ' + str(y.shape))
print('STFT size: ' + str(stft.shape))
print('Features size: ' + str(features.shape))
print('Features extracted')
