import { fb, db } from "../src/firebase";

describe("Initial firebase tests", () => {
    it.skip("should initialize firebase", async () => {
        const connection = await fb.firestore()
        console.log(connection)
    })

    it.skip("should add data to a collection", async () => {
        const document = {
            first: 'Ada',
            last: 'Lovelace',
            born: 1815
        }
        const result = await db.collection('users').add(document)
        console.log(result)
    });

    it("should read all documents from a collectionn", async () => {
        const snapshot = await db.collection("users").get()
        snapshot.forEach((doc) => {
            console.log(doc.id, "->", doc.data())
        })
        expect(snapshot).toBeDefined()
        
    })

});