import log from "@fraserdarwent/javascript-logger";
import symbols from "./data/symbols.js";
import ticks from "./data/ticks.js";
import process from "./ml/process.js";
import dataset from "./ml/dataset.js";
import model from "./ml/model.js";

log.info("Starting finbot-google");
symbols()
  .then((symbols) => {
    log.info(`Got ${symbols.length} symbols`);
    return symbols;
  })
  .then((symbols) => symbols.slice(0, 1))
  .then((symbols) => ticks(symbols))
  .then((symbols) => symbols.filter((symbol) => 0 < symbol.ticks.length))
  .then((symbols) => {
    log.info(
      `Got ${
        symbols.map((symbols) => symbols.ticks).flat(1).length
      } ticks for ${symbols.length} symbols`
    );
    log.info(
      `Got ${symbols[0].ticks.length} ticks for symbol ${symbols[0].symbol}`
    );
    log.info(`Here is an example for ${symbols[0].symbol}`);
    log.info(JSON.stringify(symbols[0].ticks[0]));
    log.info(JSON.stringify(symbols[0].ticks[symbols[0].ticks.length - 1]));
    return symbols;
  })
  .then((symbols) => process(symbols))
  .then((data) => dataset(data))
  .then((dataset) => model.fitDataset(dataset, { epochs: 1 }));
