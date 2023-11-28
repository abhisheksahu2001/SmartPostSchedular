import Redis from 'ioredis';
import { Queue, Worker, Job, } from 'bullmq';
import { QueueItem } from './app';
import { postQueueData } from './api/service';
// import ioredis from 'ioredis'

// const connection = new ioredis(`redis://${RedisUrl}`);
const redisOptions = {
    host: 'localhost', // or the IP address of your WSL instance
    port: 6379, // the default Redis port
};

const connection = new Redis(redisOptions);
const PostQueue = new Queue<QueueItem>('PostQueue', {
    connection

})

const processScheduledPost = async (job: Job<QueueItem>) => {
    try {
        await postQueueData(job.data.key);
    } catch (error: any) {
        console.error(`Error posting ${job.id} to social media:`, error.message);
    }
};

const worker = new Worker<QueueItem>('PostQueue', processScheduledPost);

// Add a job to the queue
export const addJobToQueue = async (post: QueueItem) => {
    try {
        const now = Date.now();
        const delay = new Date(post.time).getTime() - now;

        await PostQueue.add('scheduled-post', post, {
            delay,
        });

        console.log(`Job added for post ${post.time}`);
    } catch (error) {
        console.error(`Error adding job for post ${post.key}: ${error}`);
    }
};
