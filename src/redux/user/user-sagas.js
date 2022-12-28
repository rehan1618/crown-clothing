import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
	auth,
	createUserProfileDocument,
	getCurrentUser,
	googleProvider,
} from "../../firebase/firebase-utils";
import {
	signInFailure,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	signUpSuccess,
} from "./user-actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(
			createUserProfileDocument,
			userAuth,
			additionalData
		);
		const userSnapshot = yield getDoc(userRef);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield signInWithPopup(auth, googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield signInWithEmailAndPassword(auth, email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signOutUser() {
	try {
		yield signOut(auth);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

export function* SignUpUser({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		yield put(signUpSuccess({ user, additionalData: { displayName } }));
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
	yield takeLatest("GOOGLE_SIGN_IN_START", signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest("EMAIL_SIGN_IN_START", signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest("CHECK_USER_SESSION", isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest("SIGN_OUT_START", signOutUser);
}

export function* onSignUpStart() {
	yield takeLatest("SIGN_UP_START", SignUpUser);
}

export function* onSignUpSuccess() {
	yield takeLatest("SIGN_UP_SUCCESS", signInAfterSignUp);
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(isUserAuthenticated),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
