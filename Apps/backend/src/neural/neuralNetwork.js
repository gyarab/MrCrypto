const tf = require("@tensorflow/tfjs-node");

function calculate(data) {
  const size = 5; //slot size = predicting view
  let features = []; //sequence of previous day
  let labels = []; //sell = 0, buy = 1;

  //setup our data
  for (let i = size; i < data.length - 1; i++) {
    let sliced = data.slice(i - size, i);

    let slot = sliced.map(item => item[4]);
    let buy = data[i + 1][4] > data[i][4] ? 1 : 0; //will rise => buy..
    let sell = buy == 0 ? 1 : 0;

    //normalize
    let min = Math.min(...slot);
    console.log(min);
    slot.forEach(item => {
      return item - min;
    });

    features.push(slot);
    labels.push([buy, sell]);
  }
  // console.log(features);
  // console.log(labels);
  //--------------------------------> normalize
  //convert our data
  console.log(features);

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
  //const startTime = Date.now();
  // model.fit(features, labels, { epochs: 400 }).then(history => {
  //   console.log(history);
  //   //model.predict(testingData).print()
  // });
}

module.exports = { calculate };
