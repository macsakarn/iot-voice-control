const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

var mqtt = require("mqtt");

const host = "broker.netpie.io";
const portMQTT = "1883";
const clientId = `bc8a8f72-d6e8-41c8-b9f5-760b035ee551`;

const connectUrl = `mqtt://${host}:${portMQTT}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "oTo5b9MRt7P2rV6WNLmd9Jpg8PnDnNqz",
  password: "DAK)_~IT#46dvV(izhPLAW7WUVhNS(dG",
  reconnectPeriod: 1000,
});

client.on("connect", function () {
  // Subscribe any topic
  console.log("MQTT Connect");
});

const wordSplit = require("./APIs/TLexPlus");

app.post("/api/command/jim", async (req, res) => {
  let word = await wordSplit(req.body.command);
  let nameJim = word.indexOf("จิม");
  if (nameJim <= 3 && nameJim >= 0) {
    let open = word.indexOf("เปิด");
    let close = word.indexOf("ปิด");
    var tool, indexTool;
    if (open <= 5 && open >= 0) {
      console.log("open");
      tool = word[open + 1]
      indexTool = open + 1
    } else if (close <= 5 && close >= 0) {
      console.log("close");
      tool = word[close + 1]
      indexTool = close + 1
      if (tool == "ไฟ") {
        console.log("off led");
        client.publish("@msg/jim/led", "off", (error) => {
          if (error) {
            console.error(error);
          }
        });
        res.send({ status: "happy" });
      }
    } else {
      console.log("not open or close");
      res.send({ status: "sad" });
    }

    console.log("tool : "+tool);
    if (tool == "ไฟ") {
      var onColor = word[indexTool + 1];
      if (open >= 0 && onColor == "สี") {
        var color = word[indexTool + 2]
        if(!color){
          client.publish("@msg/jim/led", "on", (error) => {
            if (error) {
              console.error(error);
            }
          });
        }else if (color == "แดง"){
          client.publish("@msg/jim/led", "red", (error) => {
            if (error) {
              console.error(error);
            }
          });
        }else if (color == "เขียว"){
          client.publish("@msg/jim/led", "green", (error) => {
            if (error) {
              console.error(error);
            }
          });
        }else if (color == "น้ำเงิน"){
          client.publish("@msg/jim/led", "blue", (error) => {
            if (error) {
              console.error(error);
            }
          });
        }
      } else{
        console.log("on led no color");
        client.publish("@msg/jim/led", "on", (error) => {
          if (error) {
            console.error(error);
          }
        });
      }
    }
    res.send({ status: "happy" });
  } else {
    res.send({ status: "sad" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

