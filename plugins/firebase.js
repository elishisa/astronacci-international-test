import firebase, { analytics } from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        appId: process.env.FIREBASE_APP_ID,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    }
    services: {
        analytics: true
    }
    firebase.initializeApp(firebaseConfig)
}

let db = firebase.firestore()


export { db }