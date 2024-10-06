const fs = require('fs');

// Has all the functionality of logging
// could have used winston here as well but i guess this works

function logTaskCompletion(userId) {
  const logMessage = `${userId}-task completed at-${Date.now()}\n`;
  fs.appendFileSync('logs/task-log.txt', logMessage);
}

async function task(userId) {
    console.log(`${userId}-task completed at-${Date.now()}`);
    logTaskCompletion(userId);
}

module.exports = {
    task: task
}
  