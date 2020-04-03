const tf = require("@tensorflow/tfjs-node");

async function calculate(data, hotData) {
  if (data && hotData) {
    //reformate
    let updata = [];
    let hotUpdata = [];
    for (let i = 1; i < data.length; i++) {
      let up = data[i][4] > data[i - 1][4] ? 1 : 0;
      updata.push(up);
    }

    for (let i = 1; i < hotData.length; i++) {
      let up = hotData[i][4] > hotData[i - 1][4] ? 1 : 0;
      hotUpdata.push(up);
    }

    const size = 20; //slot size = predicting view
    let features = []; //sequence of previous day
    let labels = []; //sell = 0, buy = 1;

    let ups = 0;
    let downs = 0;

    //setup our data
    for (let i = size + 1; i < updata.length - 1; i++) {
      let slot = updata.slice(i - size, i);

      let buy = data[i + 1][4] > data[i][4] ? 1 : 0; //will rise => buy..
      let sell = buy == 0 ? 1 : 0;

      if (buy === 1) {
        ups++;
      } else {
        downs++;
      }
      //normalize
      // let sum = 0;
      // sum = slot.forEach(i => {
      //   sum += i;
      // });
      // let average = sum / size;

      features.push(slot);
      labels.push([buy, sell]);
    }
    //setup hot data
    let hotFeatures = [];
    for (let i = size + 1; i < hotUpdata.length - 1; i++) {
      let slot = hotUpdata.slice(i - size, i);
      hotFeatures.push(slot);
    }

    //shuffle for better learning
    let shuffled = shuffle(features, labels);
    features = shuffled[0];
    labels = shuffled[1];

    //balance data for accuracy
    let dif = ups - downs;

    for (let i = 0; downs != ups; i++) {
      if (labels[i][0] == dif < 0 ? 0 : 1) {
        labels.splice(i, 1);
        features.splice(i, 1);
        dif < 0 ? downs-- : ups--;
      }
    }

    //split to testing testing data
    let testingFeatures = features.splice(0, 50);
    let testingLabels = labels.splice(0, 50);
    testingFeatures = tf.tensor2d(testingFeatures);
    hotFeatures = tf.tensor2d(hotFeatures);

    features = tf.tensor2d(features);
    labels = tf.tensor2d(labels);

    //normalizing with scaling doesnt work appropiate
    // const inputMax = features.max();
    // const inputMin = features.min();
    //
    // normalize data (scaling 0-1)
    // features = features.sub(inputMin).div(inputMax.sub(inputMin));

    // build neural network
    const model = tf.sequential();

    model.add(
      tf.layers.dense({
        inputShape: [size],
        activation: "sigmoid",
        units: 6
      })
    );
    model.add(
      tf.layers.dense({
        inputShape: [6],
        activation: "sigmoid",
        units: 2
      })
    );
    model.add(
      tf.layers.dense({
        activation: "sigmoid",
        units: 2
      })
    );
    model.compile({
      loss: "meanSquaredError",
      optimizer: tf.train.adam(0.06)
    });

    //data to store
    let percentage;
    let result;

    //train our model
    await model.fit(features, labels, { epochs: 400 }).then(async history => {
      //get accuracy
      let tensor = model.predict(testingFeatures);
      testingFeatures = tensor.arraySync();
      percentage = getPercentage(testingFeatures, testingLabels);

      //get results
      let tensor2 = model.predict(hotFeatures);
      result = tensor.arraySync();
    });
    return { data: result, percentage };
  }
}
function getPercentage(a, b) {
  let count = 0;
  for (var i = 0; i < a.length; i++) {
    if (Math.round(a[i][0]) === b[i][0]) count++;
  }
  return (count / a.length) * 100;
}
function shuffle(a, b) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
    [b[i], b[j]] = [b[j], b[i]];
  }
  return [a, b];
}

module.exports = { calculate };
