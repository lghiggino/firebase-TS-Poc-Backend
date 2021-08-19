import average from "../src/average"

describe("It should test the average of numbers in an array", () => {
    it("(average([2, 2]) should return 2", () => {
        expect(average([2, 2])).toBe(2)
    })

    it("average([2, 3, 4, 5, 6, 7, 8]) should return 5", () => {
        const resp = average([2, 3, 4, 5, 6, 7, 8])
        console.log(resp)
        expect(resp).toBe(5)
    })
})