import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyBrUKV1RATS5IQipGHVquQUtuUreJskmGQ",
	authDomain: "chimdum-clothing-db.firebaseapp.com",
	projectId: "chimdum-clothing-db",
	storageBucket: "chimdum-clothing-db.appspot.com",
	messagingSenderId: "695597699174",
	appId: "1:695597699174:web:7e4d51bf34f111590b1da7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid)

   const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try{
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}