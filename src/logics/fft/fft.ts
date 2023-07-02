import {Complex} from "@/logics/fft/compolex";


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
 * @param n
 */
export const fft = (input: number[], n: number): Complex[] => {

    // 入力の要素数が2以下の場合、そのまま返す
    if (n <= 1) {
        return input.map((value) => new Complex(value, 0));
    }

    const even = input.filter((x, i) => i % 2 == 0);
    const odd = input.filter((x, i) => i % 2 == 1);

    // 奇数成分、偶数成分それぞれFFT
    const f0 = fft(even, n / 2)
    const f1 = fft(odd, n / 2)

    const zeta = new Complex(Math.cos(2 * Math.PI / n), -1.0 * Math.sin(2 * Math.PI / n))
    let powZeta = new Complex(1, 0);

    const result = new Array<Complex>();

    for (let i = 0; i < n; i++) {

        const v1 = f0[i % (n / 2)];
        const v2 = f1[i % (n / 2)].multiply(powZeta)

        result.push(v1.add(v2))

        powZeta = powZeta.multiply(zeta);
    }

    return result;
}






