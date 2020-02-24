const tf = require("@tensorflow/tfjs-node");

function calculate(data) {
  const size = 5; //slot size = predicting view
  let trainingData = []; //sequence of previous day
  let outputData = []; //sell = 0, buy = 1;

  //setup our data
  for (let i = size; i < data.length - 1; i++) {
    let sliced = data.slice(i - size, i);
    let slot = sliced.map(item => item[4]);
    let buy = data[i + 1][4] > data[i][4] ? 1 : 0; //will rise => buy..
    let sell = buy == 0 ? 1 : 0;

    trainingData.push(slot);
    outputData.push([buy, sell]);
  }
  // console.log(trainingData);
  // console.log(outputData);

  //convert our data
  trainingData = tf.tensor2d(trainingData);
  outputData = tf.tensor2d(outputData);

  // build neural network
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [size],
      activation: "sigmoid",
      units: 5
    })
  );
  model.add(
    tf.layers.dense({
      inputShape: [6],
      activation: "relu",
      units: 2
    })
  );
  model.add(
    tf.layers.dense({
      activation: "softmax",
      units: 2
    })
  );
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(0.06)
  });

  //train our model
  const startTime = Date.now();
  model.fit(trainingData, outputData, { epochs: 400 }).then(history => {
    console.log(history);
    //model.predict(testingData).print()
  });
}

module.exports = { calculate };
