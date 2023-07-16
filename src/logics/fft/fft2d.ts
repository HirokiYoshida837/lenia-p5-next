// function FFT2D(input: ComplexArray, nx: number, ny: number, inverse: boolean = false): ComplexArray {
//   const transform = inverse ? 'InvFFT' : 'FFT';
//   const output = new ComplexArray(input.length, input.ArrayType);
//   const row = new ComplexArray(nx, input.ArrayType);
//   const col = new ComplexArray(ny, input.ArrayType);
//
//   for(let j = 0; j < ny; j++) {
//     row.map((v, i) => {
//       v.real = input.real[i + j * nx];
//       v.imag = input.imag[i + j * nx];
//     });
//     row[transform]().forEach((v, i) => {
//       output.real[i + j * nx] = v.real;
//       output.imag[i + j * nx] = v.imag;
//     });
//   }
//
//   for(let i = 0; i < nx; i++) {
//     col.map((v, j) => {
//       v.real = output.real[i + j * nx];
//       v.imag = output.imag[i + j * nx];
//     });
//     col[transform]().forEach((v, j) => {
//       output.real[i + j * nx] = v.real;
//       output.imag[i + j * nx] = v.imag;
//     });
//   }
//
//   return output;
// }

import {Complex} from "@/logics/fft/compolex";
import {convolutionWithFFT, fft, inverseDft, inverseFFT, myDftNaive, naiveConvolution} from "@/logics/fft/fft";
import {atcoderFFT} from "@/logics/fft/atcoder/atcoderFFT";

// /**
//  * NxNの二次元FFT
//  * @param input
//  * @param n
//  * @constructor
//  */
// function FFT2d(input: Complex[][], n:number): Complex[][]{
//     const ret = new Array<Array<Complex>>(n).fill(new Array<Complex>(n)).map(x=>new Array<Complex>(n).fill(new Complex(0,0)).map(y=>new Complex(0,0)));
//
//     return ret;
//
// }

/**
 * 愚直に2Dのconvolutionをする
 * @param input
 * @param kernel
 */
export const naiveConvolution2d = (input: number[][], kernel: number[][]): number[][] => {

    const inputHeight = input.length;
    const inputWidth = input[0].length;

    const kernelHeight = kernel.length;
    const kernelWidth = kernel[0].length;

    // はみ出すからデカくしておく
    const outputHeight = inputHeight * 2;
    const outputWidth = inputWidth * 2;


    const output: number[][] = new Array(outputHeight)
        .fill([])
        .map(() => new Array(outputWidth).fill(0));


    // inputすべてのマスについて処理
    for (let i = 0; i < inputHeight; i++) {
        for (let j = 0; j < inputWidth; j++) {

            let sum = 0;

            // カーネルのそれぞれのマス目
            for (let k = 0; k < kernelHeight; k++) {
                for (let l = 0; l < kernelWidth; l++) {

                    const yIndex = i + k;
                    const xIndex = j + l;

                    if (yIndex >= inputHeight) {
                        continue;
                    }

                    if (xIndex >= inputWidth) {
                        continue;
                    }


                    sum += (input[yIndex][xIndex] * kernel[k][l]);
                }
            }

            output[i][j] = sum;
        }
    }

    return output;
}

// export function convolution2DChatGP(matrix1: number[][], matrix2: number[][]) {
//     // どちらも正方形だと仮定
//
//     // 行ごとにFFT
//     const m1RowFFT = new Array<Complex[]>();
//     for (let i = 0; i < matrix1.length; i++) {
//         const x = matrix1[i].map(x => new Complex(x, 0));
//         const complexes = myDftNaive(x, x.length);
//         m1RowFFT.push(complexes)
//     }
//
//     const m2RowFFT = new Array<Complex[]>();
//     for (let i = 0; i < matrix2.length; i++) {
//         const x = matrix2[i].map(x => new Complex(x, 0));
//         const complexes = myDftNaive(x, x.length);
//         m2RowFFT.push(complexes)
//     }
//
//     // 列ごとにFFT
//     const m1ColFFT = new Array<Complex[]>();
//     for (let i = 0; i < matrix1.length; i++) {
//
//         const x = matrix1.map(x=>x[i]).map(x => new Complex(x, 0));
//         const complexes = myDftNaive(x, x.length);
//         m1ColFFT.push(complexes)
//     }
//
//     const m2ColFFT = new Array<Complex[]>();
//     for (let i = 0; i < matrix2.length; i++) {
//         const x = matrix2.map(x=>x[i]).map(x => new Complex(x, 0));
//         const complexes = myDftNaive(x, x.length);
//         m2ColFFT.push(complexes)
//     }
//
//     // 要素ごとに積を取る
//     for (let i = 0; i < ; i++) {
//
//     }
//
//
//
//     return result;
// }

