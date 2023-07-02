'use client'

import p5Types, {SoundFile, Amplitude, FFT} from 'p5'
import React from "react";
import {SoundSketchComponent} from "@/components/soundsketch";

// dynamic import する場合は p5.soundで拡張される p5 の型情報がコーディング時に反映されないので、 import type をする。
import type from "p5/lib/addons/p5.sound"


let mySound: SoundFile;
let amplitude: Amplitude;
let fft: FFT;

/**
 * p5.js のFFT
 * https://p5js.org/reference/#/p5.FFT
 * @constructor
 */
export default function AmplitudeReactive() {

    const width = 800;
    const height = 800;

    const createAmplitude = (p5: p5Types): Amplitude => {
        // new Amplitude()や new p5.Amplitude() をした場合エラーがでるので、constructorから取ってきて作成。
        // https://github.com/processing/p5.js-sound/issues/512#issuecomment-730682311
        // https://github.com/P5-wrapper/react/issues/61#issuecomment-730676614
        // @ts-ignore
        return new p5.constructor.Amplitude();
    }

    const createFFT = (p5: p5Types): FFT => {
        // new Amplitude()や new p5.Amplitude() をした場合エラーがでるので、constructorから取ってきて作成。
        // https://github.com/processing/p5.js-sound/issues/512#issuecomment-730682311
        // https://github.com/P5-wrapper/react/issues/61#issuecomment-730676614
        // @ts-ignore
        return new p5.constructor.FFT();
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

        fft = createFFT(p5);
        console.debug(fft)
    };

    const draw = (p5: p5Types) => {
        p5.background(220);

        let spectrum = fft.analyze();
        p5.noStroke();
        p5.fill(255, 0, 255);
        for (let i = 0; i < spectrum.length; i++) {
            let x = p5.map(i, 0, spectrum.length, 0, width);
            let h = -height + p5.map(spectrum[i], 0, 255, height, 0);
            p5.rect(x, height, width / spectrum.length, h)
        }

        let waveform = fft.waveform();
        p5.noFill();
        p5.beginShape();
        p5.stroke(20);
        for (let i = 0; i < waveform.length; i++) {
            let x = p5.map(i, 0, waveform.length, 0, width);
            let y = p5.map(waveform[i], -1, 1, 0, height);
            p5.vertex(x, y);
        }
        p5.endShape();

        p5.text('tap to play', 20, 20);
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
