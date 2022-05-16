#include "WiFi.h"
#include <PubSubClient.h>
#include <string.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";

char server[]="broker.netpie.io";
char ClientID[]="e91107bc-3525-4f55-8ca3-6fef7fc63597";
char token[]="1pfDs7yLGMUbpvGopUY8W2oJcTJApmEp";
char secret[]="xJFKtsJxd1YYZ93EX$!44JBE3(6!($rs";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length)
{
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String message="";
  int i=0;
  while (i<length) {
    message += (char)payload[i++];
  };
  Serial.println(message);
  if(String(topic) == "@msg/jim/led") {
    if(message.equals("red")){
      setRGB(21, 19, 18, "red");
    }else if(message.equals("green")){
      setRGB(21, 19, 18, "green");
    }else if(message.equals("blue")){
      setRGB(21, 19, 18, "blue");
    }else if(message.equals("on")){
      setRGB(21, 19, 18, "on");
    }else if(message.equals("off")){
      setRGB(21, 19, 18, "off");
    }
  }
}

void reconnect() { // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-14521212takai";
    clientId += String(random(0xffff), HEX);
    if (client.connect(ClientID, token, secret)) {
      Serial.println("connected");
      client.subscribe("@msg/jim/led");
      client.subscribe("@msg/test");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setRGB(int pinRed, int pinGreen, int pinBlue, String mode){
  if(mode.equals("red")){
    digitalWrite(pinRed, LOW);
    digitalWrite(pinGreen, HIGH);
    digitalWrite(pinBlue, HIGH);
  }else if(mode.equals("green")){
    digitalWrite(pinRed, HIGH);
    digitalWrite(pinGreen, LOW);
    digitalWrite(pinBlue, HIGH);
  }else if(mode.equals("blue")){
    digitalWrite(pinRed, HIGH);
    digitalWrite(pinGreen, HIGH);
    digitalWrite(pinBlue, LOW);
  }else if(mode.equals("on")){
    digitalWrite(pinRed, LOW);
    digitalWrite(pinGreen, LOW);
    digitalWrite(pinBlue, LOW);
  }else if(mode.equals("off")){
    digitalWrite(pinRed, HIGH);
    digitalWrite(pinGreen, HIGH);
    digitalWrite(pinBlue, HIGH);
  }
}

void setup() {
  pinMode(21, OUTPUT);
  pinMode(19, OUTPUT);
  pinMode(18, OUTPUT);
  digitalWrite(21, HIGH);
  digitalWrite(19, HIGH);
  digitalWrite(18, HIGH);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(server, 1883);
  client.setCallback(callback);
  
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
  }
}