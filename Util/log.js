/*
 Purpose:-This is Log utility script helps to create log file.We can create basically 3 types of log.
 Please refere NPM winston for details.
 Date:- 25-05-2017
 */

var winston = require('winston');


winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { timestamp: true });
winston.add(winston.transports.File, { filename: 'winston-basic.log' });
module.exports = winston;

