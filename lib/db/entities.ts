type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    databaseURL: string;
};

export const FIREBASE_CONFIG: FirebaseConfig = {
    apiKey: process.env.FIREKEY!,
    authDomain: "aliento-para-el-viaje-7d878.firebaseapp.com",
    projectId: "aliento-para-el-viaje-7d878",
    storageBucket: "aliento-para-el-viaje-7d878.appspot.com",
    messagingSenderId: "1022413690846",
    appId: "1:1022413690846:web:44ef84a3b45b8f7311ef4f",
    measurementId: "G-D18XLPD4CX",
    databaseURL:
        "https://aliento-para-el-viaje-7d878-default-rtdb.firebaseio.com/",
};

export enum Status {
    COMPLETED = "completed",
    PROCESSING = "processing",
    QUEUED = "queued",
}

export enum DBEndpoints {
    TRANSCRIPTION = "transcription",
    AUDIO = "audio",
}