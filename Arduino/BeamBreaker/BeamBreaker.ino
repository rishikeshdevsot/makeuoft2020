void setup(){
  pinMode(6,INPUT);
  Serial.begin(9600);
  pinMode(13,OUTPUT);
}

void loop(){
  Serial.print("IRSensorip  ");
  Serial.println(digitalRead(6));
  if(digitalRead(6)==0){
    digitalWrite(13,HIGH);
  }else{
    digitalWrite(13,LOW);
  }
  delay(100);
}
