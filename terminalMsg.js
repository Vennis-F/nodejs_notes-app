const chalk = require("chalk")

const sucessMsg = chalk.inverse.bold.green
const errMsg = chalk.inverse.bold.red
const warnMsg = chalk.inverse.bold.yellow
module.exports = { sucessMsg, errMsg, warnMsg }
