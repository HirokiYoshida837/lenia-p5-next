'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import p5 from "p5";
import {convolution} from "@/app/gol/simple/convolution";
import React from "react";


interface Props {

    kernel: number[][]

    scale:number

}


export const KernelSketch: React.FC<Props> = (props) => {


    console.log(props.kernel)


    const setUp = (p5: p5Types, canvasParentRef: Element) => {

        p5.createCanvas(208, 208).parent(canvasParentRef);

        p5.noLoop();
        p5.background(0);


        drawCanvas(p5, props.kernel, props.scale)

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


const drawCanvas = (p5: p5, kernel: number[][], scale:number) => {


    const rectWidth = Math.floor(208 / kernel[0].length);
    const rectHeight = Math.floor(208 / kernel.length);

    p5.push()
    p5.rectMode("center")

    p5.colorMode('hsb', 100);
    p5.background(0);

    for (let i = 0; i < kernel.length; i++) {
        for (let j = 0; j < kernel[i].length; j++) {

            const v = kernel[j][i];

            const v1 = (v * scale + 60) % 100;

            p5.fill(v1, 100, 80)

            // p5.noStroke()

            const x = j * rectWidth + rectWidth / 2;
            const y = i * rectHeight + rectHeight / 2;
            p5.rect(x, y, rectWidth, rectHeight);
            // }
        }
    }
    p5.pop()
}


