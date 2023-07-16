import {describe, expect, it} from "vitest";
import {Complex} from "../fft/compolex";
import {fft2d} from "../fft/fft2d";
import {atcoderFFT} from "../fft/atcoder/atcoderFFT";
import {myFft2d, myIFft2d} from "../fft2d/fft2d";

describe("2次元FFTのテスト", () => {

    it("", () => {

        const l = 64;
        const t = 8;

        // console.log(Math.sin(Math.PI / 2))

        const input = new Array<Array<number>>()
        for (let i = 0; i < l; i++) {

            const arr = new Array<number>();

            for (let j = 0; j < l; j++) {
                arr.push(1 + Math.sin((2 * Math.PI / t) * j))
            }

            input.push(arr)
        }

        const myFft2d2 = myFft2d(l, input.map(x=>x.map(y=>new Complex(y,0))));
        console.log(JSON.stringify(myFft2d2.map(x=>x.map(y=>y.getPowSq()).map(y=>Math.sqrt(y)))))


        const myIFft2d2 = myIFft2d(l, myFft2d2);
        console.log(JSON.stringify(myIFft2d2.map(x=>x.map(y=>y.getPowSq()).map(y=>Math.sqrt(y)))))
    })

    it("test", () => {

        const data = [
            [1, 2, 1, 2],
            [1, 2, 1, 2],
            [1, 2, 1, 2],
            [1, 2, 1, 2]
        ]
            .map(x => x.map(y => new Complex(y, 0)))


        const myFft2d1 = myFft2d(4, data);
        console.log(myFft2d1)

        const myIFft2d1 = myIFft2d(4, myFft2d1);
        console.log(myIFft2d1)
    })


})
