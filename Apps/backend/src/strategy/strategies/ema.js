//Exponential moving average
function calculate(data) {
  var count = Object.keys(data).length;
  var size = Math.round(count/10);
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var k = 2/(size + 1);
  var sma = 0;
  var per =0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i == size - 1) {
      for (var p = i - (size - 1); p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / size;
      per =  Math.abs(sma/(cislo[i]/100)-100);
      curr = [time[i],sma];
      calculated.push(curr);
      cislo[i]=sma;
      sma = 0;
    }
    if (i > size - 1) {
    cislo[i] = ((data[i][4]-cislo[i-1])*k)+cislo[i-1];
    time[i] = data[i][0];
    per = cislo[i]/(data[i][4]/100)-100;
      curr = [time[i],cislo[i],per];
      calculated.push(curr);
  }}
  return calculated;
}

module.exports = { calculate };
