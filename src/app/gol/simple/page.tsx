'use client'

import {GoLSketch} from "@/app/gol/simple/_sketch";
import {glider3x3, glider8x8, gliderGun11x38, kernelDefault3x3} from "@/app/gol/simple/constants";
import {KernelSketch} from "@/app/gol/core/_kernelSketch";

export default function Home() {


    const gliderGun = gliderGun11x38;


    const initialField: (0 | 1)[][] = new Array(64)
        .fill([])
        .map(() => new Array(64).fill(0));

    for (let i = 0; i < gliderGun.length; i++) {
        for (let j = 0; j < gliderGun[i].length; j++) {

            initialField[10 + i][10 + j] = gliderGun[i][j];

        }
    }

    const kernel = kernelDefault3x3


    return (
        <>
            <GoLSketch
                initialField={initialField}
                kernel={kernel}
                canvasInfo={
                    {
                        canvasSize: {
                            x: 800,
                            y: 800
                        },
                        gridSize: {
                            h: 64,
                            w: 64
                        }

                    }
                }
            />

            {/*<KernelSketch kernel={kernel} scale={1}/>*/}


        </>
    );
}
