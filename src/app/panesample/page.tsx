'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import {makeFolder, makeMonitor, makeSeparator, useTweaks} from "use-tweaks"
import {MutableRefObject, useRef} from "react";


const canvasSize = {
    x: 500,
    y: 500,
};

// let ellipsePosX = 0;
let ellipsePosY = 250;

export default function Page() {

    const ellipsePosX = useRef(0)

    const tweaks = useTweaks(`hello this is tweaks`, {
        color: '#FFFFFF',
        ...makeSeparator(),
        ...makeFolder('speedX', {
            speed: 1,
            factor: {value: 1, min: 1, max: 10},
        }),
        ...makeSeparator(),
        ...makeFolder('radius', {
            radius: {value: 30, min: 20, max: 80},
        }),
        ...makeSeparator(),
        ...makeMonitor('myMonitor', ellipsePosX, {
            view: 'graph',
            min: 0,
            max: 500,
        }),
        ...makeMonitor('fnMonitor', Math.random, {
            view: 'graph',
            min: -0.5,
            max: 1.5,
            interval: 100,
        }),
        ...makeMonitor("TestMonitor", ellipsePosX, {
            bufferSize: 10,
        }),
    });


    return (
        <>
            speed {tweaks.speed}
            <br/>
            factor {tweaks.factor}
            <br/>

            <Wrapper {...tweaks} ellipsePosXRef={ellipsePosX}/>
        </>
    );
}

interface WrapperProp {
    color: string,
    speed: number,
    factor: number,
    radius: number,

    ellipsePosXRef: MutableRefObject<number>
}


const Wrapper: React.FC<WrapperProp> = (tweaks) => {

    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {

        const ellipsePosX = tweaks.ellipsePosXRef.current;


        p5.background(0);

        p5.fill(tweaks.color)

        p5.ellipse(ellipsePosX, ellipsePosY, tweaks.radius, tweaks.radius);


        let nextPosX = ellipsePosX;
        nextPosX += tweaks.speed * tweaks.factor;
        nextPosX %= canvasSize.x;

        if (nextPosX < 0) {
            nextPosX = canvasSize.x - Math.abs(ellipsePosX);
        }

        // 更新
        tweaks.ellipsePosXRef.current = nextPosX;

    };


    return (
        <>
            <SketchComponent setup={setUp} draw={draw}/>
        </>
    )
}

