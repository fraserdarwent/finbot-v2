import log from "@fraserdarwent/javascript-logger";
import xapi from "./xapi.js";
import cliProgress from "cli-progress";
import fs from "fs";
import JSONStream from "JSONStream";
import StreamArray from "stream-json/streamers/StreamArray";
import mkdirp from "mkdirp";

let completed = 0;

const cacheDir = `.cache/${new Date().toISOString().slice(0, 10)}/raw`;

export default function ticks(symbols) {
  if (fs.existsSync(cacheDir)) {
    return symbols;
  }

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  log.info("Fetching ticks for symbols");
  bar.start(symbols.length, 0);
  return xapi
    .ticks(symbols, () => {
      bar.update((completed = completed + 1));
    })
    .then((ticks) => {
      bar.stop();
      cache(ticks);
      return symbols;
    });
}

function cache(ticks) {
  log.info("Caching ticks");
  mkdirp(cacheDir).then((_) =>
    ticks.map((tick) => {
      const fileName = `${cacheDir}/${
        tick.symbol
      }-${new Date().toISOString().slice(0, 10)}.json`;
      fs.writeFileSync(fileName, JSON.stringify(tick.ticks));
      return fileName;
    })
  );
}
