'use client'

import p5Types, {SoundFile, Amplitude} from 'p5'
import React from "react";
import {SoundSketchComponent} from "@/components/soundsketch";

// dynamic import する場合は p5.soundで拡張される p5 の型情報がコーディング時に反映されないので、 import type をする。
import type from "p5/lib/addons/p5.sound"


let mySound: SoundFile;
let amplitude: Amplitude;

/**
 * 音声の大きさに応じて円の大きさが変わるスケッチ。p5.Amplitude のサンプルを移植。
 * [reference | p5.Amplitude](https://p5js.org/reference/#/p5.Amplitude)
 *
 */
export default function AmplitudeReactive() {

    const createAmplitude = (p5:p5Types): Amplitude => {
        // new Amplitude()や new p5.Amplitude() をした場合エラーがでるので、constructorから取ってきて作成。
        // https://github.com/processing/p5.js-sound/issues/512#issuecomment-730682311
        // https://github.com/P5-wrapper/react/issues/61#issuecomment-730676614
        // @ts-ignore
        return new p5.constructor.Amplitude();
    }



    const preload = (p5: p5Types) => {
        // [52Hz sound - PMEL Acoustics Program](https://www.pmel.noaa.gov/acoustics/whales/sounds/sounds_52blue.html)
        // p5.soundFormats('wav');
        mySound = p5.loadSound('/assets/ak52_10x.wav');
    }


    const setUp = (p5: p5Types, canvasParentRef: Element) => {

        const renderer = p5.createCanvas(800, 800);
        renderer.parent(canvasParentRef)

        const togglePlay = () => {
            if (mySound.isPlaying()) {
                mySound.pause();
            } else {
                mySound.loop();
                amplitude.setInput(mySound);
            }
        }

        renderer.mouseClicked(togglePlay);
        amplitude = createAmplitude(p5);

        console.debug(amplitude)
    };

    const draw = (p5: p5Types) => {
        p5.background(220);

        p5.text('tap to play', 20, 20);

        let level = amplitude.getLevel();
        let size = p5.map(level, 0, 1, 0, 200);
        p5.ellipse(800 / 2, 800 / 2, size, size);
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
