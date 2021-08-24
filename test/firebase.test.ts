import { fb, db } from "../src/firebase";
import Helper from "./Helper"
import { deleteCollection } from "./Helper"



describe("checking status", () => {
    it("should initialize firebase", async () => {
        const connection = await fb.firestore()
        console.log(connection)
    })
})

describe("Writing documents", () => {
    beforeEach(async () => {
        await Helper.deleteOneByOne("users")
    });

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
    });

    it("should SET a new document with a predetermined id", async () => {
        const id = `alovelace-${Math.random() * 100}`
        const docRef = db.collection("users").doc(id);
        const result = await docRef.set({
            first: "Ada",
            last: "Lovelace",
            born: 1815,
        })
        console.log(result)
    })

    it("should create a new collection and new document", async () => {
        const data = {
            name: 'Los Angeles',
            state: 'CA',
            country: 'USA'
        };
        const result = await db.collection('cities').doc('LA').set(data);
        console.log(result)
    })

    it.only("should create one and update its content", async () => {
        //clear DB
        await deleteCollection(db, "users", 5)
        //
        const id = `alovelace-${Math.random()}`
        const docRef = db.collection('users').doc(id);
        await docRef.set({
            first: 'Ada',
            last: 'Lovelace',
            born: 1815,
        })
        await docRef.update({
            newAttribute: Date.now().toLocaleString(),
        })
    })
});

describe("Reading documents", () => {
    it("should read all documents from a collection", async () => {
        const snapshot = await db.collection("users").get()
        snapshot.forEach((doc) => {
            console.log(doc.id, "->", doc.data())
        })
        // expect(snapshot).toBeDefined()
    })

    it("should read one SPECIFIC document from a collection", async () => {
        //clear DB
        await deleteCollection(db, "users", 5)
        //create Ada
        Helper.createAda("users")
        //create others
        for (let i = 0; i < 3; i++) {
            Helper.createUser("users")
        }

        const snapshot = await db.collection("users").where("first", "==", "Ada").where("last", "==", "Lovelace").get()
        if (snapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());

        });
    })

    it("should read on document via its ID", async () => {
        //clear DB
        await deleteCollection(db, "users", 5)

        const docRef = db.collection("users").doc("adalovelace");
        await docRef.set({
            first: "Ada",
        })
        const snapshot = await db.collection("users").get();
        const singleDoc = [] as any
        snapshot.forEach((doc) => {
            singleDoc.push({
                id: doc.id,
                ...doc.data()
            })
        });
        expect(singleDoc).toMatchObject([{
            id: 'adalovelace',
            first: 'Ada'
        }])
    })
})