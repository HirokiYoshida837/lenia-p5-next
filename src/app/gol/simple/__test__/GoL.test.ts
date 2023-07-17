import {describe,it, expect} from "vitest";
import {gliderGun11x38, kernelDefault3x3} from "../constants";
import {convolution} from "../../core/convolution";
import {my2dConvolutionWithFFT} from "../../../../logics/fft2d/convolution2d";
import {Complex} from "../../../../logics/fft/compolex";
import {golConvFuncFFT, golConvFuncNaive} from "../golconvolution";


// テスト条件
const gliderGun = gliderGun11x38;
const initialField: (0 | 1)[][] = new Array(64)
    .fill([])
    .map(() => new Array(64).fill(0));
for (let i = 0; i < gliderGun.length; i++) {
    for (let j = 0; j < gliderGun[i].length; j++) {

        initialField[10 + i][10 + j] = gliderGun[i][j];

    }
}
const kernel = kernelDefault3x3

describe("GoLのConvolutionテスト", () => {

    it('assertionTest', () => {

        const golConvFuncNaive1 = golConvFuncNaive(initialField, kernel);
        const golConvFuncFFT1 = golConvFuncFFT(initialField, kernel);


        expect(JSON.stringify(golConvFuncNaive1)).toBe(JSON.stringify(golConvFuncFFT1))


    })


    it('ナイーブ実装_wrap', () => {

        // console.log(JSON.stringify(initialField))

        const convolution1 = convolution(initialField, kernel);
        console.log(JSON.stringify(convolution1))

    })

    it('FFT2D', () => {

        const stateComplex = initialField.map(x => x.map(y => new Complex(y, 0)));
        const kernelComplex = kernel.map(x => x.map(y => new Complex(y, 0)));

        const convolved = my2dConvolutionWithFFT(stateComplex, kernelComplex, stateComplex.length, kernelComplex.length)
            .map(x => x.map(y => y.real).map(y => Math.round(y)))

        // console.log(JSON.stringify(convolved))


        // はみ出した範囲を削除
        const fixed = convolved.splice(0, initialField.length)
            .map(x => x.splice(0, initialField.length))
        console.log(JSON.stringify(fixed))


        // 0行目をお尻にinsert
        fixed.splice(fixed.length, 0, fixed[0]);
        fixed.splice(0, 1)
        console.log(JSON.stringify(fixed))

        const fixed2 = fixed.map(x => {
            x.push(x[0])
            return x
        }).map(x => {
            // 先頭を削除
            x.splice(0, 1)
            return x;
        });

        console.log(JSON.stringify(fixed2))


        // // 普通にconvolutionした場合と一致するか確認
        // const convolution1 = convolution(initialField, kernel);
        // console.log(JSON.stringify(convolution1))
        //
        //
        // expect(JSON.stringify(fixed2)).toBe(JSON.stringify(convolution1))



    })


})
