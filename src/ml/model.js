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

model.add(tf.layers.flatten());

model.add(
  tf.layers.dense({
    units: 1,
    activation: "linear",
    useBias: true,
  })
);
compileModel(model);
export default model;
