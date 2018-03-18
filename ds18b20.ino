// ESP8266 DS18B20 ArduinoIDE Thingspeak IoT Example code
// http://vaasa.hacklab.fi
//
// https://github.com/milesburton/Arduino-Temperature-Control-Library
// https://gist.github.com/jeje/57091acf138a92c4176a


#include <OneWire.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS D4

//#define THING_SPEAK //thingspeak 용이면 uncomment
#define IFTTT //ifttt 용이면 uncomment

#ifdef THING_SPEAK
const char* host = "api.thingspeak.com"; // Your domain  
String ApiKey = "drRjv-5WXYAiYh-q87TDdG";
String path = "/update?key=" + ApiKey + "&field1=";  
#endif

#ifdef IFTTT
const char* host = "maker.ifttt.com"; // Your domain  
String ApiKey = "bIRHNr4NUb5dwyQwwIpZ3H";
String event = "getting_temperature";
#endif

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature DS18B20(&oneWire);

//const char* ssid = "first2";
//const char* pass = "dbswogh123";
const char* ssid = "AndroidHotspot1483";
//const char* ssid = "CoffeeBean";
const char* pass = "";

char temperatureString[6];

void setup(void){
  Serial.begin(9600);
  Serial.println("");
  
  WiFi.begin(ssid, pass);
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  DS18B20.begin();
   

}

float getTemperature() {
  float temp;
  do {
    DS18B20.requestTemperatures(); 
    temp = DS18B20.getTempCByIndex(0);
    delay(100);
  } while (temp == 85.0 || temp == (-127.0));
  return temp;
}


void loop() {

  float temperature = getTemperature();

  dtostrf(temperature, 2, 2, temperatureString);
  // send temperature to the serial console
  Serial.println(temperatureString);
  
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  #ifdef IFTTT
  Serial.println("connected to maker");
  //json_temperature="{";
  //json_temperature.concat("\"Value1\":\"");
  //json_temperature.concat(temperatureString);
  //json_temperature.concat("\"}");
  String json_temperature = "";
  json_temperature = json_temperature + "\n" + "{\"value1\":\""+ temperatureString + "\"}";
  String path = "/trigger/" + event + "/with/key/" + ApiKey;
  client.println("POST "+ path +" HTTP/1.1");
  client.println("Host: " + String(host));
  client.println("User-Agent: Arduino/1.0");
  client.print("Accept: *");
  client.print("/");
  client.println("*");
  client.print("Content-Length: ");
  client.print(json_temperature.length());
  client.println("Content-Type: application/json");
  client.println("Connection: close");
  client.println();
  client.println(json_temperature);

  Serial.println("POST "+ path +" HTTP/1.1");
  Serial.println("Host: " + String(host));
  Serial.println("User-Agent: Arduino/1.0");
  Serial.print("Accept: *");
  Serial.print("/");
  Serial.println("*");
  Serial.print("Content-Length: ");
  Serial.print(json_temperature.length());
  Serial.println("Content-Type: application/json");
  Serial.println("Connection: close");
  Serial.println();
  Serial.println(json_temperature);

  #endif

  #ifdef THING_SPEAK
  client.print(String("GET ") + path + temperatureString + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: keep-alive\r\n\r\n");
  #endif
  delay(5 * 1000);
 
}
