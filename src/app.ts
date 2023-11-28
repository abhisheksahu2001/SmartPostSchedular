import { addJobToQueue } from './Queue';
import { getPostData, postQueueData } from './api/service'
import { convertTimeToISO } from './database';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export interface QueueItem {
    key: string;
    time: string;
}

(async () => {
    const data = await getPostData();
    data.forEach((element: QueueItem) => {
        addJobToQueue({ key: element.key, time: convertTimeToISO(element.time) })
    });


})()

