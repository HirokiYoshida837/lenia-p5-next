'use client'

import p5Types, {SoundFile, Amplitude} from 'p5'
import React from "react";
import {SoundSketchComponent} from "@/components/soundsketch";

// dynamic import する場合は p5.soundで拡張される p5 の型情報がコーディング時に反映されないので、 import type をする。
import type from "p5/lib/addons/p5.sound"

let mySound: SoundFile;

/**
 * 音声波形の音量のグラフを描画する。
 * refs : https://stackoverflow.com/questions/55943459/creating-a-sound-wave-using-p5-js
 */
export default function Home() {

    // 波形グラフを出すだけでp5.jsにこだわらないのなら、 Wavesurfer.js なども選択肢としてある。

    let volumeHistory: Float32Array;

    const preload = (p5: p5Types) => {
        // [52Hz sound - PMEL Acoustics Program](https://www.pmel.noaa.gov/acoustics/whales/sounds/sounds_52blue.html)
        // p5.soundFormats('wav');
        mySound = p5.loadSound('/assets/ak52_10x.wav');
    }


    const setUp = (p5: p5Types, canvasParentRef: Element) => {

        const renderer = p5.createCanvas(1200, 400);
        renderer.parent(canvasParentRef)

        // getPeaksできるのは一回だけ。
        volumeHistory = mySound.getPeaks(255);

        p5.noLoop();
    };

    const draw = (p5: p5Types) => {

        console.log(`mysound on draw`, mySound)
        console.log(mySound.getPeaks(255))


        p5.background(245)

        const barWidth = 1;
        const offsetWidth = 3;

        const height = 100;
        let offset = 10;

        // drawing wave amplitudereactive graph.
        p5.push()
        p5.stroke(0, 109, 203)
        p5.fill(0, 109, 203)

        console.log(volumeHistory.length)

        p5.beginShape();
        for (let i = 0; i < volumeHistory.length; i++) {
            let barHeight = p5.map(volumeHistory[i], 0, 1, 1, height)
            p5.rect(i + offset, (height / 2.0) - (barHeight / 2.0), barWidth, barHeight);
            offset += offsetWidth;
        }
        p5.beginShape();

        p5.pop()
    };


    return (
        <>
            <SoundSketchComponent
                preload={preload}
                setup={setUp}
                draw={draw}
            />
        </>
    );
}
