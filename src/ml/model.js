import tf from "@tensorflow/tfjs-node";

export function compileModel(model) {
  model.compile({
    optimizer: "adam",
    loss: "meanSquaredError",
    metrics: ["accuracy"],
  });
  return model;
}

const model = tf.sequential();

model.add(
  tf.layers.conv1d({
    inputShape: [29, 5],
    kernelSize: 20,
    filters: 20,
    activation: "linear",
    useBias: true,
  })
);

// model.add(tf.layers.flatten());

// model.add(
//   tf.layers.dense({
//     units: 60,
//     activation: "linear",
//     useBias: true,
//   })
// );

// model.add(
//   tf.layers.dense({
//     units: 30,
//     activation: "linear",
//     useBias: true,
//   })
// );

// model.add(
//   tf.layers.dense({
//     units: 1,
//     activation: "linear",
//     useBias: true,
//   })
// );

model.add(tf.layers.flatten());

model.add(
  tf.layers.dense({
    units: 75,
    activation: "linear",
  })
);

model.add(
  tf.layers.dense({
    units: 75,
    activation: "sigmoid",
  })
);

model.add(
  tf.layers.dense({
    units: 1,
    activation: "linear",
  })
);

model.compile({
  loss: tf.losses.meanSquaredError,
  optimizer: tf.train.adam(0.0001),
  metrics: ["accuracy"],
});

export { model };

compileModel(model);
export default model;
