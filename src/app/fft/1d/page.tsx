'use client'

import p5Types from 'p5'
import dynamic from 'next/dynamic'
import React from "react";

// dynamic import する場合は p5.soundで拡張される p5 の型情報がコーディング時に反映されないので、 import type をする。
import type from "p5/lib/addons/p5.sound"

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => {

    // importing sound lib only after react-p5 is loaded
    require('p5/lib/addons/p5.sound');

    // returning react-p5 default export
    return mod.default
}), {
    ssr: false
});
let mySound: any;

export default function Home() {


    const preload = (p5: p5Types) => {
        p5.soundFormats('mp3');
        mySound = p5.loadSound('https://freesound.org/data/previews/612/612610_5674468-lq');
    }


    const setUp = (p5: p5Types, canvasParentRef: Element) => {

        const renderer = p5.createCanvas(800, 800);
        renderer.parent(canvasParentRef)
        renderer.mousePressed(
            () => {
                mySound.play();
            }
        )

        // cnv.mousePressed();
        p5.background(220);
        p5.text('tap here to play', 10, 20);


    };

    const draw = (p5: p5Types) => {

        // p5.background(128, 0, 0);
    };


    return (
        <>
            <Sketch
                // preload={preload}
                // setup={setUp}
                // draw={draw}
            />
        </>
    );
}
