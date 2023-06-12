'use client'

import dynamic from 'next/dynamic'
import React from "react";
import { SketchProps } from 'react-p5';

// dynamic import しないと、 build時に window is not defined でエラー発生する
// Will only import `react-p5` on client-side
// https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    loading: () => <>loading...</>,
    ssr: false,
})


export const SketchComponent: React.FC<SketchProps> = (props: SketchProps) => {
    return (
        <Sketch {...props} />
    )
}
