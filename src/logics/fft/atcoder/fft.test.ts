import {describe, expect, it} from "vitest";
import {convolution} from "./atcoderFFT";



describe("FFT test", () => {


    it("乗算のテスト FFT利用", () => {

        const a = [1, 2, 3, 4];
        const b = [1, 2, 4, 8];

        // FFT使って乗算する場合

        // [1, 4, 11, 26, 36, 40, 32]

        const complexes2 = convolution(a,b);
        console.log(complexes2)

        // console.log(complexes2.map(x=>x.getPowSq()).map(x=>Math.sqrt(x)))
        //
        //
        // expect(complexes2.map(x=>x.getPowSq()).map(x=>Math.sqrt(x)).map(x=>Math.round(x))).toEqual([1, 4, 11, 26, 36, 40, 32])
    })


})
