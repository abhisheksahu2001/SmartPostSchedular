import axios from "axios"
import URLs from "../../config/urls"



export const getPostData = async () => {
    const response = await axios.get(URLs.getData);
    return response.data.res;
}
interface PostData {
    key: string,
}

export const postQueueData = async (id: string) => {
    const response = await axios.post(URLs.postData, { 'key': id });
    return response;
}
export const FailedQueueOperation = async () => {
    console.log('failed');
}