require("dotenv").config();

const https = require("https");
const app = require("./app");
const httpsOptions = require("./config/httpsConfig");

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
const APP_NAME = process.env.APP_NAME || "GameVault API";

const server = https.createServer(httpsOptions, app);

server.listen(HTTPS_PORT, () => {
    console.log(`${APP_NAME} is running securely on https://localhost:${HTTPS_PORT}`);
});

server.on("error", error => {
    console.error("The GameVault server could not start.");
    console.error(error.message);
});