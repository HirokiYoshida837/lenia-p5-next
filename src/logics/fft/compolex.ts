export class Complex {
    constructor(public real: number, public imag: number) {
    }


    multiply(complex: Complex) {

        const r = this.real * complex.real - this.imag * complex.imag;
        const i = this.real * complex.imag + this.imag * complex.real;

        return new Complex(r, i);

    }

    getPowSq() {
        return this.real * this.real + this.imag * this.imag;
    }
}
