import {Complex} from "@/logics/fft/compolex";


// ナイーブなDFT実装
export const myDftNaive = (x: Complex[], N: number): Complex[] => {

    if (N == 1) {
        return x;
    }

    const retArray = new Array<Complex>();

    for (let k = 0; k < N; k++) {

        const calcX = (k: number) => {

            const ret = new Array<Complex>();


            for (let p = 0; p < N; p++) {
                const xVal = x[p];
                const complex = new Complex(Math.cos(2 * Math.PI * p * k / N), -1 * Math.sin(2 * Math.PI * p * k / N))

                const v = complex.multiply(xVal)

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

export const inverseDft = (x: Complex[], N: number): Complex[] => {

    // const N = x.length;

    const retArray = new Array<Complex>();

    for (let k = 0; k < N; k++) {

        const calcX = (k: number) => {

            const ret = new Array<Complex>();


            for (let p = 0; p < N; p++) {
                const xVal = x[p];
                const complex = new Complex(Math.cos(2 * Math.PI * p * k / N), Math.sin(2 * Math.PI * p * k / N))

                const v = complex.multiply(xVal)

                ret.push(v)
            }

            const complex1 = ret.reduce((l, r) => new Complex(l.real + r.real, l.imag + r.imag));
            return complex1;
        }

        const complex2 = calcX(k);
        retArray.push(complex2);
    }

    if (N == 1) {
        return retArray;
    } else {

        for (let i = 0; i < N; i++) {
            retArray[i] = new Complex(retArray[i].real / N, retArray[i].imag / N)
        }

        return retArray;
    }
}


/**
 * 一次元のFFT(高速-離散フーリエ変換)を行います
 * @param input
 * @param n
 */
export const fft = (input: Complex[], n: number): Complex[] => {

    // 入力の要素数が2以下の場合、そのまま返す
    if (n <= 1) {
        return input;
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

export const inverseFFT = (input: Complex[], n: number): Complex[] => {


    // 入力の要素数が2以下の場合、そのまま返す
    if (n <= 1) {
        return input;
    }

    const even = input.filter((x, i) => i % 2 == 0);
    const odd = input.filter((x, i) => i % 2 == 1);

    // 奇数成分、偶数成分それぞれ逆FFT
    const f0 = inverseFFTRecursive(even, n / 2)
    const f1 = inverseFFTRecursive(odd, n / 2)

    // これを逆にするかどうかで変換、逆変換が変わる
    const zeta = new Complex(Math.cos(2 * Math.PI / n), Math.sin(2 * Math.PI / n))
    let powZeta = new Complex(1, 0);

    const result = new Array<Complex>();

    for (let i = 0; i < n; i++) {

        const v1 = f0[i % (n / 2)];
        const v2 = f1[i % (n / 2)].multiply(powZeta)

        result.push(v1.add(v2))

        powZeta = powZeta.multiply(zeta);
    }

    return result.map(x => new Complex(x.real / n, x.imag / n));
}

const inverseFFTRecursive = (input: Complex[], n: number): Complex[] => {


    // 入力の要素数が2以下の場合、そのまま返す
    if (n <= 1) {
        return input;
    }

    const even = input.filter((x, i) => i % 2 == 0);
    const odd = input.filter((x, i) => i % 2 == 1);

    // 奇数成分、偶数成分それぞれ逆FFT
    const f0 = inverseFFTRecursive(even, n / 2)
    const f1 = inverseFFTRecursive(odd, n / 2)

    // これを逆にするかどうかで変換、逆変換が変わる
    const zeta = new Complex(Math.cos(2 * Math.PI / n), Math.sin(2 * Math.PI / n))
    let powZeta = new Complex(1, 0);

    const result = new Array<Complex>();

    for (let i = 0; i < n; i++) {

        const v1 = f0[i % (n / 2)];
        const v2 = f1[i % (n / 2)].multiply(powZeta)

        result.push(v1.add(v2))

        powZeta = powZeta.multiply(zeta);
    }

    return result
}


/**
 * フーリエ変換(DFT)を利用した乗算
 * @param g
 * @param h
 */
export const convolutionWithDFT = (g: number[], h: number[]) => {

    const m = g.length + h.length;
    let fftLen = 1;
    while (m > fftLen) {
        fftLen <<= 1;
    }

    const tmpA = new Array<Complex>(fftLen)
        .fill(new Complex(0, 0))
        .map((x, i) => new Complex(0, 0))

    const tmpB = new Array<Complex>(fftLen)
        .fill(new Complex(0, 0))
        .map((x, i) => new Complex(0, 0))

    const A = g.map(x => new Complex(x, 0)).concat(tmpA).slice(0, fftLen);
    const B = h.map(x => new Complex(x, 0)).concat(tmpB).slice(0, fftLen);

    const gg = myDftNaive(A, fftLen)
    const hh = myDftNaive(B, fftLen)

    const array = new Array<Complex>();
    for (let i = 0; i < fftLen; i++) {
        const comp = gg[i].multiply(hh[i]);
        array.push(comp)
    }

    console.log(array)


    // 逆フーリエ変換してreturnする。
    const inverseFFTResult = inverseDft(array, fftLen);

    return inverseFFTResult;
}

/**
 * フーリエ変換(FFT)を利用した乗算
 * @param g
 * @param h
 */
export const convolutionWithFFT = (g: number[], h: number[]) => {

    const m = g.length + h.length;
    let fftLen = 1;
    while (m > fftLen) {
        fftLen <<= 1;
    }

    const tmpA = new Array<Complex>(fftLen)
        .fill(new Complex(0, 0))
        .map((x, i) => new Complex(0, 0))

    const tmpB = new Array<Complex>(fftLen)
        .fill(new Complex(0, 0))
        .map((x, i) => new Complex(0, 0))

    const A = g.map(x => new Complex(x, 0)).concat(tmpA).slice(0, fftLen);
    const B = h.map(x => new Complex(x, 0)).concat(tmpB).slice(0, fftLen);

    const gg = fft(A, fftLen)
    const hh = fft(B, fftLen)

    const array = new Array<Complex>();
    for (let i = 0; i < fftLen; i++) {
        const comp = gg[i].multiply(hh[i]);
        array.push(comp)
    }

    console.log(array)

    // 逆フーリエ変換してreturnする。
    const inverseFFTResult = inverseFFT(array, fftLen);

    return inverseFFTResult;
}


// 一旦愚直にやるようなのを考える
export const naiveConvolution = (g: number[], h: number[]): number[] => {

    const retMap = new Map<number, Array<number>>();

    for (let i = 0; i < g.length + h.length; i++) {
        retMap.set(i, new Array<number>())
    }


    for (let i = 0; i < g.length; i++) {

        for (let j = 0; j < h.length; j++) {
            retMap.get(i + j)?.push(g[i] * h[j])
        }

    }

    console.log(retMap)


    const retArray = new Array<number>(g.length + h.length)

    retMap.forEach((x, i) => {

        if (x.length == 0) {
            retArray[i] = 0;
        } else {
            retArray[i] = x.reduce((a, b) => a + b);
        }


    })

    return retArray
}

