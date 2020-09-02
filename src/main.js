import symbols from "./data/symbols.js";
import ticks from "./data/ticks.js";
import process from "./ml/process.js";
import dataset from "./ml/dataset.js";
import model from "./ml/model.js";
import info from "./info.js";
import log from "@fraserdarwent/javascript-logger";

log.info("Starting finbot-v2");
symbols()
  .then((symbols) => symbols.slice(0, 1))
  .then((symbols) => ticks(symbols))
  .then((symbols) => symbols.filter((symbol) => 0 < symbol.ticks.length))
  .then((symbols) => info(symbols))
  .then((symbols) => process(symbols))
  .then((data) => dataset(data))
  .then((dataset) => model.fitDataset(dataset, { epochs: 1 }));
