import {describe, expect, it} from "vitest";
import {Complex} from "../fft/compolex";
import {fft2d, naiveConvolution2d} from "../fft/fft2d";
import {atcoderFFT} from "../fft/atcoder/atcoderFFT";
import {myFft2d, myIFft2d} from "../fft2d/fft2d";
import {my2dConvolutionWithFFT} from "../fft2d/convolution2d";

describe("2次元畳み込みのテスト", () => {

    describe('', () => {

        const input = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0]
        ]

        const kernel = [
            [1, 0],
            [0, 1],
        ]

        it("2dComv", () => {

            const my2dConvolutionWithFFT1 = my2dConvolutionWithFFT(
                input.map(x => x.map(y => new Complex(y, 0))),
                kernel.map(x => x.map(y => new Complex(y, 0))),
                input.length, kernel.length);


            console.log(my2dConvolutionWithFFT1)
            console.log(JSON.stringify(my2dConvolutionWithFFT1.map(x => x.map(y => y.getPowSq()).map(y => Math.sqrt(y)))))
        })

        it("ナイーブ実装", () => {

            const my2dConvolutionWithFFT1 = naiveConvolution2d(input, kernel);
            console.log(JSON.stringify(my2dConvolutionWithFFT1))



            // console.log(JSON.stringify(my2dConvolutionWithFFT1.map(x => x.map(y => y.getPowSq()).map(y => Math.sqrt(y)))))
        })


    })


    describe('別ケース試す', () => {

        const input = [
            [0, 0, 0, 0],
            [0, 4, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0]
        ]

        const kernel = [
            [0, 2, 0, 0],
            [2, 3, 2, 1],
            [0, 2, 0, 0],
            [0, 1, 0, 0]
        ]

        it("2dComv", () => {

            const my2dConvolutionWithFFT1 = my2dConvolutionWithFFT(
                input.map(x => x.map(y => new Complex(y, 0))),
                kernel.map(x => x.map(y => new Complex(y, 0))),
                input.length, kernel.length);


            console.log(my2dConvolutionWithFFT1)
            // console.log(JSON.stringify(my2dConvolutionWithFFT1.map(x => x.map(y => y.getPowSq()).map(y => Math.sqrt(y)))))
            console.log(JSON.stringify(my2dConvolutionWithFFT1.map(x => x.map(y => y.real))))
        })

        it("ナイーブ実装", () => {

            const my2dConvolutionWithFFT1 = naiveConvolution2d(input, kernel);
            console.log(JSON.stringify(my2dConvolutionWithFFT1))



            // console.log(JSON.stringify(my2dConvolutionWithFFT1.map(x => x.map(y => y.getPowSq()).map(y => Math.sqrt(y)))))
        })


    })




})
