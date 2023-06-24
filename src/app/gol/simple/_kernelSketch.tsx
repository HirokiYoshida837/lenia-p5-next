'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import p5 from "p5";
import {convolution} from "@/app/gol/simple/convolution";
import React from "react";


interface Props {

    kernel: number[][]

}


export const KernelSketch: React.FC<Props> = (props) => {


    console.log(props.kernel)


    const setUp = (p5: p5Types, canvasParentRef: Element) => {

        p5.createCanvas(100, 100).parent(canvasParentRef);

        p5.noLoop();
        p5.background(0);


        drawCanvas(p5, props.kernel)

    }

    const draw = (p5: p5Types) => {
        // p5.background(0);
        // drawCanvas(p5, props.kernel)
    }

    return (
        <>
            <SketchComponent setup={setUp} draw={draw}/>
        </>
    )

}


const drawCanvas = (p5: p5, kernel: number[][]) => {

    p5.background(0);

    const rectWidth = Math.floor(100 / kernel[0].length);
    const rectHeight = Math.floor(100 / kernel.length);

    p5.push()
    p5.rectMode("center")

    for (let i = 0; i < kernel.length; i++) {
        for (let j = 0; j < kernel[i].length; j++) {

            const v = kernel[j][i];

            if (v == 1) {

                p5.fill("#00F000")
                p5.noStroke()

                const x = j * rectWidth + rectWidth / 2;
                const y = i * rectHeight + rectHeight / 2;
                p5.rect(x, y, rectWidth, rectHeight);

            }
        }
    }
    p5.pop()
}


