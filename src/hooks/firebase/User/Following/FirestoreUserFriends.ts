import { getAuth } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { FirestoreCollectionNames } from "../../CollectionNames";

export const followUser = async (
  userToFollowId: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFollowed: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      if (auth.currentUser) {
        const db = getFirestore();
        const now = Timestamp.now();
        await setDoc(
          doc(
            db,
            FirestoreCollectionNames.FOLLOWING,
            uid,
            FirestoreCollectionNames.USER_FOLLOWING,
            userToFollowId
          ),
          {
            since: now,
          }
        );
        setIsFollowed(true);
      }
    }
    setLoading(false);
  } catch (err) {
    setLoading(false);
  }
};

export const unFollowUser = async (
  userToUnfollowId: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFollowed: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const db = getFirestore();
      const followedDoc = doc(
        db,
        FirestoreCollectionNames.FOLLOWING,
        uid,
        FirestoreCollectionNames.USER_FOLLOWING,
        userToUnfollowId
      );
      await deleteDoc(followedDoc);
      setIsFollowed(false);
      setLoading(false);
    }
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};

export const checkIfIsFollowed = async (userToCheckIfFollowedId: string) => {
  try {
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const db = getFirestore();

      const docRef = doc(
        db,
        FirestoreCollectionNames.FOLLOWING,
        uid,
        FirestoreCollectionNames.USER_FOLLOWING,
        userToCheckIfFollowedId
      );
      const docSnap = await getDoc(docRef);

      return docSnap.exists();
    }
  } catch (err) {
    return false;
  }
  return false;
};
