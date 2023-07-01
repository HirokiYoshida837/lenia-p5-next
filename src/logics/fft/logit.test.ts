// import { expect, test } from 'vitest'
import {describe, expect, it} from "vitest"
import {calcAdd} from "./logit";

// test('sample test', () => {
//
//     const result = calcAdd(3,4);
//     expect(result).toBe(7);
//
//
//     // render(<Home />)
//     // const main = within(screen.getByRole('main'))
//     // expect(
//     //     main.getByRole('heading', { level: 1, name: /welcome to next\.js!/i })
//     // ).toBeDefined()
//     //
//     // const footer = within(screen.getByRole('contentinfo'))
//     // const link = within(footer.getByRole('link'))
//     // expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined()
// })

describe("add", () => {
    it("1 + 2 = 3", () => {
        const result = calcAdd(1, 2)

        expect(result).toBe(3)
    })

    it("1 + 2 = 10", () => {
        const result = calcAdd(1, 2)

        expect(result).toBe(10)
    })
})
