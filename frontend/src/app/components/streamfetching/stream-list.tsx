'use client'

import React from "react";

export async function StreamListing() {
 
    const streamList: any[] = ['test'];

    return (
        <div>
            <h2>Here are the accessible streams:</h2>
            <div>
                {streamList.map((item) => (
                    <p key={item}>{item}</p>
                ))}
            </div>
        </div>
    )
}