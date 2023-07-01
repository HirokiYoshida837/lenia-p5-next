'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';


// const sharpen2 = [
//     [-1, -1, -1],
//     [-1, 9, -1],
//     [-1, -1, -1]
// ];
//
// const gaussianWeight = [
//     [1, 4, 7, 4, 1],
//     [4, 16, 26, 16, 4],
//     [7, 26, 41, 26, 7],
//     [4, 16, 26, 16, 4],
//     [1, 4, 7, 4, 1],
// ]
//
// const gaussianWeightSum = gaussianWeight
//     .map(x => x.reduce((a, b) => a + b))
//     .reduce((a, b) => a + b);
//
//
// const gauussianFilter5x5 = gaussianWeight.map(x=>x.map(y=>y/gaussianWeightSum));
//
// const matrix = gauussianFilter5x5;
// const matrixSize = 5;



let image: p5Types.Image;

export default function Home() {

    const w = 80;


    const preload = (p5: p5Types) => {

        // https://en.wikipedia.org/wiki/File:Schmitt_moonwalk.jpg
        image = p5.loadImage("/assets/Schmitt_moonwalk.jpg",
            p1 => {
                console.info(`loading image success`)
                console.log(`width`, p1.width)
            },
            event => {
                console.error(event)
                alert("loading image failed")
            }
        );

    }


    const setUp = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(image.width, image.height)
            .parent(canvasParentRef);


        image.loadPixels();

        p5.pixelDensity(1);
    };

    const draw = (p5: p5Types) => {

        p5.background(image)

        // // Calculate the small rectangle we will process
        // const xstart = p5.constrain(p5.mouseX - w / 2, 0, image.width);
        // const ystart = p5.constrain(p5.mouseY - w / 2, 0, image.height);
        // const xend = p5.constrain(p5.mouseX + w / 2, 0, image.width);
        // const yend = p5.constrain(p5.mouseY + w / 2, 0, image.height);
        // // const matrixsize = 3;
        //
        // p5.loadPixels();
        //
        // // Begin our loop for every pixel in the smaller image
        // for (let x = xstart; x < xend; x++) {
        //     for (let y = ystart; y < yend; y++) {
        //         let c = convolution(p5, x, y, matrix, matrixSize, image);
        //
        //         // retrieve the RGBA values from c and update pixels()
        //         let loc = (x + y * image.width) * 4;
        //         p5.pixels[loc] = p5.red(c);
        //         p5.pixels[loc + 1] = p5.green(c);
        //         p5.pixels[loc + 2] = p5.blue(c);
        //         p5.pixels[loc + 3] = p5.alpha(c);
        //     }
        // }
        // p5.updatePixels();
    };


    return (
        <>
            <SketchComponent
                preload={preload}
                setup={setUp}
                draw={draw}
            />
        </>
    );
}
