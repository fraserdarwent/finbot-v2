import log from "@fraserdarwent/javascript-logger";
import XAPI from "@fraserdarwent/javascript-xapi";
import xapi from "./xapi.js";

export default function symbols() {
  log.info("Fetching symbols");
  return xapi.symbols();
}
