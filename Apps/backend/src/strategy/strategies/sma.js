//Simple moving average
function calculate(data) {
  var count = Object.keys(data).length;
  var size = Math.round(count / 10);
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var per = 0;
  var sma = 0;

  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i >= size - 1) {
      for (var p = i - (size - 1); p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / size;

      per = Math.abs(sma / (cislo[i] / 100) - 100);
      curr = [time[i], sma, per];

      calculated.push(curr);
      sma = 0;
    }
  }

  return calculated;
}

module.exports = { calculate };
