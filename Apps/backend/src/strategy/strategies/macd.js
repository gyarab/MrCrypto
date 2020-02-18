//Moving Average Convergence Divergence
function calculate(data) {
  var count = Object.keys(data).length;
  var size = Math.round(count/10);
  var size2 = Math.round(count/5);
  var calculated = [];
  var cislo = [];
  var cislo2 = [];
  var time = [];
  var curr = [];
  var k = 2/(size + 1);
  var k2 = 2/(size2 + 1);
  var sma = 0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i == size - 1) {
      for (var p = i - (size - 1); p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / size;
      cislo[i]=sma;
      sma = 0;
    }
    if (i > size - 1) {
    cislo[i] = ((data[i][4]-cislo[i-1])*k)+cislo[i-1];
    time[i] = data[i][0];
  }}
  ///////////////////////////////
  for (var i = 0; i < count; i++) {
    cislo2[i] = data[i][4];
    time[i] = data[i][0];
    if (i == size2 - 1) {
      for (var p = i - (size2 - 1); p <= i; p++) {
        sma += cislo2[p];
      }
      sma = sma / size;
      cislo2[i]=sma;
      sma = 0;
    }
    if (i > size2 - 1) {
    cislo2[i] = ((data[i][4]-cislo[i-1])*k2)+cislo[i-1];

  }}
  for (var i = size2; i < count; i++) {
  curr = [time[i],cislo[i]-cislo2[i]];
  calculated.push(curr);}
  return calculated;
}

module.exports = { calculate };
