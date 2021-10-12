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
    await Helper.deleteOneByOne("cities")

    const citiesRef = db.collection('cities');

    21-09
[]
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

describe.skip("GET", () => {
    //https://firebase.google.com/docs/firestore/query-data/get-data
    it("should read ALL documents in the collection", async () => {
        const citiesRef = db.collection('cities');
        const snapshot = await citiesRef.get();
        const snapArray = []
        snapshot.forEach(doc => { snapArray.push(doc.data().name) });
        expect(snapArray).toHaveLength(4)
        expect(snapArray).toContain("Washington, D.C.")
    });

    it("should get ONE document BY REFERENCE", async () => {
        const cityRef = db.collection('cities').doc('TOK');
        const doc = await cityRef.get();
        expect(doc.data().name).toBe("Tokyo")
    })

    it("should get multiple documents from a collection based on a query", async () => {
        const citiesRef = db.collection("cities")
        const snapshot = await citiesRef.where("capital", "==", true).get()
        const snapArray = []
        snapshot.forEach(doc => {
            snapArray.push(doc.data())
        })
        // console.log(snapArray)
        expect(snapArray).toHaveLength(3)
        expect(snapArray).not.toContain(
            {
                name: 'San Francisco', state: 'CA', country: 'USA',
                capital: false, population: 860000
            }
        )
    })
})

describe.skip("GET Realtime Updates", () => {
    it("should listen to realtime updates to a document", async () => {
        const doc = db.collection("cities").doc("SF")
        await doc.update({
            newAtrribute: new Date().toLocaleString()
        })

        const promise = new Promise((resolve, reject) => {
            const observer = doc.onSnapshot(docSnapshot => {
                console.log(`Received doc snapshot: ${docSnapshot}`)
                resolve(docSnapshot)
                //desconecta o listener
                observer()
            }, error => {
                console.log(`Encountered error: ${error}`)
                reject(error)
                observer()
            })
        })

        await doc.update({
            newAtrribute2: new Date().toLocaleString()
        })

        const modifiedDoc = await promise
        
        console.log(modifiedDoc.data())

        expect(modifiedDoc).toBeDefined()
        expect(modifiedDoc.data().newAtrribute).toBeDefined()
    })
})
