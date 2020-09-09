import symbols from "./data/symbols.js";
import ticks from "./data/ticks.js";
import process from "./ml/process.js";
import dataset from "./ml/dataset.js";
import model from "./ml/model.js";
import info from "./utils/info.js";
import log from "@fraserdarwent/javascript-logger";
import v8 from "v8";
log.info("Starting finbot-v2");
log.info(
  `Memory limit of ${Math.round(
    v8.getHeapStatistics().heap_size_limit / 1000000
  )}MB`
);
symbols()
  .then((symbols) => ticks(symbols))
  .then(info)
  .then(process)
  .then(dataset)
  .then((dataset) => model.fitDataset(dataset, { epochs: 1 }));
