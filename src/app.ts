import { addJobToQueue } from './Queue';
import { PostData } from './database'
PostData.forEach((post) => {
    addJobToQueue(post);
})
