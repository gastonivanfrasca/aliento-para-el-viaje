import * as admin from 'firebase-admin'
import { FirebaseApp } from 'firebase/app'

let app

if (admin.apps.length === 0) {
    app = admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG!)),
        databaseURL: "https://aliento-para-el-viaje-7d878-default-rtdb.firebaseio.com"
    })
} else {
    app = admin.apps[0]
}



export default app as unknown as FirebaseApp