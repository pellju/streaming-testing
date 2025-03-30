import ffmpeg, {FfmpegCommand} from 'fluent-ffmpeg';
import { Stream } from '../models/stream.model';
import { updateStreamLastStart } from './streamDatabaseService';

// Defining custom type for the combination of Strings (names) and Ffmpegs
type streaminfo = {
    streamname: string;
    streamobject: FfmpegCommand;
}

// Using an array to store the streaming object itself
let streams: streaminfo[] = [];

// Opening stream and checking if it works (signal from input) => true, else => false
const openingStream = (input: string, name: string, disableTlsCheck: boolean): boolean => {

    let tlsCheck = 1;
    if (disableTlsCheck) {
        tlsCheck = 0;
    }

    try {
        // Consider that input has been sanitized
        const stream: FfmpegCommand = ffmpeg(input)
        .addOption('-c', 'copy')
        .addOption('-f', 'hls')
        .addOption('-hls_time', '10')
        .addOption('-hls_list_size', '3')
        .addOption('-hls_delete_threshold', '3')
        .addOption('-hls_flags delete_segments')
        .addOption('-tls_verify', `${tlsCheck}`)
        .on('error', function(err) {
            // ToDo: Better error handling
            console.log('Following error:');
            console.log(err);
        })
        .save(__dirname + '/../streams/' + name + '.m3u8');

        const streamCombination: streaminfo = {
            streamname: name,
            streamobject: stream
        };
        streams.push(streamCombination);
        return true;

    } catch (e: any) {
        console.log('Error!');
        console.log(e.message);
        return false;
    }
};

// Removing stream from the stream-array
const deleteStream = (name: string): boolean => {

    try {
        // Checking if the stream with given name is added, if not, returning false
        const streamInfoObject: streaminfo | undefined = streams.find(item => item.streamname === name) || undefined;
        if (streamInfoObject) {
            // Getting the streaminfo-object used which is supposed to be removed
            const removableItemIndex: number = streams.findIndex(item => item.streamname === name);
            streams[removableItemIndex].streamobject.kill('SIGINT');
            streams.splice(removableItemIndex, 1);
        }

        return true;
    } catch (e: any) {
        console.log('Error!');
        console.log(e.message);
        return false;
    }
}

const restartingStream = async (streaminfo: any) => { // ToDo: Fix type
    const name = streaminfo.name;
    const url = streaminfo.url;
    const disableTlsCheck = streaminfo.disableTlsCheck;
    
    const restartingStream = openingStream(url, name, disableTlsCheck);

    if (restartingStream) {
        // Return true, updating the lastStart, fetch the time using Date.now();
        const updatedLastStart: boolean = await updateStreamLastStart(name);
        if (updatedLastStart) {
            return true;
        } else {
            console.log("Error updating lastStart, deleting stream!");
            deleteStream(name);
            return false;
        }
    } else {
        console.log("Error opening stream!");
        return false;
    }
}

export { openingStream, streams, deleteStream, restartingStream}