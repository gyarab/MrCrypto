//Triangular moving average
function calculate(data,ev) {
  var count = Object.keys(data).length;
  var size = Math.round(count/10);
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var sma = [];
  var sum = 0;
  var per = 0;
  var avg = 0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];

    if (i >= size - 1) {
      for (var p = i - (size - 1); p <= i; p++) {
        sum += cislo[p];
      }
      sum = sum / size;
      sma.push(sum);
      sum = 0;
    }
  }
  for (var i = size - 1; i < sma.length; i++) {
    time[i] = data[i+(size - 1)][0];
    for (var p = i - (size - 1); p <= i; p++) {
      sum += sma[p];
    }
    sum = sum / size;
    per =  Math.abs(sum/(cislo[i]/100)-100);
    avg += per;
    curr = [time[i], sum,per];
    if (i == sma.length-1) {
      if(ev == true){
    avg = avg/count;}
    curr = [time[i], sum, per, avg];
    }
    time[i] = data[i][0];
    calculated.push(curr);
    sum = 0;
  }

  return calculated;
}

module.exports = { calculate };
