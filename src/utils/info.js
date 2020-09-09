import log from "@fraserdarwent/javascript-logger";
import fs from "fs";

const cacheDir = `.cache/${new Date().toISOString().slice(0, 10)}/raw`;

export default function () {
  const files = fs
    .readdirSync(cacheDir)
    .filter((file) => file.endsWith(".json"));

  log.info(`Got ${files.length} symbols`);

  files.forEach((file, index) => {
    const ticks = JSON.parse(fs.readFileSync(`${cacheDir}/${file}`));
    const symbol = file.split("-")[0];
    if (index === files.length - 1) {
      log.info(`Here is an example for ${symbol}`);
      log.info(JSON.stringify(ticks[0]));
      log.info(JSON.stringify(ticks[ticks.length - 1]));
    }
  });
}
