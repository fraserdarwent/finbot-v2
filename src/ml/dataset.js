import tf from "@tensorflow/tfjs-node";
import log from "@fraserdarwent/javascript-logger";

export default function (dataPoints) {
  log.info(JSON.stringify(dataPoints));
  const ins = tf.data.array(dataPoints.map((dataPoint) => dataPoint.in));
  const outs = tf.data.array(dataPoints.map((dataPoint) => dataPoint.out));

  return tf.data
    .zip({ xs: ins, ys: outs })
    .shuffle(100 /* bufferSize */)
    .batch(32);
}
