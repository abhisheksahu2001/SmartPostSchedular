import Redis from 'ioredis';
import RedisUrl from '../config/redis'
import { Queue, Worker, Job, } from 'bullmq';
// import ioredis from 'ioredis'
interface Post {
    _id: string;
    caption: string;
    time: string;
}
// const connection = new ioredis(`redis://${RedisUrl}`);
const redisOptions = {
    host: 'localhost', // or the IP address of your WSL instance
    port: 6379, // the default Redis port
};

const connection = new Redis(redisOptions);
const PostQueue = new Queue<Post>('PostQueue', {
    connection

})

const processScheduledPost = async (job: Job<Post>) => {
    try {

        console.log(job.data);
    } catch (error: any) {
        console.error(`Error posting ${job.id} to social media:`, error.message);
    }
};

const worker = new Worker<Post>('PostQueue', processScheduledPost);

// Add a job to the queue
export const addJobToQueue = async (post: Post) => {
    try {
        const now = Date.now();
        const delay = new Date(post.time).getTime() - now;

        await PostQueue.add('scheduled-post', post, {
            delay,
        });

        console.log(`Job added for post ${post.time}`);
    } catch (error) {
        console.error(`Error adding job for post ${post._id}: ${error}`);
    }
};
