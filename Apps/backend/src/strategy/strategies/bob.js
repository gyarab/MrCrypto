//Bollinger band
function calculate(data, ev) {
  var count = Object.keys(data).length;
  var size = Math.round(count / 10);
  var vol = 2;
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var curr2 = [];
  var dev = 0;
  var sma = 0;
  var top = 0;
  var bot = 0;
  var per = 0;
  var per2 = 0;
  var avg = 0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i >= size - 1) {
      var z = i - (size - 1);
      for (var p = i - (size - 1); p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / size;
      dev = ((cislo[i] - cislo[z]) * (cislo[i] - cislo[z])) / size - 1;

      if (dev >= 0) {
        dev = Math.sqrt(dev);
      } else {
        dev = Math.sqrt(-dev);
      }
      top = sma + dev * vol;
      bot = sma - dev * vol;
      per = Math.abs(top / (cislo[i] / 100) - 100);

      per2 = Math.abs(bot / (cislo[i] / 100) - 100);

      curr.push([time[i], top]);
      curr2.push([time[i], bot]);
      if (per < per2) {
        avg += per;
      } else {
        avg += per2;
      }
      sma = 0;
    }
  }
  if (ev == true) {
    avg = avg / count;
  }
  calculated.push(curr, curr2, avg);
  return calculated;
}

module.exports = { calculate };
