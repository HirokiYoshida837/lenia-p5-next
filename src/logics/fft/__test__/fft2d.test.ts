import {describe, expect, it} from "vitest";
import {convolutionWithDFT, convolutionWithFFT, naiveConvolution} from "../fft";
import {atcoderConvolution} from "../atcoder/atcoderFFT";
import {convolve2d, naiveConvolution2d} from "../fft2d";

describe("convolution 2D test", () => {

    const input = [
        [1, 1, 1, 1],
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [1, 1, 1, 1],
    ];
    const kernel = [
        [0, 1, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
    ];

    it("畳み込みの挙動確認 ナイーブ実装", () => {

        const numbers = naiveConvolution2d(input, kernel);
        // expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])
        console.log(numbers)

    })

    it("畳み込みの挙動確認 FFT使うパターン", () => {

        const numbers = convolve2d(input, kernel);
        // expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])
        console.log(numbers)


        const map = numbers.map(x => x.map(y => y.getPowSq()).map(x => Math.sqrt(x)));
        // const map = numbers.map(x=>x.map(y=>y.real));
        console.log(map)


    })

    // it("畳み込みの挙動確認 ナイーブ実装2", () => {
    //
    //
    //     const numbers1 = naiveConvolution(input[3], kernel[1]);
    //     const numbers2 = naiveConvolution(input[3], kernel[2]);
    //     const numbers3 = naiveConvolution(input[3], kernel[3]);
    //
    //     // [0,0,0,1] との横方向のconvolution
    //     const x = [0, 0, 0, 1];
    //     for (let i = 0; i < 4; i++) {
    //         const numbers0 = naiveConvolution(x, kernel[i]);
    //         console.log(numbers0)
    //     }
    //
    //     const xResult =
    //     [
    //         [0, 0, 0, 5, 4, 3, 2, 0],
    //         [0, 0, 0, 2, 0, 0, 0, 0],
    //         [0, 0, 0, 1, 0, 0, 0, 0],
    //         [0, 0, 0, 0, 0, 0, 0, 0],
    //     ];
    //
    //     // [0,0,1,0] との縦方向のconvolution
    //     const y = [0, 0, 0, 1];
    //     for (let i = 0; i < 4; i++) {
    //
    //         const k = new Array<number>();
    //         for (let j = 0; j < 4; j++) {
    //             k.push(kernel[j][i]);
    //         }
    //         console.log(`k`, k)
    //
    //         const numbers0 = naiveConvolution(xResult[i], k);
    //         console.log(numbers0)
    //     }
    //
    //     //
    //     // console.log(numbers0)
    //     // console.log(numbers1)
    //     // console.log(numbers2)
    //     // console.log(numbers3)
    //
    // })
    //
    //
    // // it("畳み込みの挙動確認 DFT利用", () => {
    // //     const numbers = convolutionWithDFT(a, b);
    // //     // expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])
    // //     console.log(numbers.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    // // })
    // //
    // // it("畳み込みの挙動確認 FFT利用", () => {
    // //     const numbers = convolutionWithFFT(a, b);
    // //     // expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])
    // //     console.log(numbers.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    // // })
    // //
    // //
    // // it("FFTの挙動確認 AtCoderFFT利用", () => {
    // //     const numbers = atcoderConvolution(a, b);
    // //     console.log(numbers.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    // // })
})
