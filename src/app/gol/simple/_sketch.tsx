'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';

const canvasSize = {
    x: 500,
    y: 500,
};

interface Field {

    gridW: number,
    gridH: number,

    InitialStatus: number[][]
}


// 初期状態
let A = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

const gridWidth = 8;
const gridHeight = 8;

// 生存判定に使うカーネル。自分の周囲8マスの状態を取得するのでこうなる。
const K = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]

const kSum = K.map(x => x.reduce((a, b) => a + b)).reduce((a, b) => a + b);
const kSize = 3;
const kMid = Math.floor(kSize / 2);


// https://levelup.gitconnected.com/playing-with-lenia-a-continuous-version-of-conways-game-of-life-a26a5a7f1680
export default function GoLSketch() {


    const drawCanvas = (p5: p5Types) => {

        p5.background(0);


        const rectWidth = canvasSize.x / gridWidth;
        const rectHeight = canvasSize.y / gridHeight;

        p5.push()
        p5.rectMode("center")

        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridHeight; j++) {

                const v = A[i][j];

                if (v == 1) {

                    p5.fill("#00F000")
                    p5.noStroke()

                    const x = i * rectWidth + rectWidth / 2;
                    const y = j * rectHeight + rectHeight / 2;
                    p5.rect(x, y, rectWidth, rectHeight);

                }
            }
        }
        p5.pop()
    }

    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);

        p5.frameRate(10)

        // 初期状態を描画
        drawCanvas(p5)
    };


    const draw = (p5: p5Types) => {

        // update status
        // const nextA = Array.from({length: gridHeight}, () => Array(gridWidth).fill(0));

        // Aの状態とkernelを畳み込みしたものを計算
        const convolved = convolution(p5, A, K);
        console.log(`convolved`, convolved)

        // 畳み込みの計算結果から、各セルが次のフレームでどうなっているかを計算。
        const diff = convolved.map(x => x.map(y => growth(y)));

        // update
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[i].length; j++) {
                A[i][j] = p5.constrain(A[i][j] + diff[i][j], 0, 1);
            }
        }

        console.log(`nextA`, A);


        // update canvas
        drawCanvas(p5);
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


function convolution(p5: p5Types, input: number[][], kernel: number[][], boundary: string = 'wrap') {

    const inputHeight = input.length;
    const inputWidth = input[0].length;

    const kernelHeight = kernel.length;
    const kernelWidth = kernel[0].length;

    const outputHeight = inputHeight;
    const outputWidth = inputWidth;

    const kernelCenterX = Math.floor(kernelWidth / 2);
    const kernelCenterY = Math.floor(kernelHeight / 2);


    const output: number[][] = new Array(outputHeight)
        .fill([])
        .map(() => new Array(outputWidth).fill(0));


    // inputすべてのマスについて処理
    for (let i = 0; i < outputHeight; i++) {
        for (let j = 0; j < outputWidth; j++) {

            let sum = 0;
            // 畳み込み実行
            for (let k = 0; k < kernelHeight; k++) {
                for (let l = 0; l < kernelWidth; l++) {

                    const inputRowIndex = getBoundaryIndex(i + k - kernelCenterY, inputHeight, boundary);
                    const inputColIndex = getBoundaryIndex(j + l - kernelCenterX, inputWidth, boundary);
                    sum += input[inputRowIndex][inputColIndex] * kernel[k][l];
                }
            }
            output[i][j] = sum;
        }
    }

    return output;
}

function getBoundaryIndex(index: number, length: number, boundary: string): number {
    if (boundary === 'wrap') {
        return (index + length) % length;
    } else if (boundary === 'reflect') {
        if (index < 0) {
            return -index;
        } else if (index >= length) {
            return 2 * (length - 1) - index;
        }
    }
    // 'constant' バウンダリーの場合や、その他の場合は元のインデックスを返す
    return index;
}


