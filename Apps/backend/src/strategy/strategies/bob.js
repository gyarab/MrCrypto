//Bollinger band
function calculate(data) {
  var count = Object.keys(data).length;
  var size = 20;
  var vol = 2;
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];

  var dev = 0;
  var sma = 0;
  var top = 0;
  var bot = 0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i >= size - 1) {
      var z = i - (size-1);
      for (var p = i - (size - 1); p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / size;
      dev = (cislo[i]-cislo[z])/size-1;
      if (dev > 0) {
        top = sma + dev;
        bot = sma - dev;
      }
      else {
        top = sma - (dev*vol);
        bot = sma + (dev*vol);
      }
      curr = [top,bot,time[i]];
      calculated.push(curr);
      sma = 0;

    }
  }
  return calculated;
}

module.exports = { calculate };
