'use client'

import {GoLSketch} from "@/app/gol/simple/_sketch";
import {glider8x8, kernelDefault3x3} from "@/app/gol/simple/constants";
import {KernelSketch} from "@/app/gol/simple/_kernelSketch";

export default function Home() {


    const kernel = kernelDefault3x3


    return (
        <>
            <GoLSketch
                initialField={glider8x8}
                kernel={kernel}
                canvasInfo={
                    {
                        canvasSize: {
                            x: 800,
                            y: 800
                        },
                        gridSize: {
                            h: 8,
                            w: 8
                        }

                    }
                }
            />

            <KernelSketch kernel={kernel} scale={1}/>


        </>
    );
}
