import {convolution} from "@/app/gol/core/convolution";
import {Complex} from "@/logics/fft/compolex";
import {my2dConvolutionWithFFT} from "@/logics/fft2d/convolution2d";

export const golConvFuncNaive = (state: number[][], kernel: number[][]): number[][] => {
    const convolved = convolution(state, kernel);

    return convolved;
}


export const golConvFuncFFT = (state: number[][], kernel: number[][]): number[][] => {

    const stateComplex = state.map(x => x.map(y => new Complex(y, 0)));
    const kernelComplex = kernel.map(x => x.map(y => new Complex(y, 0)));

    // FIXME : カーネル側のFFT結果は毎回同じなので事前に計算しておくべき。
    const convolved = my2dConvolutionWithFFT(stateComplex, kernelComplex, stateComplex.length, kernelComplex.length)
        .map(x => x.map(y => y.real).map(y => Math.round(y)))

    // console.log(JSON.stringify(convolved))

    // FIXME : convolutionした結果が、カーネルの中心マス分までの差分でズレるので無理やり手動でshiftする
    // カーネルの形をうまく変形させればいけるのでは？

    // はみ出した範囲を削除
    const fixed = convolved.splice(0, state.length)
        .map(x => x.splice(0, state.length))


    // 0行目をお尻にinsert
    fixed.splice(fixed.length, 0, fixed[0]);
    fixed.splice(0, 1)

    const fixed2 = fixed.map(x => {
        x.push(x[0])
        return x
    }).map(x => {
        // 先頭を削除
        x.splice(0, 1)
        return x;
    });

    return fixed2;
}
