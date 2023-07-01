'use client'

import dynamic from 'next/dynamic'
import React from "react";
import {SketchProps} from 'react-p5';

// dynamic import する場合は p5.soundで拡張される p5 の型情報がコーディング時に反映されないので、 import type をする。
import type from "p5/lib/addons/p5.sound"

// Will only import `react-p5` on client-side
const Sketch: React.ComponentType<SketchProps> = dynamic(() => import("react-p5").then((mod) => {

    // importing sound lib only after react-p5 is loaded
    require('p5/lib/addons/p5.sound');

    // returning react-p5 default export
    return mod.default
}), {
    ssr: false
});

export const SoundSketchComponent: React.FC<SketchProps> = (props: SketchProps) => {
    return (
        <Sketch {...props} />
    )
}
