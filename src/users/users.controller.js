const rateLimiter = require('../../config/redisLimiter');
const taskQueue = require('../../config/queue')

async function userTasks(req, res, next) {
    try {
        if(!req.body.hasOwnProperty('user_id')) {
            return res.status(500).json({message:"Invalid Request!"})
        }
        const { user_id } = req.body;

        // Rate limiting logic
        // Can add the below code in a different function of createTask() - but for current readablility purpose added it here itself

        try {
            // Push task to queue -  directly
            await rateLimiter.consume(user_id);
            taskQueue.add({ userId: user_id });
            res.status(200).json({message:'Task Received'});
        } catch (rateLimitError) {
            // Queue the task if rate limit exceeded
            console.log(rateLimitError);
            taskQueue.add({ userId: user_id }, { delay: 1000 }); // 1 second delay
            res.status(429).json({message:'Rate limit exceeded, task queued'});
        }

    } catch (rateLimitError) {
        res.status(500).json({message:"An error occured, please try again later!"})
    }
}

module.exports = {
    userTasks: userTasks
}