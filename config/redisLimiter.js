const Redis = require('ioredis');
const redisClient = new Redis();

// Initializes redis and creates a rate limiter

const { RateLimiterRedis } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, // 20 requests
  duration: 60, // Per minute per user_id
  keyPrefix: 'user_rate',
});

redisClient.on('error',(err)=>{
  console.log(err);
})

redisClient.on('connect',()=>{
  console.log("redis connected");
})


module.exports = rateLimiter;
