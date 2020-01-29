const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "strategy";
  var obj = [];
async function start() {
  try {
    //get..
    var hour = [];
    var day = [];
    var month = [];
    var all = [];
    MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;

      client
        .db("mrcrypto")
        .collection("candles")
        .find({})
        .toArray((err, data) => {
          if (err) throw err;

//MOVING AVARAGE
  //hour
  var count = Object.keys(data[3].data).length;
          var cislo = [];
          var time = [];
          var curr = [];
          var ma = 0;
            for (var i = 0; i < count; i++) {
            cislo[i] = data[3].data[i][4]
            time[i] = data[3].data[i][0]
            if (i>=6) {
            for (var p = i-6; p <= i; p++) {
                      ma += cislo[p];
            }
            ma = ma/7;
            curr = [ma, time[i]];
            hour.push(curr);
            ma = 0;
            }
          }
    //day
    var count = Object.keys(data[2].data).length;
              cislo = [];
              time = [];
              ma = 0;
              for (var i = 0; i < count; i++) {
              cislo[i] = data[2].data[i][4]
              time[i] = data[2].data[i][0]
              if (i>=6) {
              for (var p = i-6; p <= i; p++) {
                        ma += cislo[p];
              }
              ma = ma/7;
              curr = [ma, time[i]];
              day.push(curr);
              ma = 0;
              }
            }
    //month
    var count = Object.keys(data[1].data).length;
              cislo = [];
              time = [];
               ma = 0;
              for (var i = 0; i < count; i++) {
              cislo[i] = data[1].data[i][4]
              time[i] = data[1].data[i][0]
              if (i>=6) {
              for (var p = i-6; p <= i; p++) {
                        ma += cislo[p];
              }
              ma = ma/7;
              curr = [ma, time[i]];
              month.push(curr);
              ma = 0;
              }
            }
    //all
    var count = Object.keys(data[0].data).length;
              cislo = [];
              time = [];
               ma = 0;
              for (var i = 0; i < count; i++) {
              cislo[i] = data[0].data[i][4]
              time[i] = data[0].data[i][0]
              if (i>=6) {
              for (var p = i-6; p <= i; p++) {
                        ma += cislo[p];
              }
              ma = ma/7;
              curr = [ma, time[i]];
              all.push(curr);
              ma = 0;
              }
            }
    //SAVE...
          obj = [
            { _id: "all", data: all },
            { _id: "month", data: month },
            { _id: "day", data: day },
            { _id: "hour", data: hour }
          ];

        client.close();
      }
    );
  });

}catch (err) {
  console.error("_CANDLES HANDLING ERROR: " + err);
  start();
}
}
console.log(obj);
