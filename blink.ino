#include <Blink.h>

Blink blink(LED_BUILTIN);

//serial.begin(115200)로 해보고 왜 serial monitor에 쓰레기값이 나오는지 serial library는 115200 bps 까지 지원하는데 9600으로 바꾸니 제대로 출력
void setup() {
  Serial.begin(9600);
  Serial.println("\n");
  Serial.println("\nBlink Version 1.0 Jaeho Yoon");
}

// the loop function runs over and over again forever
void loop() {
  blink.on(2000);
  blink.off(2000);
}
