'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import p5 from "p5";
import {convolution} from "@/app/gol/simple/convolution";
import React from "react";
import {bellCurve} from "@/app/gol/lenia/utils";

export interface LeniaProps {
    initialField: number[][],

    kernel: Kernel,

    canvasInfo: CanvasInfo,


    simulationInfo:SimulationInfo
}

interface Kernel {
    kernelMatrix: number[][],
    kernelSize: number;
}

interface SimulationInfo {
    T: number

    growthM: number
    growthS: number
}



interface CanvasInfo {

    canvasSize: { x: number, y: number },

    gridSize: { w: number, h: number },
}


// https://levelup.gitconnected.com/playing-with-lenia-a-continuous-version-of-conways-game-of-life-a26a5a7f1680
export const LeniaSketch: React.FC<LeniaProps> = ({...props}: LeniaProps) => {

    console.log(`initial props`, props)

    const growth = createGrowthFunc(props.simulationInfo.growthM, props.simulationInfo.growthS)


    //  steps per unit time
    const T = 8;

    // 初期状態
    let stateA: number[][] = [];

    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(props.canvasInfo.canvasSize.x, props.canvasInfo.canvasSize.y).parent(canvasParentRef);

        p5.frameRate(30)

        stateA = props.initialField

        // 初期状態を描画
        drawCanvas(p5, stateA, props.canvasInfo)
    };


    const draw = (p5: p5Types) => {

        // update status

        // Aの状態とkernelを畳み込みしたものを計算
        const convolved = convolution(stateA, props.kernel.kernelMatrix, 'wrap');
        // console.debug(`convolved`, convolved)

        // 畳み込みの計算結果から、各セルが次のフレームでどうなっているかを計算。
        const diff = convolved.map(x => x.map(y => growth(y)))
            .map(x => x.map(y => y / T))
        ;
        // console.log(`diff`, diff)


        // update
        for (let i = 0; i < stateA.length; i++) {
            for (let j = 0; j < stateA[i].length; j++) {

                const value = diff[i][j];
                stateA[i][j] = p5.constrain(stateA[i][j] + value, 0, 1);
            }
        }

        // console.debug(`nextA`, stateA);

        // update canvas
        drawCanvas(p5, stateA, props.canvasInfo);
        // drawCanvas(p5, diff, props.canvasInfo);
    };


    return (
        <>
            <SketchComponent setup={setUp} draw={draw}/>
        </>
    );
}


const createGrowthFunc = (m:number, s:number) => {
    return (u:number) => {
        return (bellCurve(u, m, s) * 2) - 1;
    }
}

const drawCanvas = (p5: p5, A: number[][], canvasInfo: CanvasInfo) => {

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


