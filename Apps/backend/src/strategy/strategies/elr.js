//Elder ray
function calculate(data) {
  var count = Object.keys(data).length;
  var size = Math.round(count/10);
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var k = 2/(size + 1);
  var sma = 0;
  var sma = 0, real = 0,f1 = 0, f2 = 0, f3 = 0, min = 999999999,max = 0;
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
      for (var p = i - (size - 1); p <= i; p++) {
        if (cislo[p]>max) {
          max = cislo[p];
        }
        if (cislo[p]<min) {
          min = cislo[p];
        }
      }

    cislo[i] = ((data[i][4]-cislo[i-1])*k)+cislo[i-1];
    time[i] = data[i][0];
    f1 = max - cislo[i];
    f2 = min - cislo[i];
if (f1>-f2) {
  curr = [time[i],f2];
} else {
  curr = [time[i],f1];
}
      calculated.push(curr);
  }}
  return calculated;
}

module.exports = { calculate };
