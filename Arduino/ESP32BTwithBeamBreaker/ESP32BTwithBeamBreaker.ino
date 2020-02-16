#include "BluetoothSerial.h"

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

BluetoothSerial SerialBT;

// Pins
int onBoardLED=2;               // ESP32 "IO2" = GPIO2 (On-Board LED)
int breakBeamPin=11;            // ESP32 "CMD" = GPIO11 (Break Beam Value={0: Broken,1: Restored})

// State
int isBBOn=0;                   // Alert System Enable
int BBStatus=0;                 // Break Beam Status (0: Broken, 1: Restored)
char recvChar='0';              // Received Message ('0': Disable, '1': Enable)

// Delays
int updateBBMessageDelay=100;   // Break Beam Status Delay (ms)
int updateBTMessageDelay=20;    // BT Communication Delay (ms)
int delayCount=0;               // Delay Tracker (ms)

void setup(){
  // Pin Setup
  pinMode(breakBeamPin,INPUT);  
  pinMode(onBoardLED,OUTPUT);

  // Communication Setup
  Serial.begin(115200); // Baud Rate
  SerialBT.begin("HomeAnalyzer");  //Bluetooth device name
  Serial.println("Device started.");
}

void loop(){
  // Bluetooth Communication
  if(Serial.available()){
    SerialBT.write(Serial.read());
  }
  if(SerialBT.available()){
    //Serial.write(SerialBT.read());
    
    // Enable Alert
    recvChar=SerialBT.read();
    if(recvChar=='0'){
      isBBOn=0;
      Serial.println("Alarm Deactivated.");
      //SerialBT.write("Alarm Deactivated.");
    }
    // Disable Alert
    else if(recvChar=='1'){
      isBBOn=1;
      Serial.println("Alarm Activated.");
      //SerialBT.write("Alarm Activated.");
    }
  }

  // After BB Delay Timer
  if(delayCount>updateBBMessageDelay){
    // Reset BB Delay Timer
    delayCount=0;
    
    // Break Beam Status
    if(isBBOn==1){
      //Serial.print("TripWire: ");
      //Serial.println(digitalRead(breakBeamPin));

      // Break Beam Broken --> Trigger Alarm
      if(digitalRead(breakBeamPin)==0 && BBStatus==1){
        BBStatus=0;
        digitalWrite(onBoardLED,HIGH);
        Serial.println("Unauthorized Entry!");
        SerialBT.write('9');
      }
      // Break Beam Restored
      else if(digitalRead(breakBeamPin)==1 && BBStatus==0){
        BBStatus=1;
        digitalWrite(onBoardLED,LOW);
      }
    }
  }

  // Update BB Delay Timer
  delayCount+=updateBTMessageDelay;
  delay(updateBTMessageDelay);
}
