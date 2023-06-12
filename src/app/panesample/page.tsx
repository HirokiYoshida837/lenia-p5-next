'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import {useState} from 'react';
import {makeFolder, makeSeparator, useTweaks} from "use-tweaks"


const canvasSize = {
    x: 500,
    y: 500,
};


export default function Page() {


    const tweaks = useTweaks(`hello this is tweaks`, {
        color: '#FFFFFF',
        ...makeSeparator(),
        ...makeFolder('speedX', {
            speed: 1,
            factor: {value: 1, min: 1, max: 10},
        }),
        ...makeSeparator(),
        ...makeFolder('radius', {
            // radius: 10,
            radius: {value: 30, min: 20, max: 80},
        })
    });


    return (
        <>
            speed {tweaks.speed}
            <br/>
            factor {tweaks.factor}
            <br/>


            <Wrapper {...tweaks}/>
        </>
    );
}

interface WrapperProp {
    color: string,
    speed: number,
    factor: number,
    radius: number
}

let ellipsePosX = 0;
let ellipsePosY = 250;

const Wrapper: React.FC<WrapperProp> = (tweaks) => {


    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);

        p5.fill(tweaks.color)

        p5.ellipse(ellipsePosX, ellipsePosY, tweaks.radius, tweaks.radius);

        ellipsePosX += tweaks.speed * tweaks.factor;
        ellipsePosX %= canvasSize.x;

        if (ellipsePosX < 0) {
            ellipsePosX = canvasSize.x - Math.abs(ellipsePosX);
        }




    };


    return (
        <>


            <SketchComponent setup={setUp} draw={draw}/>
        </>
    )
}

