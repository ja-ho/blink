#include <Blink.h>

  Blink blink(LED_BUILTIN);
//serial.begin(115200)로 해보고 왜 serial monitor에 쓰레기값이 나오는지 serial library는 115200 bps 까지 지원하는데 9600으로 바꾸니 제대로 출력
void setup() {
  Serial.begin(9600);
  Serial.println("");
  Serial.println("\nBlink Version 1.0 Jaeho Yoon");
}

// the loop function runs over and over again forever
void loop() {
  /*
  digitalWrite(LED_BUILTIN, LOW);   // Turn the LED on (Note that LOW is the voltage level
                                    // but actually the LED is on; this is because 
                                    // it is acive low on the ESP-01)
  delay(1000);                      // Wait for a second
  digitalWrite(LED_BUILTIN, HIGH);  // Turn the LED off by making the voltage HIGH
  delay(2000);                      // Wait for two secon(to demonstrate the active low LED)
  */
  blink.on(1000);
  blink.off(500);
}
