const tf = require("@tensorflow/tfjs-node");

function calculate(data) {
  let updata = [];
  for (let i = 1; i < data.length; i++) {
    let up = data[i][4] > data[i - 1][4] ? 1 : 0;
    updata.push(up);
  }

  const size = 20; //slot size = predicting view
  let features = []; //sequence of previous day
  let labels = []; //sell = 0, buy = 1;

  //setup our data
  for (let i = size + 1; i < updata.length - 1; i = i + 7) {
    let slot = updata.slice(i - size, i);

    let buy = data[i + 1][4] > data[i][4] ? 1 : 0; //will rise => buy..
    let sell = buy == 0 ? 1 : 0;

    //normalize
    let sum = 0;
    sum = slot.forEach(i => {
      sum += i;
    });
    let average = sum / size;

    features.push(slot);
    labels.push([buy, sell]);
  }

  //convert our data
  console.log(features);

  //split to testing testing data
  let testingFeatures = features.splice(0, 10);
  let testingLabels = labels.splice(0, 10);
  testingFeatures = tf.tensor2d(testingFeatures);
  //testingLabels = tf.tensor2d(testingLabels);

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

  //train our model
  const startTime = Date.now();
  model.fit(features, labels, { epochs: 200 }).then(history => {
    console.log("___TEST___");
    model.predict(testingFeatures).print();
    console.log(testingLabels);
  });
}

module.exports = { calculate };
