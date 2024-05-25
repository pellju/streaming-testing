import { streams, openingStream, deleteStream } from '../services/ffmpegService';

const addStream = (name: string, input: string): boolean => {

    // ToDo: Check that input is not valid URL!
    // ToDo: Add metadatainfo

    // Checking that name is unique (result is -1 if does not exist):
    if (streams.findIndex(steram => steram.streamname === name) > 0) {
        // ToDo: Improve error management and notify user that the stream with given name already exists
        return false;
    } else {

        if (!openingStream(input, name)) {
            throw new Error ('Issues with Ffmpeg!');
        } else {
            return true;
        }
    }

};

const removeStream = (name: string): boolean => {
    return deleteStream(name);
};

const listStreamNames = (): string[] => {
    const streamList: string[] = streams.map(item => item.streamname);
    return streamList;
};

export { listStreamNames, addStream, removeStream }