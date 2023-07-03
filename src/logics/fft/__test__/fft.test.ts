import {describe, expect, it} from "vitest";
import {myDftNaive, fft, inverseFFT, convolution2, convolution} from "../fft";
import {samples} from "../constants";
import {Complex} from "../compolex";


describe("FFT test", () => {

    it("fft.ts test", () => {
        const complexes = fft(samples.map(x => new Complex(x, 0)), samples.length);

        for (let complex of complexes) {
            const pow = complex.getPowSq();
            console.log(pow)
        }
    })

    it("fft.ts simple test", () => {
        const N = 64;
        const T1 = 32;
        const T2 = 8;

        const t1 = 2 * Math.PI / T1;
        const t2 = 2 * Math.PI / T2;

        const nums = new Array<number>();

        for (let i = 0; i < N; i++) {

            const number1 = Math.sin(i * t1);
            const number2 = Math.sin(i * t2) / 4;

            const v = number1 + number2;
            console.log(v)
            nums.push(v)


        }


        const complexes1 = fft(nums, nums.length);

        for (let complex of complexes1) {

            const re = complex.real;
            const im = complex.imag;

            console.log(`${re}, ${im}, ${complex.getPowSq()}`)
        }


    })

    it("DFT square test", () => {
        const N = 512;
        const T1 = 32;
        const T2 = 8;

        const t1 = 2 * Math.PI / T1;
        const t2 = 2 * Math.PI / T2;

        const nums = new Array<number>();

        for (let i = 0; i < N; i++) {

            // const number1 = Math.sin(i * t1) / 4;
            // const number2 = Math.sin(i * t2) / 32;
            //
            // const v = number1 + number2;
            // console.log(v)
            // nums.push(v)


            if (i % 32 < 16) {
                nums.push(1)
            } else {
                nums.push(-1)
            }

            console.log(nums[nums.length - 1])


        }


        const complexes1 = myDftNaive(nums);

        for (let complex of complexes1) {

            const re = complex.real;
            const im = complex.imag;

            console.log(`${re}, ${im}, ${complex.getPowSq()}`)
        }
    })

    it("fft.ts square test", () => {
        const N = 512;
        const T1 = 32;
        const T2 = 8;

        const t1 = 2 * Math.PI / T1;
        const t2 = 2 * Math.PI / T2;

        const nums = new Array<Complex>();

        for (let i = 0; i < N; i++) {

            if (i % 32 < 16) {
                nums.push(new Complex(1, 0))
            } else {
                nums.push(new Complex(-1, 0))
            }

            console.log(nums[nums.length - 1])


        }


        const complexes1 = fft(nums, nums.length);

        for (let complex of complexes1) {

            const re = complex.real;
            const im = complex.imag;

            console.log(`${re}, ${im}, ${complex.getPowSq()}`)
        }
    })

    it("逆変換のテスト", () => {
        const N = 512;
        const T1 = 32;
        const T2 = 8;

        const t1 = 2 * Math.PI / T1;
        const t2 = 2 * Math.PI / T2;

        const nums = new Array<Complex>();

        for (let i = 0; i < N; i++) {

            if (i % 32 < 16) {
                nums.push(new Complex(2, 0))
            } else {
                nums.push(new Complex(-1, 0))
            }

            console.log(nums[nums.length - 1])
        }


        const complexes1 = fft(nums, nums.length);

        for (let complex of complexes1) {
            const re = complex.real;
            const im = complex.imag;
            console.log(`${re}, ${im}, ${complex.getPowSq()}`)
        }

        console.log('inverse fft.ts')

        const complexes3 = inverseFFT(complexes1, complexes1.length);

        for (let complex of complexes3) {
            const re = complex.real;
            const im = complex.imag;
            console.log(`${re}, ${im}, ${complex.getPowSq()}`)
        }

    })


    it("乗算のテスト 愚直", () => {

        const a = [1, 2, 3, 4];
        const b = [1, 2, 4, 8];

        // そのまま O(N^2) で計算する場合
        const numbers = convolution(a, b);

        expect(numbers).toEqual([1, 4, 11, 26, 36, 40, 32])


        // const complexes2 = multiply(a.map(x => new Complex(x, 0)), b.map(x => new Complex(x, 0)));
        // console.log(complexes2)
        //
        // console.log(complexes2.map(x => x.getPowSq()))
    })

    it("乗算のテスト FFT利用", () => {

        const a = [1, 2, 3, 4];
        const b = [1, 2, 4, 8];

        // FFT使って乗算する場合

        // [1, 4, 11, 26, 36, 40, 32]

        const complexes2 = convolution2(a,b);
        console.log(complexes2)

        console.log(complexes2.map(x=>x.getPowSq()).map(x=>Math.sqrt(x)))


        expect(complexes2.map(x=>x.getPowSq()).map(x=>Math.sqrt(x)).map(x=>Math.round(x))).toEqual([1, 4, 11, 26, 36, 40, 32])
    })


})
