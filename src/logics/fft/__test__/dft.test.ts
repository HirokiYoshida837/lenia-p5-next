import {describe, expect, it} from "vitest";
import {dft, fft, inverseFFT, convolution2, convolution, inverseDft} from "../fft";
import {samples} from "../constants";
import {Complex} from "../compolex";
import {atcoderFFT} from "../atcoder/atcoderFFT";


describe("DFT test", () => {

    it("乗算のテスト FFT利用", () => {

        const a = [1, 2];

        const complexes = dft(a.map(x => new Complex(x, 0)), a.length);
        console.log(complexes)

        const inversedComplexes = inverseDft(complexes, a.length);
        console.log(inversedComplexes)

        console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("乗算のテスト AtCoderFFT利用", () => {

        const a = [1, 2];

        const complexes = atcoderFFT(a.length, a.map(x => new Complex(x, 0)), false);
        console.log(complexes)

        const inversedComplexes = atcoderFFT(a.length, complexes, true);
        console.log(inversedComplexes)


        console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x))
    )

    })


})
