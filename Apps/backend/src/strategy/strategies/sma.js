function calculate(data) {
  var count = Object.keys(data).length;

  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];

  var sma = 0;

  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i >= 6) {
      for (var p = i - 6; p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / 7;
      curr = [sma, time[i]];
      calculated.push(curr);
      sma = 0;
    }
  }
  return calculated;
}

module.exports = { calculate };
