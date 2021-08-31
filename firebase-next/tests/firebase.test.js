const db = require('../utils/db/index')

class Helper {
    static async deleteOneByOne(collectionName) {
        const snapshot = await db.collection(collectionName).get()
        snapshot.forEach((doc) => {
            doc.ref.delete()
        })
    }
}

beforeEach(async () => {
    await Helper.deleteOneByOne("cities")

    const citiesRef = db.collection('cities');

    await citiesRef.doc('SF').set({
        name: 'San Francisco', state: 'CA', country: 'USA',
        capital: false, population: 860000
    });
    await citiesRef.doc('DC').set({
        name: 'Washington, D.C.', state: null, country: 'USA',
        capital: true, population: 680000
    });
    await citiesRef.doc('TOK').set({
        name: 'Tokyo', state: null, country: 'Japan',
        capital: true, population: 9000000
    });
    await citiesRef.doc('BJ').set({
        name: 'Beijing', state: null, country: 'China',
        capital: true, population: 21500000
    });
})

describe("GET", () => {
    it.skip("get ONE document BY REFERENCE", async () => {
        const cityRef = db.collection('cities').doc('TOK');
        const doc = await cityRef.get();
        expect(doc.data().name).toBe("Tokyo")
    })

    it("should read ALL documents in the collection", async () => {
        const citiesRef = db.collection('cities');
        const snapshot = await citiesRef.get();
        const snapArray = []
        snapshot.forEach(doc => { snapArray.push(doc.data().name) });
        expect(snapArray).toHaveLength(4)
        expect(snapArray).toContain("Washington, D.C.")
    });

    it.skip("get ONE document BY QUERY", () => {

    })
})

