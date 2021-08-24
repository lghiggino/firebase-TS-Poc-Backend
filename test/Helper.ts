import { fb, db } from "../src/firebase";

export default class Helper {
    static async deleteOneByOne(collectionName: string){
        const snapshot = await db.collection(collectionName).get()
        snapshot.forEach((doc) => {
            doc.ref.delete()
        })
    }

    static async createUser(collectionName: string){
        const id = `${Math.random() * 100}`
        const docRef = db.collection("users").doc(id);
        const firstNames = ["Ada", "Bert", "Connie", "Dido", "Elliot", "Frances", "Guillermo", "Henry", "Igor", "Jock", "Kyle", "Leo"]
        const lastNames = ["Zyiech", "Ygg", "Xander", "Wash", "Victor", "Ulla", "Tatum", "Silva", "Rupert", "Quill", "Pashto", "Oliver"]
        const firstRandom = Math.floor(Math.random() * firstNames.length)
        const lastRandom = Math.floor(Math.random() * lastNames.length)

        await docRef.set({
            first: firstNames[firstRandom],
            last: lastNames[lastRandom],
            born: Math.floor(Math.random() * 2021),
        })
    }

    static async createAda(collectionName: string){
        const id = `alovelace-${Math.random() * 100}`
        const docRef = db.collection("users").doc(id);
        const result = await docRef.set({
            first: "Ada",
            last: "Lovelace",
            born: 1815,
        })
    }

}


export async function deleteCollection(db: any, collectionPath: string, batchSize: number) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
  async function deleteQueryBatch(db: any, query: any, resolve: any) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }
  