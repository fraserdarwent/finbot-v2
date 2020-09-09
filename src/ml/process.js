import log from "@fraserdarwent/javascript-logger";
import fs from "fs";
const windowSize = 30;
import mkdirp from "mkdirp";
const inDir = `.cache/${new Date().toISOString().slice(0, 10)}/raw`;
const outDir = `.cache/${new Date().toISOString().slice(0, 10)}/processed`;

export default function () {
  if (fs.existsSync(outDir)) {
    return;
  }

  mkdirp.sync(outDir);

  const files = fs.readdirSync(inDir).filter((file) => file.endsWith(".json"));

  log.info(`Processing ${files.length} raw files`);

  files.forEach((file) => {
    const ticks = JSON.parse(fs.readFileSync(`${inDir}/${file}`)).filter(
      (tick) => tick.vol !== 0
    );

    const symbol = file.split("-")[0];

    if (ticks.length < windowSize) {
      log.info(`Rejecting ${symbol} for being too small`);
      return;
    } else {
      log.info(`Processed ${ticks.length} ticks for symbol ${symbol}`);
    }

    const windowCount = 1 + (ticks.length - windowSize);
    log.info(`Got ${windowCount} windows of ${windowSize}`);

    const windows = [...Array(windowCount).keys()].map((index) => {
      const window = {
        xs: ticks.slice(index, index + windowSize - 1).map((tick) => {
          return [tick.open, tick.close, tick.high, tick.low, tick.vol];
        }),
        ys: ticks[index + windowSize - 1].close,
      };
      return window;
    });

    fs.writeFileSync(`${outDir}/${file}`, JSON.stringify(windows));
  });
}
