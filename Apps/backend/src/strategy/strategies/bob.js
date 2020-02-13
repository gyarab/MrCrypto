//Bollinger band
function calculate(data) {
  var count = Object.keys(data).length;
  var size = 30;
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
        top = sma + (dev*vol);
        bot = sma - (dev*vol);
      }
      else {
        top = sma - (dev*vol);
        bot = sma + (dev*vol);
      }
      curr.push([time[i],top]);
      curr2.push([time[i],bot]);

      sma = 0;

    }

  }
  calculated.push(curr,curr2);
  return calculated;
}

module.exports = { calculate };
