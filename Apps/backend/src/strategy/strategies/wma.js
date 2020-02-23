//Simple moving average
function calculate(data,ev) {
  var count = Object.keys(data).length;
  var size = Math.round(count/10);
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var k = 0;
  var q = 1;
  var per =0;
  var sum = 0;
  var avg = 0;
for (var i = 1; i <= size; i++) {
  k+=i;
}
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
    if (i >= size - 1) {
      for (var p = i - (size - 1); p <= i; p++) {
        sum += (cislo[p]*q);
        q++;
      }
      sum = sum / k;
      per = Math.abs(sum/(cislo[i]/100)-100);
      avg += per;
      curr = [time[i],sum,per];
      if (i == count-1) {
        if(ev == true){
      avg = avg/count;}
      curr = [time[i], sum, per, avg];
      }
      calculated.push(curr);

      sum = 0;
      q = 1;
    }
  }
  return calculated;
}

module.exports = { calculate };
