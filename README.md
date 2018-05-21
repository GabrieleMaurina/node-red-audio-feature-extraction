# node-red-contrib-audio-feature-extraction
This module for Node-RED contains a set of nodes which offer audio feature extraction functionalities.
Such nodes have a python core that runs on Librosa library.

## Pre requisites
Install the following python libraries
* Python 3.6.4 or higher accessible with the command 'python' (on linux 'python3')
* Librosa

## Install
To install the stable version use the Menu - Manage palette option and search for node-red-contrib-audio-feature-extraction, or run the following command in your Node-RED user directory (typically ~/.node-red):

    npm i node-red-contrib-audio-feature-extraction

## Usage
These are a few examples of what can be done with this package.
Each node of this library appends its configurations to the msg object.
Only the last node in a flow will carry out all the computations according to all configurations.
The flows and the test audio file are available in the 'test' folder.

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

Example flows available here:
```json
[
    {
        "id": "84125a40.9edab8",
        "type": "sampler",
        "z": "21ce826.2ff977e",
        "name": "",
        "file": "sample.wav",
        "sampleRate": "1000",
        "mono": true,
        "offset": "2",
        "duration": "1",
        "resType": "kaiser_best",
        "x": 220,
        "y": 100,
        "wires": [
            [
                "44114b15.858034"
            ]
        ]
    },
    {
        "id": "44114b15.858034",
        "type": "stft",
        "z": "21ce826.2ff977e",
        "name": "",
        "nFft": "1000",
        "hopLength": "20",
        "windowLength": "50",
        "x": 330,
        "y": 160,
        "wires": [
            [
                "5cad83b3.b2e02c"
            ]
        ]
    },
    {
        "id": "e9503ab2.abcfa8",
        "type": "mfcc",
        "z": "21ce826.2ff977e",
        "name": "",
        "nMFCC": "15",
        "x": 690,
        "y": 340,
        "wires": [
            [
                "d7fbf2f0.1cfcd"
            ]
        ]
    },
    {
        "id": "daae8de1.b89ce",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "Start",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 40,
        "wires": [
            [
                "84125a40.9edab8"
            ]
        ]
    },
    {
        "id": "70f802ff.529a5c",
        "type": "persistance",
        "z": "21ce826.2ff977e",
        "name": "",
        "save": "mfcc",
        "file": "generate new",
        "x": 570,
        "y": 280,
        "wires": [
            [
                "e9503ab2.abcfa8"
            ]
        ]
    },
    {
        "id": "5cad83b3.b2e02c",
        "type": "base path",
        "z": "21ce826.2ff977e",
        "name": "",
        "basePath": "test",
        "x": 440,
        "y": 220,
        "wires": [
            [
                "70f802ff.529a5c"
            ]
        ]
    },
    {
        "id": "d7fbf2f0.1cfcd",
        "type": "file",
        "z": "21ce826.2ff977e",
        "name": "log",
        "filename": "test/log.txt",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "x": 790,
        "y": 400,
        "wires": []
    }
]
```
