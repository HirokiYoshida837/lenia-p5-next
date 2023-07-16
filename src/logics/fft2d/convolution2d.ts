/**
 * 二次元のFFTを利用した二次元の畳み込み処理を実装する。
 */
import {Complex} from "@/logics/fft/compolex";
import {myFft2d, myIFft2d} from "@/logics/fft2d/fft2d";


export const my2dConvolutionWithFFT = (input: Complex[][], kernel: Complex[][], inputSize: number, kernelSize: number):Complex[][] => {

    // 畳み込みするので、inputを拡張
    const m = inputSize + kernelSize - 1
    let sz = 1
    while (m > sz) sz <<= 1

    // 0埋めで拡張
    const inputPadding0: Complex[][] = new Array(sz).fill([]).map(() => new Array(sz).fill(new Complex(0, 0)))
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            inputPadding0[i][j] = input[i][j];
        }
    }

    const kernelPadding0: Complex[][] = new Array(sz).fill([]).map(() => new Array(sz).fill(new Complex(0, 0)))
    for (let i = 0; i < kernel.length; i++) {
        for (let j = 0; j < kernel[i].length; j++) {
            kernelPadding0[i][j] = kernel[i][j];
        }
    }

    // input, kernelそれぞれ別個でFFT。
    const inputFFT = myFft2d(sz, inputPadding0);
    const kernelFFT = myFft2d(sz, kernelPadding0);

    // 両方のアダマール積を取る
    const invFFTInput: Complex[][] = new Array(sz).fill([]).map(() => new Array(sz).fill(new Complex(0, 0)))
    for (let i = 0; i < sz; i++) {
        for (let j = 0; j < sz; j++) {
            invFFTInput[i][j] = inputFFT[i][j].multiply(kernelFFT[i][j])
        }
    }

    // 逆FFTする
    const invFFTresult = myIFft2d(sz, invFFTInput);

    return invFFTresult
}
