/*
    Blink.h - Library for simple blink example
 */

#ifndef BLINK_H
#define BLINK_H

#include "Arduino.h"

class Blink
{
public:
    Blink(int pin);
    void on(int millisecond);
    void off(int millisecond);
private:
    int _pin;
};

#endif
