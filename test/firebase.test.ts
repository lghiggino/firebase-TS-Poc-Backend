import { fb, db } from "../src/firebase";
import  Helper from "./Helper"

describe("Initial firebase tests", () => {
    beforeEach(async () => {
        await Helper.deleteOneByOne("users")
      });

    it.skip("should initialize firebase", async () => {
        const connection = await fb.firestore()
        console.log(connection)
    })

    it("should add data to a collection", async () => {
        //create a new document
        const document = {
            first: 'Ada',
            last: 'Lovelace',
            born: 1815
        }
        const document2 = {
            first: 'Alan',
            last: 'Turing',
            born: 1921
        }
        const result = await db.collection('users').add(document)
        console.log(result)
    });

    it.skip("should read all documents from a collection", async () => {
        const snapshot = await db.collection("users").get()
        snapshot.forEach((doc) => {
            console.log(doc.id, "->", doc.data())
        })
        // expect(snapshot).toBeDefined()
    })

    it.skip("should create a new collection and new document", async () => {
        const data = {
            name: 'Los Angeles',
            state: 'CA',
            country: 'USA'
        };

        // Add a new document in collection "cities" with ID 'LA'
        const res = await db.collection('cities').doc('LA').set(data);
    })

});