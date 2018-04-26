# node-red-contrib-audio-feature-extraction
This module provides a set of nodes for Node-RED with audio feature extraction functionalities.
Such nodes have a python core that runs Librosa library.

## Pre requisites
* Python 3.6.4 or higher
* Librosa

## Install
To install the stable version use the Menu - Manage palette option and search for node-red-contrib-audio-feature-extraction, or run the following command in your Node-RED user directory (typically ~/.node-red):

    npm i node-red-contrib-audio-feature-extraction

## Usage

Each node of this library appends its configurations to the msg object.
Only the last node in a flow will carry out all the computations according to all configurations.

Sampling audio file, computing stft and extracting mfcc
![sampler](https://i.imgur.com/tiSw40E.png "Sampling, stft, feature extraction")

Saving wav recieved from mqtt
![wav](https://i.imgur.com/CXa8V5u.png "Wav from mqtt")

Extract chroma from stft recieved from serial port
![stft](https://i.imgur.com/sgNRxnC.png "Stft from serial port")

Multiple features allowed
![features](https://i.imgur.com/e8eClKb.png "Multiple features")

When no persistance and no wav nodes are present, the result is returned by the last block.
Print STFT
![features](https://i.imgur.com/3pkAu4S.png "Multiple features")