export const convolve2d = (input: number[][], kernel: number[][]) => {

    // input側も2倍にして0fillしておく
    const customInput = new Array<Array<number>>();
    const customKernel = new Array<Array<number>>();

    // for (let i = 0; i < input.length; i++) {
    //     const numberA = input[i].map(x => x);
    //     customInput.push(numberA.concat([0, 0, 0, 0, 0, 0, 0, 0]))
    // }
    // for (let i = 0; i < input.length; i++) {
    //     customInput.push([0, 0, 0, 0, 0, 0, 0, 0])
    // }
    //
    // for (let i = 0; i < input.length; i++) {
    //     const numberA = kernel[i].map(x => x);
    //     const numberB = kernel[i].map(x => x);
    //     customKernel.push(numberA.concat(numberB))
    // }
    // for (let i = 0; i < input.length; i++) {
    //     customKernel.push([0, 0, 0, 0, 0, 0, 0, 0])
    // }


    const inputFFT = fft2d(input);
    const kernelFFT = fft2d(kernel);

    console.log(`inputFFT`, inputFFT)
    console.log(`kernelFFT`, kernelFFT)

    // kernelFFTの共役複素数をとる
    // const kernelFFTConjugate = kernelFFT.map(x => x.map(y => new Complex(y.real, -1 * y.imag)))


    // 要素ごとの積(アダマール積)を取る
    const multComplex = new Array<Array<Complex>>();
    for (let i = 0; i < inputFFT.length; i++) {

        const cps = new Array<Complex>();

        for (let j = 0; j < inputFFT.length; j++) {
            const complex = inputFFT[i][j].multiply(kernelFFT[i][j]);
            cps.push(complex);
        }
        multComplex.push(cps);
    }

    const fft2dI1 = fft2dI(multComplex);
    return fft2dI1;

    // // 横方向にConvolutionする
    // const convolvedR = new Array<Array<Complex>>();
    // for (let i = 0; i <inputFFT.length; i++) {
    //     const a = inputFFT[i];
    //     const k = kernelFFT[i];
    //
    //     const complexes = convolutionWithFFT(a,k);
    //     convolvedR.push(complexes);
    // }
    // console.log(`convolvedR`,convolvedR)
    //
    // // 縦方向にConvolutionする
    // const convolvedC = new Array<Array<Complex>>();
    // for (let i = 0; i < convolvedR[0].length; i++) {
    //     const a = convolvedR.map(x=>x[i]);
    //     const k = kernelFFT.map(x=>x[i % kernelFFT.length]);
    //
    //     console.log(a,k)
    //     const complexes1 = convolutionWithFFT(a,k);
    //     convolvedC.push(complexes1)
    // }
    // console.log(`${convolvedC[0].length}, ${convolvedC.length}`)
    // console.log(`convolvedC`,convolvedC)
    //
    // const convolved = fft2dI(convolvedC);

    // return convolved;
}

export const fft2d = (input: number[][]) => {

    // 縦方向でFFTする
    // const complexC = new Array(input.length)
    //     .fill([])
    //     .map(()=>new Array(input.length).fill(new Complex(0,0)).map(x=>new Complex(0,0)))
    const complexC = new Array<Complex[]>();
    for (let i = 0; i < input.length; i++) {
        const complexes = input.map(x => x[i]).map(x => new Complex(x, 0));

        const cFFT = atcoderFFT(complexes.length, complexes, false);
        complexC.push(cFFT)
        //
        // for (let j = 0; j < cFFT.length; j++) {
        //     complexC[i][j] = cFFT[j];
        // }

        //     const output: number[][] = new Array(outputHeight)
        //         .fill([])
        //         .map(() => new Array(outputWidth).fill(0));
    }

    // FFTした結果を横方向でFFTする
    const complexR = new Array<Complex[]>();
    for (let i = 0; i < complexC.length; i++) {
        const complexes = complexC[i];
        complexR.push(atcoderFFT(complexes.length, complexes, false))
    }


    return complexR;
}

export const fft2dI = (input: Complex[][]) => {

    // 横方向でフーリエ逆変換する
    const complexIR = new Array<Complex[]>();
    for (let i = 0; i < input.length; i++) {
        complexIR.push(atcoderFFT(input[i].length, input[i], true))
    }

    // 縦方向でフーリエ逆変換する
    const complexIC = new Array(input.length)
        .fill([])
        .map(()=>new Array(input.length).fill(new Complex(0,0)).map(x=>new Complex(0,0)))

    // const complexIC = new Array<Complex[]>();
    for (let i = 0; i < complexIR.length; i++) {
        const complexes = complexIR.map(x => x[i]);
        const iCFFT = atcoderFFT(complexes.length, complexes, true);

        for (let j = 0; j < iCFFT.length; j++) {
            complexIC[i][j] = iCFFT[j];
        }


        // complexIC.push()
    }

    return complexIC;
}

