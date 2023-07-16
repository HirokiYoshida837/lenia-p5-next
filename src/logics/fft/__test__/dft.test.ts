import {describe, expect, it} from "vitest";
import {
    myDftNaive,
    fft,
    naiveConvolution,
    inverseDft,
    convolutionWithDFT,
    convolutionWithFFT, inverseFFT, convolutionWithFFTCyclic, convolutionWithDFTCyclic, naiveConvolutionCyclic
} from "../fft";
import {samples} from "../constants";
import {Complex} from "../compolex";
import {atcoderConvolution, atcoderFFT} from "../atcoder/atcoderFFT";


describe("FFT test", () => {

    const a = [1, 2, 3, 4, 5, 6, 7, 8];

    it("FFTの挙動確認 DFT利用", () => {

        const complexes = myDftNaive(a.map(x => new Complex(x, x)), a.length);
        console.log(complexes)

        // const inversedComplexes = inverseDft(complexes, a.length);
        // console.log(inversedComplexes)
        //
        // console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("FFTの挙動確認 FFT利用", () => {

        const complexes = fft(a.map(x => new Complex(x, x)), a.length);
        console.log(complexes)

        // const inversedComplexes = inverseFFT(complexes, a.length);
        // console.log(inversedComplexes)
        //
        // console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("FFTの挙動確認 AtCoderFFT利用", () => {

        const complexes = atcoderFFT(a.length, a.map(x => new Complex(x, x)), false);
        console.log(complexes)

        // const inversedComplexes = atcoderFFT(a.length, complexes, true);
        // console.log(inversedComplexes)
        //
        //
        // console.log(inversedComplexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })
})

describe("フーリエ逆変換のテスト test", () => {

    // const a = [1, 2, 3, 4];
    const a = [1, 2, 3, 4, 5, 6, 7, 8];

    it("逆FFTの挙動確認 DFT利用", () => {

        const complexes = inverseDft(a.map(x => new Complex(x, 0)), a.length);
        console.log(complexes)
        console.log(complexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("逆FFTの挙動確認 FFT利用", () => {

        const complexes = inverseFFT(a.map(x => new Complex(x, 0)), a.length);
        console.log(complexes)

        console.log(complexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))

    })

    it("逆FFTの挙動確認 AtCoderFFT利用", () => {

        const complexes = atcoderFFT(a.length, a.map(x => new Complex(x, 0)), true);
        console.log(complexes)
        console.log(complexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))

    })
})

describe("フーリエ逆変換のテスト 虚数部1", () => {

    const a = [1, 2, 3, 4, 5, 6, 7, 8];

    it("逆FFTの挙動確認 DFT利用", () => {

        const complexes = inverseDft(a.map(x => new Complex(x, x)), a.length);
        console.log(complexes)
        console.log(complexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("逆FFTの挙動確認 FFT利用", () => {

        const complexes = inverseFFT(a.map(x => new Complex(x, x)), a.length);
        console.log(complexes)

        console.log(complexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))

    })

    it("逆FFTの挙動確認 AtCoderFFT利用", () => {

        const complexes = atcoderFFT(a.length, a.map(x => new Complex(x, x)), true);
        console.log(complexes)
        console.log(complexes.map(x => x.getPowSq()).map(x => Math.sqrt(x)))

    })
})


describe("convolution test", () => {

    const a = [1, 2, 3, 4];
    const b = [1, 2, 4, 8];

    it("畳み込みの挙動確認 ナイーブ実装", () => {

        const numbers = naiveConvolution(a, b);
        // expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])
        console.log(numbers)

    })

    it("畳み込みの挙動確認 DFT利用", () => {
        const numbers = convolutionWithDFT(a, b);
        // expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])
        console.log(numbers.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("畳み込みの挙動確認 FFT利用", () => {
        const numbers = convolutionWithFFT(a, b);
        // expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])
        console.log(numbers.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })


    it("FFTの挙動確認 AtCoderFFT利用", () => {
        const numbers = atcoderConvolution(a, b);
        console.log(numbers.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })
})


describe("convolution test - 循環たたみこみ", () => {

    const a = [0, 0, 0, 0, 0, 2, 0, 1];
    const b = [5, 4, 3, 2, 1];

    it("畳み込みの挙動確認 ナイーブ実装", () => {

        // 直線
        const numbers1 = naiveConvolution(a, b);
        // [ 0, 0, 0, 0, 0, 10, 8, 11, 8, 5, 2, 1, 0 ]
        console.log(numbers1)

        // 循環
        const numbers2 = naiveConvolutionCyclic(a, b);
        // [ 8, 5, 2, 1, 0, 10, 8, 11 ]
        console.log(numbers2)

    })

    it("畳み込みの挙動確認 DFT利用", () => {
        const numbers1 = convolutionWithDFT(a, b);
        console.log(numbers1.map(x => x.getPowSq()).map(x => Math.sqrt(x)))

        const numbers2 = convolutionWithDFTCyclic(a,b);
        console.log(numbers2.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })

    it("畳み込みの挙動確認 FFT利用", () => {
        const numbers1 = convolutionWithFFT(a, b);
        console.log(numbers1.map(x => x.getPowSq()).map(x => Math.sqrt(x)))

        const numbers2 = convolutionWithFFTCyclic(a,b);
        console.log(numbers2.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    })


    // it("FFTの挙動確認 AtCoderFFT利用", () => {
    //     const numbers = atcoderConvolution(a, b);
    //     console.log(numbers.map(x => x.getPowSq()).map(x => Math.sqrt(x)))
    // })
})
