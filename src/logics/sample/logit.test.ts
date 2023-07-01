import {describe, expect, it} from "vitest"
import {calcAdd} from "./logit";

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
