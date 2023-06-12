'use client'

import p5Types from 'p5'
import { SketchComponent } from '@/components/components';
import { useState } from 'react';

const canvasSize = {
    x: 500,
    y: 500,
};

interface Prop {
    xPos: number
}

const SampleA: React.FC<Prop> = ({ xPos }) => {


    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.ellipse(xPos, 250, 30, 30);
    };


    return (
        <>
            <SketchComponent setup={setUp} draw={draw} />
        </>
    )

}



export default function Home() {

    const [xPos, setXPos] = useState<number>(30);

    const changeXPos = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setXPos(Number(e.target.value));
    };

    return (
        <>
            <SampleA xPos={xPos} />

            radius {" "}
            <input type="range"
                value={xPos}
                min="0"
                max="500"
                onInput={changeXPos}
            />
        </>
    );
}


// radius {" "}
// <input
//     type="range"
//     value={radius}
//     min="10"
//     max="100"
//     onChange={changeRadius}
// />