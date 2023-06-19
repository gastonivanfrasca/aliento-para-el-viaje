import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, ref, get, set, child } from "firebase/database";
import { FIREBASE_CONFIG, DBEndpoints } from "@/lib/db/types";

/**
 * Retrieves data from the Firebase Realtime Database.
 * @param dbEndpoint The endpoint to retrieve data from.
 * @returns The data retrieved from the database.
 * @throws An error if there is no data available or if there is an error retrieving the data.
 */
export const getFromDB = async (dbEndpoint: DBEndpoints) => {
    const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
    const dbRef = ref(getDatabase(app));
    try {
        const data = await get(child(dbRef, dbEndpoint)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                return data;
            } else {
                const error = "no data available";
                console.log(error);
                throw new Error(error);
            }
        })
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Writes data to the Firebase Realtime Database.
 * @param dbEndpoint The endpoint to write data to.
 * @param data The data to write to the database.
 * @throws An error if there is an error writing the data.
 */
export const writeToDB = async (dbEndpoint: DBEndpoints, data: any) => {
    const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
    const dbRef = ref(getDatabase(app));
    try {
        await set(child(dbRef, dbEndpoint), data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}