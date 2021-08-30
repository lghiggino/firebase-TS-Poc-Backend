import average from "../src/average"

describe.skip("It should test the average of numbers in an array", () => {
    it("(average([2, 2]) should return 2", () => {
        expect(average([2, 2])).toBe(2)
    })

    it("average([2, 3, 4, 5, 6, 7, 8]) should return 5", () => {
        const result = average([2, 3, 4, 5, 6, 7, 8])
        expect(result).toBe(5)
    })
})