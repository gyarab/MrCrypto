//Exponential moving average
function calculate(data) {
  var count = Object.keys(data).length;
  var size = 12;
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
<<<<<<< HEAD
  var k = 2/(size + 1);
  var sma = 0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i == size - 1) {
      for (var p = i - (size - 1); p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / size;
      curr = [time[i],sma];
      calculated.push(curr);
      cislo[i]=sma;
      sma = 0;
    }
    if (i > size - 1) {
    cislo[i] = ((data[i][4]-cislo[i-1])*k)+cislo[i-1];
    time[i] = data[i][0];
      curr = [time[i],cislo[i]];
      calculated.push(curr);
  }}
=======
  var k = 2 / (size + 1);
  cislo[0] = data[0][4];
  time[0] = data[0][0];
  curr = [time[0], cislo[0]];

  calculated.push(curr);
  for (var i = 1; i < count; i++) {
    cislo[i] = data[i][4] + k * cislo[i - 1];
    time[i] = data[i][0];
    curr = [time[i], cislo[i]];
    calculated.push(curr);
  }
>>>>>>> 2c8b0b8ba632975f2b1077845d6159656c47e072
  return calculated;
}

module.exports = { calculate };
