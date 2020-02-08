//Exponential moving average
function calculate(data) {
  var count = Object.keys(data).length;
  var size = 20;
  var calculated = [];
  var cislo = [];
  var time = [];
  var curr = [];
  var k = 2/(size + 1);
  cislo[0] = data[0][4];
  time[0] = data[0][0];
  curr = [cislo[0], time[0]];
  calculated.push(curr);
  for (var i = 1; i < count; i++) {
    cislo[i] = data[i][4]+(k)*cislo[i-1];
    time[i] = data[i][0];
      curr = [time[i],cislo[i]];
      calculated.push(curr);
  }
  return calculated;
}

module.exports = { calculate };
