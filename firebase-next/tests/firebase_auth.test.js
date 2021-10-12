require("dotenv").config()
const db = require('../utils/db/index')
const bcrypt = require("bcrypt")


class Helper {
    static async deleteOneByOne(collectionName) {
        const snapshot = await db.collection(collectionName).get()
        snapshot.forEach((doc) => {
            doc.ref.delete()
        })
    }
}

beforeEach(async () => {
    await Helper.deleteOneByOne("users")
    await Helper.deleteOneByOne("users")

    const usersRef = db.collection('users');

    const saltRounds = 10
    const password = await process.env.FIREBASE_USER_PASSWORD
    const passwordHash = await bcrypt.hash(password, saltRounds)

    await usersRef.doc('lng').set({
        name: 'Leonardo Ghiggino',
        username: 'lghiggino',
        password: passwordHash,
        uid: "gssXbR9DHFPtwsvRz1sM5Gv83I22"
    });
})

describe("GET", () => {
    //https://firebase.google.com/docs/firestore/query-data/get-data
    it("should get multiple documents from a collection that belong to some USER", async () => {
        const citiesRef = db.collection("cities")
        const snapshot = await citiesRef.where("uid", "==", "gssXbR9DHFPtwsvRz1sM5Gv83I22").get()
        const snapArray = []
        snapshot.forEach(doc => {
            snapArray.push(doc.data())
        })
        console.log(snapArray)
        // expect(snapArray).toHaveLength(3)
        // expect(snapArray).not.toContain(
        //     {
        //         name: 'San Francisco', state: 'CA', country: 'USA',
        //         capital: false, population: 860000
        //     }
        // )
    })
})