'use client'

import p5Types from 'p5'
import { SketchComponent } from '@/components/components';
import { useState } from 'react';

const canvasSize = {
    x: 500,
    y: 500,
};


let ellipsePosXA = 0;
let ellipsePosYA = 250;

const SampleA: React.FC = () => {

    const [radius, setRadius] = useState<number>(30);

    const changeRadius = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value: number = Number(e.target.value);
        setRadius(value);
    };

    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.ellipse(ellipsePosXA, ellipsePosYA, radius, radius);

        ellipsePosXA += 5;

        if (ellipsePosXA > canvasSize.x) {
            ellipsePosXA = 0;
        }
    };


    return (
        <>
            <SketchComponent setup={setUp} draw={draw} />

            radius {" "}
            <input
                type="range"
                value={radius}
                min="10"
                max="100"
                onChange={changeRadius}
            />
        </>
    )

}



// let radiusB = 30;

const SampleB: React.FC = () => {

    let ellipsePosXB = 0;
    let ellipsePosYB = 250;



    const [radiusB, setRadius] = useState<number>(30);

    const changeRadius = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value: number = Number(e.target.value);
        // radiusB = value;

        setRadius(value)
    };

    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.ellipse(ellipsePosXB, ellipsePosYB, radiusB, radiusB);

        ellipsePosXB += 5;

        if (ellipsePosXB > canvasSize.x) {
            ellipsePosXB = 0;
        }
    };


    return (
        <>
            <SketchComponent setup={setUp} draw={draw} />

            radius {" "}
            <input
                type="range"
                value={radiusB}
                min="10"
                max="100"
                onChange={changeRadius}
            />
        </>
    )

}



export default function Home() {



    return (
        <>
            <SampleA />

            <SampleB />


            {/* <SketchComponent setup={setUp} draw={draw} />

            <>
                radius {" "}
                <input
                    type="range"
                    value={radius}
                    min="10"
                    max="100"
                    onChange={changeRadius}
                />
            </> */}
        </>
    );
}
