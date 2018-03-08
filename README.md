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
