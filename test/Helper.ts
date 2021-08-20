import { fb, db } from "../src/firebase";

export default class Helper {
    // static async deleteQueryBatch(db, query, resolve) {
    //     const snapshot = await query.get();

    //     const batchSize = snapshot.size;
    //     if (batchSize === 0) {
    //         // When there are no documents left, we are done
    //         resolve();
    //         return;
    //     }

    //     // Delete documents in a batch
    //     const batch = db.batch();
    //     snapshot.docs.forEach((doc) => {
    //         batch.delete(doc.ref);
    //     });
    //     await batch.commit();

    //     // Recurse on the next process tick, to avoid
    //     // exploding the stack.
    //     process.nextTick(() => {
    //         this.deleteQueryBatch(db, query, resolve);
    //     });
    // }

    // static async deleteCollection(db, collectionPath, batchSize) {
    //     const collectionRef = db.collection(collectionPath);
    //     const query = collectionRef.orderBy('__name__').limit(batchSize);

    //     return new Promise((resolve, reject) => {
    //         this.deleteQueryBatch(db, query, resolve).catch(reject);
    //     });
    // }

    static async deleteOneByOne(collectionName: string){
        const snapshot = await db.collection(collectionName).get()
        snapshot.forEach((doc) => {
            doc.ref.delete()
        })
    }

    static async log(string: string){
        console.log("========================BANANA!=============================", string)
    }

}
