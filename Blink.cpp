/*
    Blink.cpp - library for simple blink example
 */

#include "Arduino.h"
#include "Blink.h"

Blink::Blink(int pin)
{
    pinMode(pin, OUTPUT);
    _pin = pin;
}

void Blink::on(int millisecond)
{
    digitalWrite(_pin, LOW);
    delay(millisecond);
}

void Blink::off(int millisecond)
{
    digitalWrite(_pin, HIGH);
    delay(millisecond);
}
