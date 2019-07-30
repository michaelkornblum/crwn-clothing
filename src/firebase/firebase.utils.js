import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyD9LqUhXD8XhILCXuQyaRP_3mFGcZpoUhI",
	authDomain: "crwn-db-e464f.firebaseapp.com",
	databaseURL: "https://crwn-db-e464f.firebaseio.com",
	projectId: "crwn-db-e464f",
	storageBucket: "crwn-db-e464f.appspot.com",
	messagingSenderId: "1028450834979",
	appId: "1:1028450834979:web:30c4725336df8e3f"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
