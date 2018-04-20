# node-red-contrib-audio-feature-extraction
This module provides a set of nodes in Node-RED with audio feature extraction functionalities.
Such nodes have a python core that takes advantage of Librosa library.

## Pre requisites
* Python 3.6.4 or higher
* Librosa

## Install
To install the stable version use the Menu - Manage palette option and search for node-red-contrib-audio-feature-extraction, or run the following command in your Node-RED user directory (typically ~/.node-red):

    npm i node-red-contrib-audio-feature-extraction

## Usage

Sampling audio file, computing stft and extracting mfcc
![sampler](https://i.imgur.com/tiSw40E.png "Sampling, stft, feature extraction")

Saving wav recieved from mqtt
![wav](https://i.imgur.com/CXa8V5u.png "Wav from mqtt")

Extract chroma from stft recieved from serial port
![stft](https://i.imgur.com/sgNRxnC.png "Stft from serial port")

Multiple features allowed
![features](https://i.imgur.com/e8eClKb.png "Multiple features")
