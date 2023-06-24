'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import React, {MutableRefObject, useState} from 'react';


interface Props {

    canvasInfo: CanvasInfo
    fieldRef: MutableRefObject<number[][]>
}

interface CanvasInfo {

    canvasSize: { x: number, y: number },

    gridSize: { w: number, h: number },
}


export const Plotter: React.FC<Props> = ({canvasInfo, fieldRef}) => {

    const canvasSize = canvasInfo.canvasSize;


    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
        p5.frameRate(10)
    };

    const draw = (p5: p5Types) => {
        drawCanvas(p5, fieldRef.current, canvasInfo)
    }

    return (
        <>
            <SketchComponent
                setup={setUp}
                draw={draw}
                // mouseClicked={p5 => p5.redraw()}
            />

        </>
    )

}


const drawCanvas = (p5: p5Types, A: number[][], canvasInfo: CanvasInfo) => {

    p5.background(0);

    const rectWidth = canvasInfo.canvasSize.x / canvasInfo.gridSize.w;
    const rectHeight = canvasInfo.canvasSize.y / canvasInfo.gridSize.h;

    p5.push()
    p5.rectMode("center")

    p5.colorMode('hsb', 100);
    p5.background(0);


    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[i].length; j++) {

            const v = A[i][j];

            const v1 = (v * 75 + 60) % 100;

            p5.fill(v1, 100, 80)

            const x = j * rectWidth + rectWidth / 2;
            const y = i * rectHeight + rectHeight / 2;
            p5.rect(x, y, rectWidth, rectHeight);

        }
    }
    p5.pop()
}


