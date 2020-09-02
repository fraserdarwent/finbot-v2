import XAPI from "@fraserdarwent/javascript-xapi";
require("dotenv").config();

const xapi = new XAPI({
  userId: process.env.XAPI_USERID,
  password: process.env.XAPI_PASSWORD,
  demo: true,
});

export default xapi;
