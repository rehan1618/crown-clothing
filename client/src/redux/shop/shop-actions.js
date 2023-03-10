import { collection, getDocs } from 'firebase/firestore';
import {
  convertCollectionsSnapshotToMap,
  db,
} from '../../firebase/firebase-utils';

export const fetchCollectionsStart = () => ({
  type: 'FETCH_COLLECTIONS_START',
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: 'FETCH_COLLECTIONS_SUCCESS',
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: 'FETCH_COLLECTIONS_FAILURE',
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(db, 'collections');
    dispatch(fetchCollectionsStart());
    getDocs(collectionRef)
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
