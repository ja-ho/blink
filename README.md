# blink
blink project for the capstone design 1


### Blink 라이브러리
<pre><code>
class Blink
{
public:
    Blink(int pin);
    void on(int millisecond);
    void off(int millisecond);
private:
    int _pin;
};
</code></pre>

* Blink 클래스
> Blink 라이브러리에 필요한 function들과 variable들을 모아놓았습니다.
> * Blink(int pin);
> 생성자에서 int pin을 인자로 받음으로써 라이브러리 사용자가 output으로 사용할 핀을 설정할 수 있도록 합니다.
>
> * void on(int millisecond);
> 인자로 받은 millisecond 만큼 불이 들어오게 합니다.
> * void off(int millisecond);
> 인자로 받은 millisecond 만큼 불이 꺼지게 합니다.

* how to use
> 생성자를 이용하여 Blink 객체를 만듭니다.
> output으로 사용할 pin number를 인자로 넘겨줍니다.
> on과 off를 이용하여 불을 깜빡이게 합니다.
> millisecond를 인자로 주어 시간을 조정할 수 있습니다.


# ds18b20

#### ESP8266 on NodeMCU board + DS18B20 + ArduinoIDE + ThingSpeak + IFTTT

1. 온도 센서인 ds18b20을 이용하여 온도를 체크한다. 이번 프로그램에서는 wifi 연결을 통하여 온도 측정값을 thingspeak로 전달한다.

2. 온도 센서인 ds18b20을 이용하여 온도를 체크한다. 이번 프로그램에서는 wifi 연결을 통하여 온도 측정값을 http로 IFTTT 를 통하여 line에 전달한다.


필요한 것들
* NodeMCU ESP8266 dev board, wifi-enabled microcontroller board with gpio
* DS18B20, maxim 1-wire temperature sensor
특이점: one-wire interface. 1개의 라인을 이용해서 양방향 통신을 한다.
* 4k7 ohm resistor, some wire
(nodemcu esp8266 D3, D4번 핀에 내장)
* USB power source or alternatively 3v power source, for short term testing 2*1,5V AA batteries
