import log from "@fraserdarwent/javascript-logger";
import xapi from "./xapi.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ticks(symbols) {
  return Promise.all(
    symbols.map((symbol, index) =>
      delay(index * 1000).then(() =>
        xapi.ticks(symbol).then((ticks) => {
          return { symbol: symbol, ticks: ticks };
        })
      )
    )
  ).catch((error) => {
    log.fatal(error);
  });
}
