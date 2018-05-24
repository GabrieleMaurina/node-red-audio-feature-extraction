# node-red-contrib-audio-feature-extraction
This module for Node-RED contains a set of nodes which offer audio feature extraction functionalities.
Such nodes have a python core that runs on Librosa library.

## Pre requisites
Be sure to have a working installation of [Node-RED](https://nodered.org/ "Node-RED").  
Install python and the following libraries:
* [Python](https://www.python.org/ "Python") 3.6.4 or higher accessible by the command 'python' (on linux 'python3')
* [Librosa](https://librosa.github.io/librosa/ "Librosa")
* [Numpy](http://www.numpy.org/ "Numpy")

## Install
To install the stable version use the Menu - Manage palette option and search for node-red-contrib-audio-feature-extraction, or run the following command in your Node-RED user directory (typically ~/.node-red):

    npm i node-red-contrib-audio-feature-extraction

## Usage
These are a few examples of what can be done with this package.  
**Warning:** Each node of this library appends its configurations to the msg object. Only the last node in a flow will carry out all the computations according to all configurations.

Flows and a test audio file are available in the 'test' folder. Make sure that the paths specified inside nodes' configurations are correct before trying to execute the program.  
**Tip:** you can run 'node-red' (or 'sudo node-red' if you are uning linux) from the folder '.node-red/node-modules/node-red-contrib-audio-feature-extraction' and the paths will be automatically correct.

Sampling audio file, computing stft and extracting mfcc  
![sampler](https://i.imgur.com/eefncOA.png "Sampling, stft, feature extraction")

Saving wav recieved from mqtt  
![wav](https://i.imgur.com/CXa8V5u.png "Wav from mqtt")

Extract chroma from stft recieved from serial port  
![stft](https://i.imgur.com/sgNRxnC.png "Stft from serial port")

Multiple features allowed  
![features](https://i.imgur.com/e8eClKb.png "Multiple features")

When no persistance and no wav nodes are present, the result is returned by the last block.
Print STFT  
![features](https://i.imgur.com/pS9ZvSO.png "Multiple features")

Example flows available here:
```json
[
    {
        "id": "a69917f5.fec6b8",
        "type": "sampler",
        "z": "21ce826.2ff977e",
        "name": "",
        "file": "sample.wav",
        "sampleRate": "1000",
        "mono": true,
        "offset": "2",
        "duration": "1",
        "resType": "kaiser_best",
        "x": 240,
        "y": 160,
        "wires": [
            [
                "aa7b980b.277768"
            ]
        ]
    },
    {
        "id": "aa7b980b.277768",
        "type": "stft",
        "z": "21ce826.2ff977e",
        "name": "",
        "nFft": "1000",
        "hopLength": "20",
        "windowLength": "50",
        "x": 350,
        "y": 220,
        "wires": [
            [
                "244c7de6.e44682"
            ]
        ]
    },
    {
        "id": "3910427c.761cce",
        "type": "mfcc",
        "z": "21ce826.2ff977e",
        "name": "",
        "nMFCC": "15",
        "x": 710,
        "y": 400,
        "wires": [
            [
                "e669f77a.651a38"
            ]
        ]
    },
    {
        "id": "6669a833.3e3438",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "start",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 130,
        "y": 100,
        "wires": [
            [
                "a69917f5.fec6b8"
            ]
        ]
    },
    {
        "id": "81e5b599.509988",
        "type": "persistance",
        "z": "21ce826.2ff977e",
        "name": "",
        "save": "mfcc",
        "file": "generate new",
        "x": 590,
        "y": 340,
        "wires": [
            [
                "3910427c.761cce"
            ]
        ]
    },
    {
        "id": "244c7de6.e44682",
        "type": "base path",
        "z": "21ce826.2ff977e",
        "name": "",
        "basePath": "test",
        "x": 460,
        "y": 280,
        "wires": [
            [
                "81e5b599.509988"
            ]
        ]
    },
    {
        "id": "e669f77a.651a38",
        "type": "file",
        "z": "21ce826.2ff977e",
        "name": "log",
        "filename": "test/log.txt",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "x": 810,
        "y": 460,
        "wires": []
    }
]
```
