import log from "@fraserdarwent/javascript-logger";

const windowSize = 30;

export default function (symbols) {
  return symbols.flatMap((symbol) => {
    log.info(
      `Processing ${symbol.ticks.length} ticks for symbol ${symbol.symbol}`
    );
    const windowCount = 1 + (symbol.ticks.length - windowSize);
    log.info(`Got ${windowCount} windows of ${windowSize}`);

    const windows = [...Array(windowCount).keys()].map((index) => {
      const window = {
        in: symbol.ticks.slice(index, index + windowSize - 1).map((tick) => {
          return [tick.open, tick.close, tick.high, tick.low, tick.vol];
        }),
        out: symbol.ticks[index + windowSize - 1].close,
      };
      return window;
    });
    return windows;
  });
}
