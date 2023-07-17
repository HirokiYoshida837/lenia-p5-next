'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import {createKernel} from "@/app/gol/lenia/utils";


const sharpen2 = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]
];

const gaussianWeight = [
    [1, 4, 7, 4, 1],
    [4, 16, 26, 16, 4],
    [7, 26, 41, 26, 7],
    [4, 16, 26, 16, 4],
    [1, 4, 7, 4, 1],
]

const gaussianWeightSum = gaussianWeight
    .map(x => x.reduce((a, b) => a + b))
    .reduce((a, b) => a + b);


const gauussianFilter5x5 = gaussianWeight.map(x => x.map(y => y / gaussianWeightSum));

const matrix = gauussianFilter5x5;
// const matrix = sharpen2;
const matrixSize = 5;


let image: p5Types.Image;

export default function Home() {

    // const w = 80;


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

        // ループなし
        p5.noLoop();
    };

    const draw = (p5: p5Types) => {

        p5.background(image)

        // 左上から右下までconvolutionする
        const xstart = 0;
        const ystart = 0;
        const xend = image.width;
        const yend = image.height;

        p5.loadPixels();

        const kernel = createKernel();
        // Begin our loop for every pixel in the smaller image
        console.time(`convolution(naive)`)
        for (let x = xstart; x < xend; x++) {
            for (let y = ystart; y < yend; y++) {
                let c = convolution(p5, x, y, kernel, kernel.length, image);

                // retrieve the RGBA values from c and update pixels()
                let loc = (x + y * image.width) * 4;
                p5.pixels[loc] = p5.red(c);
                p5.pixels[loc + 1] = p5.green(c);
                p5.pixels[loc + 2] = p5.blue(c);
                p5.pixels[loc + 3] = p5.alpha(c);
            }
        }
        console.timeEnd(`convolution(naive)`)
        p5.updatePixels();
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

function convolution(p5: p5Types, x: number, y: number, matrix: number[][], matrixsize: number, img: p5Types.Image) {
    let rtotal = 0.0;
    let gtotal = 0.0;
    let btotal = 0.0;
    const offset = Math.floor(matrixsize / 2);
    for (let i = 0; i < matrixsize; i++) {
        for (let j = 0; j < matrixsize; j++) {
            // What pixel are we testing
            const xloc = x + i - offset;
            const yloc = y + j - offset;
            let loc = (xloc + img.width * yloc) * 4;

            // Make sure we haven't walked off our image, we could do better here
            loc = p5.constrain(loc, 0, img.pixels.length - 1);

            // Calculate the convolution
            // retrieve RGB values
            rtotal += img.pixels[loc] * matrix[i][j];
            gtotal += img.pixels[loc + 1] * matrix[i][j];
            btotal += img.pixels[loc + 2] * matrix[i][j];
        }
    }
    // Make sure RGB is within range
    rtotal = p5.constrain(rtotal, 0, 255);
    gtotal = p5.constrain(gtotal, 0, 255);
    btotal = p5.constrain(btotal, 0, 255);

    // Return the resulting color
    return p5.color(rtotal, gtotal, btotal);
}

