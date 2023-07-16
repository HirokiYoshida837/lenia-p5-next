import {Complex} from "@/logics/fft/compolex";
import {atcoderFFT} from "@/logics/fft/atcoder/atcoderFFT";

export const myFft2d = (size: number, data: Complex[][]):Complex[][] => {

    // 行方向のFFTをする
    const rowFFT = data.map(x => atcoderFFT(size, x, false));

    // 列方向のFFTをする(FFTしやすいように転置して、そのあとに戻す)
    const ret = transposeMatrix(transposeMatrix(rowFFT).map(x => atcoderFFT(size, x, false)));

    return ret;
}

export const myIFft2d = (size: number, data: Complex[][]):Complex[][] => {

    // 列方向の逆FFTをする。(操作しやすいように、転置して逆変換して転置する）
    const irIn = transposeMatrix(transposeMatrix(data).map(x => atcoderFFT(size, x, true)))

    // 行方向の逆FFTをする
    const rowIFFT = irIn.map(x => atcoderFFT(size, x, true));

    return rowIFFT
}


/**
 * 正方行列を転置する
 * @param input
 */
function transposeMatrix<T>(input: Array<Array<T>>): Array<Array<T>> {

    const n = input.length;

    const ret: Array<Array<T>> = new Array(n).fill([]).map(() => new Array(n).fill(null))

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            ret[j][i] = input[i][j]
        }
    }

    return ret;
}
