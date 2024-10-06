const Queue = require('bull');
const { task } = require('./task');

// The queue which stores all the requests of the users

const taskQueue = new Queue('taskQueue', {
  redis: {
    host: 'localhost',
    port: 6379,
  }
});

taskQueue.process(async (job, done) => {
  const { userId } = job.data;
  await task(userId);
  done();
});

module.exports = taskQueue;
