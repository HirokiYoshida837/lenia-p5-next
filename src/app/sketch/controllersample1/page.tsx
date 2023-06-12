'use client'

import p5Types from 'p5'
import { SketchComponent } from '@/components/components';
import { LegacyRef, MutableRefObject, forwardRef, useRef, useState } from 'react';

const canvasSize = {
    x: 500,
    y: 500,
};

interface Prop {
    radius: number
}

const SampleA: React.FC<Prop> = ({ radius }) => {

    // propのradiusが変更されるたびにコンポーネントが再レンダリングされるので、座標が元に戻る? -> 上位側のstateが変わったので再レンダリングに巻き込まれてる。
    // スケッチ内部的にもつ値で、再レンダリング毎にリフレッシュされるべきものであればReact.FC内で変数定義。

    // FCの外で変数定義していると、グローバル領域に値をもつのでコンポーネントが再レンダリングされても値を保ち続ける。
    let posX = 0;
    let posY = 250;

    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.x, canvasSize.y).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);

        posX += 5;
        posX %= 500;

        p5.ellipse(posX, posY, radius, radius);
    };


    return (
        <>
            <SketchComponent setup={setUp} draw={draw} />
        </>
    )

}



// const MyInput = forwardRef(({ value, onChange }: any, ref:any) => {
//     return (
//         <input
//             value={value}
//             onChange={onChange}
//             ref={ref}
//         />
//     );
// });

// interface SliderProp {
//     value:number
//     onchange: any
// }

// const RefSlider = forwardRef((props:SliderProp, ref:any) => {

//     return (
//         <>
//             radius {" "}
//             <input type="range"
//                 value={props.value}
//                 min="20"
//                 max="500"
//                 onChange={props.onchange}
//                 ref={ref}
//             />
//         </>
//     )

// });

// const Slider = (props: SliderProp) => {

//     // const changeRadius = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     //     // setRadius(Number(e.target.value));
//     //     props.ref.current = Number(e.target.value);
//     // };

//     return (
//         <>
//             radius {" "}
//             <input type="range"
//                 value={props.value}
//                 min="20"
//                 max="500"
//                 onChange={props.onchange}
//             />
//         </>
//     )
// }


// https://ja.legacy.reactjs.org/docs/forwarding-refs.html


// export default function Home() {

//     const radiusRef = useRef<number>(30);

//     // const [radius, setRadius] = useState<number>(30);

//     // let radius = 20;

//     const changeRadius = (e: React.ChangeEvent<HTMLInputElement>): void => {
//         radiusRef.current = (Number(e.target.value));
//     };

//     return (
//         <>
//             <SampleA radius={20} />

//             {/* <Slider ref={radiusRef} /> */}

//             <RefSlider value={20} onchange={changeRadius} ref={radiusRef}/>

//         </>
//     );
// }


// // radius {" "}
// // <input
// //     type="range"
// //     value={radius}
// //     min="10"
// //     max="100"
// //     onChange={changeRadius}
// // />