const express = require('express');
const router = require('./index.route');
const expressWinston = require('express-winston');
const winston = require('winston');
const app = express();

// 1. User sends request
// 2. Pass it to rateLimiter to consume
// 3. if exceeded limit -> add to queue with a delay of 1s (as 1 request per seconds)
// 4. if not exceeded limit -> add directly to queue

// winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
    ]
});

// this is for logging 
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: false, // optional: log meta data about the request (default: true)
    msg: "HTTP {{req.method}} {{req.url}} {{req.statusCode}} {{req.responseTime}}ms {{req.ip}}", // optional: customize the logging message
    // expressFormat: true, // optional: use the default Express/morgan format
    colorize: false, // optional: colorize the log output
}));

app.use(express.json());

// router
app.use('/api/v1', router);

app.listen(4000, () => {
    console.log(`Server started on port ${4000}!`);
});
