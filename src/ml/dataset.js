import tf from "@tensorflow/tfjs-node";
import log from "@fraserdarwent/javascript-logger";
const inDir = `.cache/${new Date().toISOString().slice(0, 10)}/processed`;
import fs from "fs";
// export default function (dataPoints) {
//   log.info("Generating dataset");
//   const ins = tf.data.array(dataPoints.map((dataPoint) => dataPoint.in));
//   const outs = tf.data.array(dataPoints.map((dataPoint) => dataPoint.out));

//   return tf.data.zip({ xs: ins, ys: outs }).shuffle(100).batch(32);
// }

export default function () {
  log.info("Generating dataset");
  // const ins = tf.data.array(dataPoints.map((dataPoint) => dataPoint.in));
  // const outs = tf.data.array(dataPoints.map((dataPoint) => dataPoint.out));

  // return tf.data.zip({ xs: ins, ys: outs }).shuffle(100).batch(32);

  return tf.data
    .generator(makeIterator)
    .shuffle(100)
    .batch(32)
    .map((tensor) => {
      return {
        xs: tensor.xs
          .sub(tensor.xs.min())
          .div(tensor.xs.max().sub(tensor.xs.min())),
        ys: tensor.ys
          .sub(tensor.ys.min())
          .div(tensor.ys.max().sub(tensor.ys.min())),
      };
    });
}

function makeIterator() {
  const iterator = {
    next: () => {
      return getValue();
    },
  };
  return iterator;
}

let ticks = [];
let indexInFile = 0;
let fileIndex = 0;
let files;
function getValue() {
  if (!files) {
    files = fs.readdirSync(inDir).filter((file) => file.endsWith(".json"));
  }
  if (ticks.length <= indexInFile) {
    log.info(`${inDir}/${files[fileIndex]}`);

    ticks = JSON.parse(fs.readFileSync(`${inDir}/${files[fileIndex]}`));
    // Load the next file next time
    fileIndex++;
    // Start at start of file
    indexInFile = 0;
  }
  const value = { value: ticks[indexInFile], done: fileIndex === files.length };
  indexInFile++;
  return value;
}
