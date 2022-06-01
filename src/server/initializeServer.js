require("dotenv").config();
const debug = require("debug")("set-appArt:server:initializeServer");
const chalk = require("chalk");
const app = require("./index");

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on http://localhost:${port}`));
      resolve();
    });

    server.on("error", (error) => {
      debug(chalk.red("Error on server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} in use`));
        reject();
      }
    });
  });

module.exports = initializeServer;
