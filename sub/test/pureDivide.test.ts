import { divideFive } from "helper/divideFive"

describe("dividing five pure function", () => {
    test("Input 5 output 1", () => {
        const output = divideFive(5)
        expect(output).toBe(1)
    })

    test("Input 0 output 0", () => {
        const output = divideFive(0)
        expect(output).toBe(0)
    })

    test("Input too much", () => {
        expect(() => {
            divideFive(100000)
        }).toThrow()
    })
})