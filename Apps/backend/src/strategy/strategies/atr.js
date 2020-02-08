//Avarage true range
function calculate(data) {
  var count = Object.keys(data).length;
  var size = 20;
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var atr = [];
  var sma = 0, real = 0,f1 = 0, f2 = 0, f3 = 0, min = 999999999,max = 0;
  for (var i = 0; i < count; i++) {
    cislo[i] = data[i][4];
    time[i] = data[i][0];
  if (i == size - 1) {
  for (var p = i - (size - 1); p <= i; p++) {
    sma += cislo[p];
  }
  sma = sma / size;
  atr[i]= sma;
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
f1 = max - min;
f2 = max - cislo[i-1];
f3 = cislo[i-1] - min ;
console.log("f1: "+f1);
console.log("f2: "+f2);
console.log("f3: "+f3);
real = Math.max(f1,f2,f3);
atr[i]= atr[i-1]+real;
curr = [time[i],atr[i]];
calculated.push(curr);
}
}

  return calculated;
}

module.exports = { calculate };
