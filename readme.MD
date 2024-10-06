##  **Project Overview**

A pretty cool Node.js project that implements a user-based task queuing system with rate limiting. The API allows users to submit tasks which are processed in accordance with specific rate limits (1 task per second and 20 tasks per minute). Tasks that exceed the rate limit are queued and processed after the specified delay. The project uses Redis for queue management and rate limiting. For **FinTarget**

---

## **Packages and Libraries Used**

- **Express**: Web framework for building the REST API.
- **ioredis**: Redis client to handle Redis interactions.
- **pm2**: To create clusters/ replicas for nodejs
- **bull**: A Redis-based queue system to manage task queuing.
- **redis-rate-limiter**: Rate limiting mechanism built on Redis to enforce task processing limits.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **nodemon**: A development tool that automatically restarts the server on file changes.

---

## **How It Works**

1. **Rate Limiting**: Each user is allowed to submit 1 task per second and up to 20 tasks per minute. If a user exceeds the limit, tasks are automatically queued and processed later.
   
2. **Task Queuing**: The Bull queue system is used to manage tasks that are submitted but exceed the rate limit. These tasks are processed after the required delay, ensuring no task is lost.

3. **Task Logging**: Upon task completion, a log is generated with the user ID and the task completion timestamp, which is stored in a log file.

4. **Cluster Support**: The project can scale horizontally by running multiple instances (replica sets) of the Node.js API to handle increased load by pm2 (cool stuff). Redis acts as a centralized store for queuing and rate limiting, making clustering feasible.

5. **Error Handling**: The API implements robust error handling, including handling rate limit errors, Redis connection issues, and unexpected failures to ensure system resilience.

---

## **How to Set Up the Project**

#### **Prerequisites:**
- Node.js (>= v14.0)
- Redis Server (>= v6.0)
- NPM or Yarn
- Git

#### **Steps**:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nishaaannnt/user-queue.git
   cd user-queue
   ```

2. **Install Dependencies**:
   Run the following command to install all required packages:
   ```bash
   npm install
   ```

3. **Start Redis Server**:
   Ensure Redis is running. If Redis is installed locally, you can start it with:
   ```bash
   redis-server
   ```

4. **Run the Project**:
   Start the server in development mode using `nodemon`:
   ```bash
   pm2 start server.js -i 2 # Starts two replica sets

   ```

6. **Testing the API**:
   You can use tools like Postman or Curl to make POST requests to the following endpoint:
   ```
   POST http://localhost:4000/api/v1/task
   Body: { "user_id": "123" }
   ```

---

Got to learn some new stuff. Cool task