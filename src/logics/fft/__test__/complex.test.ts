import {describe, expect, it} from "vitest";
import {Complex} from "../compolex";

describe("complex test", () => {

    it("multiply 90° 1回", () => {
        const complexA = new Complex(1, 0);
        const complexB = new Complex(0, -1);

        const complex1 = complexA.multiply(complexB);
        console.log(complex1)
        expect(complex1.real).toBe(0)
        expect(complex1.imag).toBe(-1)
    })

    it("multiply 90° 2回", () => {
        const complexA = new Complex(1, 0);
        const complexB = new Complex(0, -1);

        const complex1 = complexA.multiply(complexB).multiply(complexB);
        console.log(complex1)
        expect(complex1.real).toBe(-1)
        expect(complex1.imag).toBe(-0)
    })

    it("multiply", () => {
        const complexA = new Complex(1, 0);

        const deg = Math.PI / 4;
        const mult = new Complex(Math.sin(deg), Math.cos(deg))

        const complex = complexA.multiply(mult);
        console.log(complex)

        const complex2 = complex.multiply(mult);
        console.log(complex2)
    })

})
