//Exponential moving average
function calculate(data, ev) {
  var count = Object.keys(data).length;
  var size = Math.round(count/10);
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var k = 2/(size + 1);
  var sma = 0;
  var per =0;
  var avg = 0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i == size - 1) {
      for (var p = i - (size - 1); p <= i; p++) {
        sma += cislo[p];
      }
      sma = sma / size;
      per =  Math.abs(sma/(cislo[i]/100)-100);
      curr = [time[i],sma,per];
      calculated.push(curr);
      cislo[i]=sma;
      sma = 0;
    }
    if (i > size - 1) {
    cislo[i] = ((data[i][4]-cislo[i-1])*k)+cislo[i-1];
    time[i] = data[i][0];
      per = Math.abs(cislo[i]/(data[i][4]/100)-100);
    avg += per;
      curr = [time[i],cislo[i],per];
      if (i == count-1) {
        if(ev == true){
      avg = avg/count;}
      curr = [time[i], cislo[i], per, avg];
      }
      calculated.push(curr);
  }}
  return calculated;
}

module.exports = { calculate };
