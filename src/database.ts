import { parse } from 'date-fns';


export const convertTimeToISO = (time: string): string => {
    // Parse the date string into a Date object
    const parsedDate = parse(time, "yyyy-MM-dd'T'HH:mm:ss", new Date());

    // Check if parsing was successful
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
    }

    // Convert the parsed date to ISO string
    const isoTime = parsedDate.toISOString();
    return isoTime;
};

// export const PostData = [
//     {
//         _id: 'e4544343',
//         caption: "text",
//         time: convertTimeToISO('28-11-2023 12:25am')
//     },
//     {
//         _id: 'e4545643',
//         caption: "text",
//         time: convertTimeToISO('28-11-2023 12:27am')
//     },
//     {
//         _id: 'gth54343',
//         caption: "text",
//         time: convertTimeToISO('28-11-2023 12:30am')
//     },
//     {
//         _id: 'egrg4343',
//         caption: "text",
//         time: convertTimeToISO('28-11-2023 12:50am')
//     },
//     {
//         _id: 'e4trtyjr',
//         caption: "text",
//         time: convertTimeToISO('28-11-2023 12:40am')
//     },
// ]
