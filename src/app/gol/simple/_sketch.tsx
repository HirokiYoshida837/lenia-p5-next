'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import p5 from "p5";
import {convolution} from "@/app/gol/simple/convolution";
import React from "react";

interface GameOfLifeProps {
    initialField: (0 | 1)[][],

    kernel: number[][],

    canvasInfo: CanvasInfo
}

interface CanvasInfo {

    canvasSize: { x: number, y: number },

    gridSize: { w: number, h: number },


}


// const kSum = Kernel.map(x => x.reduce((a, b) => a + b)).reduce((a, b) => a + b);
// const kSize = 3;
// const kMid = Math.floor(kSize / 2);


// https://levelup.gitconnected.com/playing-with-lenia-a-continuous-version-of-conways-game-of-life-a26a5a7f1680
export const GoLSketch: React.FC<GameOfLifeProps> = ({...props}: GameOfLifeProps) => {

    // 初期状態
    let stateA: number[][] = [];

    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(props.canvasInfo.canvasSize.x, props.canvasInfo.canvasSize.y).parent(canvasParentRef);

        // 10固定で。
        p5.frameRate(10)

        stateA = props.initialField

        // 初期状態を描画
        drawCanvas(p5, stateA, props.canvasInfo)
    };


    const draw = (p5: p5Types) => {

        // update status

        // Aの状態とkernelを畳み込みしたものを計算
        const convolved = convolution(stateA, props.kernel);
        console.debug(`convolved`, convolved)

        // 畳み込みの計算結果から、各セルが次のフレームでどうなっているかを計算。
        const diff = convolved.map(x => x.map(y => growth(y)));

        // update
        for (let i = 0; i < stateA.length; i++) {
            for (let j = 0; j < stateA[i].length; j++) {
                stateA[i][j] = p5.constrain(stateA[i][j] + diff[i][j], 0, 1);
            }
        }

        console.debug(`nextA`, stateA);


        // update canvas
        drawCanvas(p5, stateA, props.canvasInfo);
    };


    return (
        <>
            <SketchComponent setup={setUp} draw={draw}/>
        </>
    );
}


function growth(u: number): number {
    return 0 + (u === 3 ? 1 : 0) - ((u < 2) || (u > 3) ? 1 : 0);

    // if (u <= 1) {
    //     return -1;
    // } else if (u == 2) {
    //     return 0;
    // } else if (u == 3) {
    //     return 1;
    // } else {
    //     return -1;
    // }
}


const drawCanvas = (p5: p5, A: number[][], canvasInfo: CanvasInfo) => {

    p5.background(0);

    const rectWidth = canvasInfo.canvasSize.x / canvasInfo.gridSize.w;
    const rectHeight = canvasInfo.canvasSize.y / canvasInfo.gridSize.h;

    p5.push()
    p5.rectMode("center")

    for (let i = 0; i < canvasInfo.gridSize.h; i++) {
        for (let j = 0; j < canvasInfo.gridSize.w; j++) {

            const v = A[i][j];

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


