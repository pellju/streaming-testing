'use client'
import React from "react";

import { StreamFetcher } from "../data/actions/stream-fetcher"

export async function StreamListing() {

    const validStreams = await StreamFetcher();
    //console.log(StreamFetcher)

    return (
        <div>
            <h2>Here are the accessible streams:</h2>
            <div>
                {validStreams} 
            </div>
        </div>
    )
}