import {
  getFirestore,
  Query,
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { QueryDocUser, DBUser } from "types";
import { FirestoreCollectionNames } from "../CollectionNames";

export const searchUser = async (
  search: string,
  usersPerPage: number,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  updateUsers: (users: QueryDocUser[], lastVisible: QueryDocUser) => void
) => {
  setFetching(true);
  try {
    //TODO: poprawic fetching
    const db = getFirestore();
    const usersRef = collection(db, FirestoreCollectionNames.USERS);
    const firstQuery: Query<DBUser> = query(
      usersRef,
      where("displayName", ">=", search),
      // orderBy("displayName"),
      limit(usersPerPage)
    );

    const unsubscribe = onSnapshot(firstQuery, (documentSnapshots) => {
      const usersData: {
        users: QueryDocumentSnapshot<DBUser>[];
        lastVisible: QueryDocumentSnapshot<DBUser> | null;
      } = {
        users: [],
        lastVisible: null,
      };
      documentSnapshots.forEach((item) => {
        usersData.users.push(item);
      });
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      updateUsers(usersData.users, lastVisible);
      setFetching(false);
    });
  } catch (err) {
    setFetching(false);
    console.log(err);
  }
  return null;
};

export const serachUserNext = async (
  search: string,
  postsPerPage: number,
  startAfterDoc: QueryDocumentSnapshot<DBUser>,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  updateUsers: (users: QueryDocUser[], lastVisible: QueryDocUser) => void,
  triggerEndOfPosts: () => void
) => {
  setFetching(true);
  try {
    const db = getFirestore();
    const usersRef = collection(db, FirestoreCollectionNames.USERS);
    const nextQuery: Query<DBUser> = query(
      usersRef,
      where("displayName", ">=", search),
      // orderBy("displayName"),
      startAfter(startAfterDoc),
      limit(postsPerPage)
    );
    const unsubscribe = onSnapshot(nextQuery, (documentSnapshots) => {
      const usersData: {
        users: QueryDocumentSnapshot<DBUser>[];
        lastVisible: QueryDocumentSnapshot<DBUser> | null;
      } = {
        users: [],
        lastVisible: null,
      };

      if (documentSnapshots.docs.length > 0) {
        documentSnapshots.forEach((item) => {
          usersData.users.push(item);
        });
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        updateUsers(usersData.users, lastVisible);
        setFetching(false);
      } else {
        triggerEndOfPosts();
      }
      setFetching(false);
    });
  } catch (err) {
    setFetching(false);
    console.log(err);
  }
  return null;
};
