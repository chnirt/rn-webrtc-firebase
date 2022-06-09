import {
  RN_APP_TITLE,
  RN_APP_FIREBASE_API_KEY,
  RN_APP_FIREBASE_AUTH_DOMAIN,
  RN_APP_FIREBASE_PROJECT_ID,
  RN_APP_FIREBASE_STORAGE_BUCKET,
  RN_APP_FIREBASE_MESSAGING_SENDER_ID,
  RN_APP_FIREBASE_APP_ID
} from '@env'

export const appTitle = RN_APP_TITLE

export const apiKey = RN_APP_FIREBASE_API_KEY
export const authDomain = RN_APP_FIREBASE_AUTH_DOMAIN
export const projectId = RN_APP_FIREBASE_PROJECT_ID
export const storageBucket = RN_APP_FIREBASE_STORAGE_BUCKET
export const messagingSenderId = RN_APP_FIREBASE_MESSAGING_SENDER_ID
export const appId = RN_APP_FIREBASE_APP_ID

export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}