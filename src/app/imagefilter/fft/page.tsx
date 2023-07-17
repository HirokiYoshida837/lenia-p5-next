'use client'

import p5Types from 'p5'
import {SketchComponent} from '@/components/components';
import {my2dConvolutionWithFFT} from "@/logics/fft2d/convolution2d";
import {Complex} from "@/logics/fft/compolex";
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


        // 左上から右下までconvolutionする
        const xstart = 0;
        const ystart = 0;
        const xend = image.width;
        const yend = image.height;

        p5.loadPixels();

        const inputPadding0: number[][] = new Array(image.width).fill([]).map(() => new Array(image.width).fill(0).map(x => 0))
        for (let x = 0; x < xend; x++) {
            for (let y = 0; y < yend; y++) {
                const p = image.get(x, y)
                const sumValue = p[0] + p[1] + p[2];
                inputPadding0[y][x] = sumValue/3;
            }
        }



        const input = inputPadding0.map(x => x.map(y => new Complex(y, 0)))
        // const kernel = matrix.map(x => x.map(y => new Complex(y, 0)));
        const kernel = createKernel().map(x=>x.map(y=>new Complex(y,0)));

        // 畳み込み実施

        const colors = my2dConvolutionWithFFT(input, kernel, input[0].length, kernel[0].length);

        for (let i = 0; i < image.height; i++) {
            for (let j = 0; j < image.width; j++) {
                const v = colors[i][j].real;
                image.set(j, i, v);
                // image.set(j, i, p5.constrain(255 * v/1024, 0, 255));
            }
        }

        image.updatePixels();

        p5.image(image, 0, 0)

        // p5.background(image)
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

