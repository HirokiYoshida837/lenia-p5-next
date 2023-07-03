import {Complex} from "@/logics/fft/compolex";

// それぞれ、AtCoderの提出を参考に。


/**
 * [提出 #23866021 - AtCoder Typical Contest 001](https://atcoder.jp/contests/atc001/submissions/23866021)
 * [FFT (高速フーリエ変換)](https://satanic0258.github.io/snippets/math/FFT.html)
 * @param sz
 * @param a
 * @param inv
 */
export function atcoderFFT(sz: number, a: Complex[], inv = false): Complex[] {
    const tmp: Complex[] = Array(sz).fill(new Complex(0, 0))
    const mask = sz - 1
    let p = 0
    // 再帰じゃないFFT
    for (let i = sz >> 1; i >= 1; i >>= 1) {
        const cur = p & 1 ? tmp : a
        const nex = p & 1 ? a : tmp
        const e = Complex.polar(1, (2 * Math.PI * i * (inv ? -1 : 1)) / sz)
        let w = new Complex(1, 0)
        for (let j = 0; j < sz; j += i) {
            for (let k = 0; k < i; k++) {
                nex[j + k] = cur[((j << 1) & mask) + k].add(cur[(((j << 1) + i) & mask) + k].multiply(w))
            }
            w = w.multiply(e)
        }
        p++
    }
    const r = p & 1 ? tmp : a
    if (inv) for (let i = 0; i < sz; i++) r[i] = r[i].div(sz)
    return r
}


export function atcoderConvolution(a: number[], b: number[]) {
    const m = a.length + b.length - 1
    let sz = 1
    while (m > sz) sz <<= 1

    let A: Complex[] = Array(sz).fill(new Complex(0, 0))
    let B: Complex[] = Array(sz).fill(new Complex(0, 0))
    for (let i = 0; i < a.length; i++) A[i] = new Complex(a[i], 0)
    for (let i = 0; i < b.length; i++) B[i] = new Complex(b[i], 0)
    A = atcoderFFT(sz, A)
    B = atcoderFFT(sz, B)
    for (let i = 0; i < sz; ++i) A[i] = A[i].multiply(B[i])
    A = atcoderFFT(sz, A, true)

    return A;

    // const r: number[] = Array(m)
    // for (let i = 0; i < m; i++) r[i] = Math.round(A[i].real) + 0
    // return r
}

/**
 * 複素数使わない、NTTを利用する場合
 * [提出 #23867141 - AtCoder Typical Contest 001](https://atcoder.jp/contests/atc001/submissions/23867141)
 * [My Algorithm : kopricky アルゴリズムライブラリ](https://kopricky.github.io/code/FFTs/ntt.html)
 * @param a
 * @param b
 */
export function atcoderConvolution2(a: number[], b: number[]): number[] {
    const MOD = 998244353
    const root = 3

    const m = a.length + b.length - 1
    let size = 1
    while (m > size) size <<= 1

    function mul(x: number, y: number) {
        const t = x * y
        return t < 2 ** 53 ? t % MOD : ((((x >> 16) * y) % MOD) * 65536 + (x & 65535) * y) % MOD
    }

    function mod_pow(x: number, n: number) {
        let r = 1
        for (; n; x = mul(x, x), n >>= 1) if (n & 1) r = mul(r, x)
        return r
    }

    function inverse(x: number) {
        return mod_pow(x, MOD - 2)
    }

    const s_n = mod_pow(root, Math.floor((MOD - 1) / size))
    const s_inv = mod_pow(root, MOD - 1 - Math.floor((MOD - 1) / size))
    const kp_n = Array(size / 2 + 1)
    kp_n[0] = 1
    const kp_inv = Array(size / 2 + 1)
    kp_inv[0] = 1
    for (let i = 0; i < size / 2; i++) {
        kp_n[i + 1] = mul(kp_n[i], s_n)
        kp_inv[i + 1] = mul(kp_inv[i], s_inv)
    }

    function ntt(a: number[], inv = false) {
        if (size === 1) return a
        let b = Array(size).fill(0)
        const kp = inv ? kp_inv : kp_n
        for (let [i, l] = [1, size / 2]; i < size; i <<= 1, l >>= 1) {
            for (let [j, r] = [0, 0]; j < l; j++, r += i) {
                for (let [k, s] = [0, kp[i * j]]; k < i; k++) {
                    const p = a[k + r]
                    const q = a[k + r + size / 2]
                    b[k + 2 * r] = (p + q) % MOD
                    b[k + 2 * r + i] = mul(p >= q ? p - q : MOD - q + p, s)
                }
            }
            ;[a, b] = [b, a]
        }
        if (inv) {
            const s = inverse(size)
            for (let i = 0; i < size; i++) a[i] = mul(a[i], s)
        }
        return a
    }

    let A: number[] = Array(size).fill(0)
    let B: number[] = Array(size).fill(0)
    for (let i = 0; i < a.length; i++) A[i] = a[i]
    for (let i = 0; i < b.length; i++) B[i] = b[i]
    A = ntt(A)
    B = ntt(B)
    for (let i = 0; i < size; i++) {
        A[i] = mul(A[i], B[i])
    }
    A = ntt(A, true)
    A.length = m
    return A
}





