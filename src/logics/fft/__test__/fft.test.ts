import {describe, expect, it} from "vitest";
import {calc, dft, fft, loading} from "../fft";
import {samples} from "../constants";

describe("fft test", () => {

    it("loading...", () => {
        loading(new Float32Array(samples));
    })

    it("floatArrayTest", () => {
        const nums: Float32Array = new Float32Array([0.1, 0.2, 0.3])
        loading(nums)
    })

    it("floatArrayTest2", () => {
        const nums: Float32Array = new Float32Array([0.125, 0.25, 0.5])
        loading(nums)
    })
})


describe("calc test", () => {

    it("loading...", () => {
        calc()
    })
})

describe("FFT test", () => {

    it("fft test", () => {
        const complexes = fft(samples);

        for (let complex of complexes) {
            const pow = complex.getPow();
            console.log(pow)
        }
    })

    it("fft simple test", () => {
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


        const complexes1 = fft(nums);

        for (let complex of complexes1) {

            const re = complex.real;
            const im = complex.imag;

            console.log(`${re}, ${im}, ${complex.getPowSq()}`)
        }


    })

    it("fft square test", () => {
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


        const complexes1 = dft(nums);

        for (let complex of complexes1) {

            const re = complex.real;
            const im = complex.imag;

            console.log(`${re}, ${im}, ${complex.getPowSq()}`)
        }
    })

})