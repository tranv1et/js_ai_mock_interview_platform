import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import serviceAccount from '@/key/serviceAccountKey.json';

dotenv.config();

if (!getApps().length) {
//   initializeApp({
//     credential: cert(serviceAccount as any),
//   });
initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
})
}

export const db = getFirestore();
// db.settings({ preferRest: true });

export const auth = getAuth();

(async () => {
  try {
    const testDoc = await db.collection('users').limit(1).get();
    testDoc.forEach(doc => {
      console.log(`✅ Found doc: ${doc.id}`, doc.data());
    });
  } catch (err) {
    console.error("❌ Firestore error:", err);
  }
})();
