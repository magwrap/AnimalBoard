import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { DBFollowing, QueryDocFollowing } from "types";
import { FirestoreCollectionNames } from "../../CollectionNames";

export const getUserFollowingQuery = async (
  uid: string,
  followedPerPage: number,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  updateFollowing: (
    followingData: QueryDocFollowing[],
    lastVisible: QueryDocFollowing
  ) => void
) => {
  setFetching(true);
  try {
    const db = getFirestore();
    const firstQuery: Query<DBFollowing> = query(
      collection(
        db,
        FirestoreCollectionNames.FOLLOWING,
        uid,
        FirestoreCollectionNames.USER_FOLLOWING
      ),

      orderBy("since", "desc"),
      limit(followedPerPage)
    );

    const unsubscribe = onSnapshot(firstQuery, (documentSnapshots) => {
      const following: {
        followingData: QueryDocFollowing[];
        lastVisible: QueryDocFollowing | null;
      } = {
        followingData: [],
        lastVisible: null,
      };
      documentSnapshots.forEach((item) => {
        following.followingData.push(item);
      });
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      updateFollowing(following.followingData, lastVisible);
      setFetching(false);
    });
  } catch (err) {
    setFetching(false);
    console.log(err);
  }
  return null;
};

export const getUserFollowingQueryNext = async (
  uid: string,
  followedPerPage: number,
  startAfterDoc: QueryDocumentSnapshot<DBFollowing>,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  updateFollowing: (
    followingData: QueryDocFollowing[],
    lastVisible: QueryDocFollowing
  ) => void,
  triggerEndOfFollowing: () => void
) => {
  setFetching(true);
  try {
    const db = getFirestore();
    const nextQuery: Query<DBFollowing> = query(
      collection(
        db,
        FirestoreCollectionNames.FOLLOWING,
        uid,
        FirestoreCollectionNames.USER_FOLLOWING
      ),
      orderBy("since", "desc"),
      startAfter(startAfterDoc), //custom type
      limit(followedPerPage)
    );
    const unsubscribe = onSnapshot(nextQuery, (documentSnapshots) => {
      const following: {
        followingData: QueryDocFollowing[];
        lastVisible: QueryDocFollowing | null;
      } = {
        followingData: [],
        lastVisible: null,
      };
      if (documentSnapshots.docs.length > 0) {
        documentSnapshots.forEach((item) => {
          following.followingData.push(item);
        });
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        updateFollowing(following.followingData, lastVisible);
      } else {
        triggerEndOfFollowing();
      }
      setFetching(false);
    });
  } catch (err) {
    setFetching(false);
    console.log(err);
  }
  return null;
};
