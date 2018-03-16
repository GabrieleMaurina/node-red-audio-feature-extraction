#include <Audio.h>

const int myInput = AUDIO_INPUT_MIC;

AudioInputI2S            audioInput;
AudioRecordQueue         queue1;

AudioConnection          patchCord1(audioInput, 0, queue1, 0);

AudioControlSGTL5000     audioShield;

void setup() {
  Serial.begin(115200);
  AudioMemory(60);
  audioShield.enable();
  audioShield.inputSelect(myInput);
  audioShield.micGain(40);  //0-63
  audioShield.volume(0.5);  //0-1

  queue1.begin();
}


byte buffer[256];

void loop(){
  if(queue1.available() > 0){
    memcpy(buffer, queue1.readBuffer(), 256);
    queue1.freeBuffer();
    Serial.write(buffer, 256);
  }
}
