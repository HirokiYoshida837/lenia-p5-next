/**
 *
 * @param x 入力値
 * @param m 平均値
 * @param s 標準偏差
 */
export const bellCurve = (x: number, m: number, s: number) => {
    return Math.exp(-1 * ((x - m) / s) * ((x - m) / s) / 2)
}


// 距離の正規化の値
const calculateDistanceMatrix = (R: number): number[][] => {
    const D: number[][] = [];

    for (let i = -R; i <= R; i++) {
        const row: number[] = [];

        for (let j = -R; j <= R; j++) {

            // const distance = norm([i + 1, j + 1]);
            // const distance = Math.sqrt((i + 1) ** 2 + (j + 1) ** 2);
            const distance = Math.sqrt((i) ** 2 + (j) ** 2);

            const normalizedDistance = distance / R;
            row.push(normalizedDistance);
        }

        D.push(row);
    }

    console.log(`d`, D)


    return D;
}

const unNormalizedK = (d: number) => {

    // K = (D<1) * bell(D, 0.5, 0.15)


    if (d < 1) {
        return bellCurve(d, 0.5, 0.1)
    } else {
        return 0
    }
}


// 中心を作るため、奇数マスになるようにする
export const createKernel = () => {

    const R = 13;

    const dMatrix = calculateDistanceMatrix(R);

    const map = dMatrix.map(x => x.map(y => unNormalizedK(y)));

    // normalize
    const sumK = map.map(x => x.reduce((a, b) => a + b))
        .reduce((a, b) => a + b)
    const k = map.map(x => x.map(y => y / sumK));


    return k;
}
