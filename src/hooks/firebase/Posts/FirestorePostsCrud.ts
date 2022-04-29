import { getAuth } from "firebase/auth";
import {
  getFirestore,
  Timestamp,
  setDoc,
  doc,
  DocumentReference,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { DBUserPost } from "types";
import { FirestoreCollectionNames } from "../CollectionNames";
import { generateRandomId } from "../idGeneretor";
import { removeImageFromStorage } from "./StorageImages";

export const addPostToDB = async (
  title: string,
  description: string,
  downloadURL: string
) => {
  const auth = getAuth();

  if (auth.currentUser) {
    let postId = generateRandomId();
    const uid = auth.currentUser.uid;
    const db = getFirestore();
    const now = Timestamp.now();
    await setDoc(
      doc(
        db,
        FirestoreCollectionNames.POSTS,
        uid,
        FirestoreCollectionNames.USER_POSTS,
        postId
      ),
      {
        title,
        description,
        photoURL: downloadURL,
        creationDate: now,
        editionDate: now,
      }
    );
  }
};

export const getPostFromDB = async (postPath: string) => {
  const db = getFirestore();
  try {
    const postRef: DocumentReference<DBUserPost> = doc(db, postPath); //custom type
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      return postSnap.data();
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const editPostInDB = async (
  props: DBUserPost & {
    postPath: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const db = getFirestore();
  props.setLoading(true);
  try {
    const postRef: DocumentReference<DBUserPost> = doc(db, props.postPath); //custom type

    await updateDoc(postRef, {
      title: props.title,
      description: props.description,
      photoURL: props.photoURL,
      creationDate: props.creationDate,
      editionDate: props.editionDate,
    });
    props.setLoading(false);
  } catch (err) {
    console.log(err);
    props.setLoading(false);
  }
};

export const removePostFromDB = async (
  postPath: string,
  imageURL: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const status = await removeImageFromStorage(imageURL);
  try {
    console.log("removing post");
    const db = getFirestore();
    const postDoc = doc(db, postPath);
    await deleteDoc(postDoc);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};
