'use client'

import p5Types from 'p5'
import React from "react";
import {SoundSketchComponent} from "@/components/soundsketch";

// dynamic import する場合は p5.soundで拡張される p5 の型情報がコーディング時に反映されないので、 import type をする。
import type from "p5/lib/addons/p5.sound"

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
            <SoundSketchComponent
                preload={preload}
                setup={setUp}
                draw={draw}
            />
        </>
    );
}
