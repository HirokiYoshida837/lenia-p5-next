const BoundaryKeys = ["wrap", "reflect", "constant"] as const
type BoundaryTypes = typeof BoundaryKeys[number];


export function convolution(input: number[][], kernel: number[][], boundary: BoundaryTypes = 'wrap') {

    const inputHeight = input.length;
    const inputWidth = input[0].length;

    const kernelHeight = kernel.length;
    const kernelWidth = kernel[0].length;

    const outputHeight = inputHeight;
    const outputWidth = inputWidth;

    const kernelCenterX = Math.floor(kernelWidth / 2);
    const kernelCenterY = Math.floor(kernelHeight / 2);


    const output: number[][] = new Array(outputHeight)
        .fill([])
        .map(() => new Array(outputWidth).fill(0));


    // inputすべてのマスについて処理
    for (let i = 0; i < outputHeight; i++) {
        for (let j = 0; j < outputWidth; j++) {

            let sum = 0;
            // 畳み込み実行
            for (let k = 0; k < kernelHeight; k++) {
                for (let l = 0; l < kernelWidth; l++) {

                    const inputColIndex = getBoundaryIndex(i + k - kernelCenterY, inputHeight, boundary);
                    const inputRowIndex = getBoundaryIndex(j + l - kernelCenterX, inputWidth, boundary);
                    sum += input[inputRowIndex][inputColIndex] * kernel[k][l];
                }
            }
            output[i][j] = sum;
        }
    }

    return output;
}

function getBoundaryIndex(index: number, length: number, boundary: BoundaryTypes): number {
    if (boundary === 'wrap') {
        return (index + length) % length;
    } else if (boundary === 'reflect') {
        if (index < 0) {
            return -index;
        } else if (index >= length) {
            return 2 * (length - 1) - index;
        }
    }
    // 'constant' バウンダリーの場合や、その他の場合は元のインデックスを返す
    return index;
}
