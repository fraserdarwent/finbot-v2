import log from "@fraserdarwent/javascript-logger";

export default function (symbols) {
  log.info(`Got ${symbols.length} symbols`);
  log.info(
    `Got ${symbols.map((symbols) => symbols.ticks).flat(1).length} ticks for ${
      symbols.length
    } symbols`
  );
  log.info(
    `Got ${symbols[0].ticks.length} ticks for symbol ${symbols[0].symbol}`
  );
  log.info(`Here is an example for ${symbols[0].symbol}`);
  log.info(JSON.stringify(symbols[0].ticks[0]));
  log.info(JSON.stringify(symbols[0].ticks[symbols[0].ticks.length - 1]));
  return symbols;
}
