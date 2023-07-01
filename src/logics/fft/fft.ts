import {Complex} from "@/logics/fft/compolex";

export const loading = (samples: Float32Array) => {

    for (let i = 0; i < samples.length; i++) {
        const sample = samples[i];
        console.log(sample)
    }
}

export const calc = () => {
    const complex = new Complex(1, 2);
    console.log(complex)
}

export const dft = (x: number[]): Complex[] => {

    const N = x.length;

    const retArray = new Array<Complex>();

    for (let k = 0; k < N; k++) {

        const calcX = (k: number) => {

            const ret = new Array<Complex>();


            for (let p = 0; p < N - 1; p++) {
                const xVal = x[p];
                const complex = new Complex(
                    Math.cos(2 * Math.PI * p * k / N),
                    -1 * Math.sin(2 * Math.PI * p * k / N)
                )

                const v = new Complex(
                    complex.real * xVal,
                    complex.imag * xVal
                )

                ret.push(v)
            }

            const complex1 = ret.reduce((l, r) => new Complex(l.real + r.real, l.imag + r.imag));
            return complex1;
        }

        const complex2 = calcX(k);
        retArray.push(complex2);
    }

    return retArray;
}


/**
 * 一次元のFFT(高速-離散フーリエ変換)を行います
 * @param input
 */
export const fft = (input: number[]): Complex[] => {

    const N = input.length;

    // 入力の要素数が2以下の場合、そのまま返す
    if (N <= 1) {
        return input.map((value) => new Complex(value, 0));
    }

    // 入力を偶数と奇数の要素に分割
    const even: number[] = [];
    const odd: number[] = [];
    for (let i = 0; i < N; i++) {
        if (i % 2 === 0) {
            even.push(input[i]);
        } else {
            odd.push(input[i]);
        }
    }

    // 再帰的にFFTを適用
    const evenResult = fft(even);
    const oddResult = fft(odd);

    // FFT結果の計算
    const result: Complex[] = [];
    for (let k = 0; k < N / 2; k++) {
        const kth = -((2 * Math.PI * k) / N);
        const t = new Complex(Math.cos(kth), Math.sin(kth));
        const temp = t.multiply(oddResult[k]);
        const term = new Complex(
            evenResult[k].real + temp.real,
            evenResult[k].imag + temp.imag
        );
        result.push(term);
        const conjugateTerm = new Complex(
            evenResult[k].real - temp.real,
            evenResult[k].imag - temp.imag
        );
        result.push(conjugateTerm);
    }

    return result;
}








