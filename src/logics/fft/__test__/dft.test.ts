import {describe, expect, it} from "vitest";
import {myDftNaive, fft, inverseFFT, convolution2, convolution, inverseDft, dftNaive} from "../fft";
import {samples} from "../constants";
import {Complex} from "../compolex";
import {atcoderFFT} from "../atcoder/atcoderFFT";


describe("FFT test", () => {

    const a = [1, 2, 3, 4];

    it("乗算のテスト DFT利用", () => {

        const complexes = myDftNaive(a.map(x => new Complex(x, 0)), a.length);
        console.log(complexes)

        const inversedComplexes = inverseDft(complexes, a.length);
        console.log(inversedComplexes)

        console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("乗算のテスト DFT_Naive利用", () => {

        const complexes = dftNaive(a.map(x => new Complex(x, 0)), a.length);
        console.log(complexes)

        // const inversedComplexes = inverseDft(complexes, a.length);
        // console.log(inversedComplexes)
        //
        // console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("乗算のテスト AtCoderFFT利用", () => {

        const complexes = atcoderFFT(a.length, a.map(x => new Complex(x, 0)), false);
        console.log(complexes)

        // const inversedComplexes = atcoderFFT(a.length, complexes, true);
        // console.log(inversedComplexes)


        // console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))

    })


})
