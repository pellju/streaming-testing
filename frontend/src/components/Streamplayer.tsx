import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface StreamplayerProps {
    streamingUrl: string,
}

const Streamplayer: React.FC<StreamplayerProps> = ({ streamingUrl }) => {

    // ToDo: Investigate if video.js would be a better solution.

    // Hls.js set with the help from ChatGPT.
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (Hls.isSupported() && videoRef.current) {

            const hls = new Hls();
            hls.loadSource(streamingUrl);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log(" HLS manifest loaded successfully");
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS error: ", data);
            });

            return () => {
                hls.destroy();
            }
        } else if (videoRef.current && videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            videoRef.current.src = streamingUrl;
        } else {
            console.error("HLS not supported");
        }
    })

    return (
        <div>
            <video width='640' height='360' ref={videoRef} controls>Your browser does not support the video tag.</video>
        </div>
    )
}

export default Streamplayer;