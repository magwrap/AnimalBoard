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
} from "firebase/firestore";
import { QueryDocUserPost, DBUserPost } from "types";
import { FirestoreCollectionNames } from "../CollectionNames";

export const getUserPosts = async (
  uid: string,
  postsPerPage: number,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  updatePosts: (
    postsData: QueryDocUserPost[],
    lastVisible: QueryDocUserPost
  ) => void
) => {
  setFetching(true);
  try {
    const db = getFirestore();
    const firstQuery: Query<DBUserPost> = query(
      collection(
        db,
        FirestoreCollectionNames.POSTS,
        uid,
        FirestoreCollectionNames.USER_POSTS
      ),

      orderBy("creationDate", "desc"),
      limit(postsPerPage)
    );

    const unsubscribe = onSnapshot(firstQuery, (documentSnapshots) => {
      const posts: {
        postsData: QueryDocumentSnapshot<DBUserPost>[];
        lastVisible: QueryDocumentSnapshot<DBUserPost> | null;
      } = {
        postsData: [],
        lastVisible: null,
      };
      documentSnapshots.forEach((item) => {
        posts.postsData.push(item);
      });
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      updatePosts(posts.postsData, lastVisible);
      setFetching(false);
    });
  } catch (err) {
    setFetching(false);
    console.log(err);
  }
  return null;
};

export const getUserPostsNext = async (
  uid: string,
  postsPerPage: number,
  startAfterDoc: QueryDocumentSnapshot<DBUserPost>,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  updatePosts: (
    postsData: QueryDocUserPost[],
    lastVisible: QueryDocUserPost
  ) => void,
  triggerEndOfPosts: () => void
) => {
  setFetching(true);
  try {
    const db = getFirestore();
    const nextQuery: Query<DBUserPost> = query(
      collection(
        db,
        FirestoreCollectionNames.POSTS,
        uid,
        FirestoreCollectionNames.USER_POSTS
      ),
      orderBy("creationDate", "desc"),
      startAfter(startAfterDoc), //custom type
      limit(postsPerPage)
    );
    const unsubscribe = onSnapshot(nextQuery, (documentSnapshots) => {
      const posts: {
        postsData: QueryDocumentSnapshot<DBUserPost>[];
        lastVisible: QueryDocumentSnapshot<DBUserPost> | null;
      } = {
        postsData: [],
        lastVisible: null,
      };
      if (documentSnapshots.docs.length > 0) {
        documentSnapshots.forEach((item) => {
          posts.postsData.push(item);
        });
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        updatePosts(posts.postsData, lastVisible);
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
