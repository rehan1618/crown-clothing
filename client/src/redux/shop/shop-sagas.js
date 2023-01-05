import { collection, getDocs } from "firebase/firestore";
import { call, put, takeLatest, all } from "redux-saga/effects";
import {
	convertCollectionsSnapshotToMap,
	db,
} from "../../firebase/firebase-utils";
import {
	fetchCollectionsFailure,
	fetchCollectionsSuccess,
} from "./shop-actions";

export function* fetchCollectionsAsync() {
	yield console.log("It's fired");
	try {
		const collectionRef = collection(db, "collections");
		const snapshot = yield getDocs(collectionRef);
		const collectionsMap = yield call(
			convertCollectionsSnapshotToMap,
			snapshot
		);
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest("FETCH_COLLECTIONS_START", fetchCollectionsAsync);
}

export function* shopSagas() {
	yield all([call(fetchCollectionsStart)]);
}
