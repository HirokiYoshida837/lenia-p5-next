'use client'

import {GoLSketch} from "@/app/gol/simple/_sketch";
import {glider8x8, kernelDefault3x3} from "@/app/gol/simple/constants";
import {KernelSketch} from "@/app/gol/core/_kernelSketch";
import {createKernel} from "@/app/gol/lenia/utils";
import {LeniaProps, LeniaSketch} from "@/app/gol/lenia/_sketch";
import {initialField} from "@/app/gol/lenia/constants";
import Image from "next/image";

export default function Home() {

    const kernel = createKernel();
    console.log(`kernel`, kernel)

    const initField: number[][] = new Array(64)
        .fill([])
        .map(() => new Array(64).fill(0));

    for (let i = 0; i < initialField.length; i++) {
        for (let j = 0; j < initialField[i].length; j++) {
            initField[i][j] = initialField[i][j];
        }
    }

    // for (let i = 0; i < 26; i++) {
    //     for (let j = 0; j < 40; j++) {
    //         initField[20 + i][20 + j] = 1;
    //     }
    // }

    console.log(`init field`, initField)


    const leniaProps: LeniaProps = {
        canvasInfo: {
            canvasSize: {
                x: 64 * 8,
                y: 64 * 8
            },
            gridSize: {
                h: 64,
                w: 64
            }
        },
        initialField: initField,

        kernel: {
            kernelMatrix: kernel,
            kernelSize: 26
        },

        simulationInfo: {
            T: 5,
            growthM: 0.14,
            growthS: 0.0185,
        }

    }


    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                <div className="grid grid-rows-2 gap-20">

                    <div>
                        <LeniaSketch {...leniaProps}/>
                    </div>

                    <div className="grid grid-cols-2 gap-20">

                        <div>
                            kernel
                            <KernelSketch kernel={kernel} scale={10000}/>
                        </div>

                        <div>
                            initial field
                            <KernelSketch kernel={initialField} scale={100}/>
                        </div>


                    </div>
                </div>
            </main>
        </>
    );
}
