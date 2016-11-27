  byte lampMsg[] = {0x02, 0x13, 0x00};
  byte checker;       // non-rubbish checker
  byte receiveBuf[4]; //sender, receiver, opcode, value;
  int i = 0;
  bool newMsgFlag = 0;

void setup() {
  Serial.begin(19200); // Casambi serial speed
}

void loop() {
/*
  delay(1000);
  lampMsg[2] = 0xFF;
  Serial.write((uint8_t*)lampMsg, sizeof(lampMsg));
  delay(1000);
  lampMsg[2] = 0x00;
  Serial.write((uint8_t*)lampMsg, sizeof(lampMsg));
*/

  //#################################################################################
  if (Serial.available())         // if new byte in UART buffer
  {
    checker = Serial.read();      // check it for non-rubbish
    
    if (checker == 0x05)
    {
      do {} while (Serial.available() != 5);    // wait a bit for whole msg
      checker = Serial.read();    // cut Casambi sys vendorMsg marker
      for (i=0;i<4;i++)           // collect whole "sender, receiver, opcode, value"
      {
        receiveBuf[i] = Serial.read();
        //Serial.println(receiveBuf[i]);
      }
      newMsgFlag = 1;
    }
  }

  //#################################################################################
  if ((newMsgFlag == 1) && (receiveBuf[2] == 0x01))
  {                               // if newMsg & command to change lamp brightness
    lampMsg[2] = (uint8_t)receiveBuf[3];
    Serial.write((uint8_t*)lampMsg, sizeof(lampMsg));
    newMsgFlag = 0;
  }

}
