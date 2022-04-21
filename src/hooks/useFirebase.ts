import { getAuth, sendEmailVerification, User } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export enum FirestoreCollectionNames {
  USERS = "users",
  POSTS = "posts",
  USER_POSTS = "userPosts",
}

export const addUserToDB = async (user: User) => {
  const db = getFirestore();
  const docRef = doc(db, FirestoreCollectionNames.USERS, user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  } else {
    await setDoc(doc(db, FirestoreCollectionNames.USERS, user.uid), {
      email: user.email,
      displayName: user.displayName,
      description: "",
      avatar: user.photoURL,
      emailVerified: user.emailVerified,
      birthDate: Timestamp.now(),
    });
    if (!user.emailVerified) {
      await sendEmailVerification(user);
    }
  }
};

export const addPostToDB = async (
  title: string,
  description: string,
  downloadURL: string
) => {
  const auth = getAuth();

  if (auth.currentUser) {
    let postId = generateRandomId();
    console.log("creating uid: ", postId);
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

export const storeImage = async (
  imageURL: string,
  setDownloadURL: (text: string) => void,
  setPhotoDownloadProgress: (num: number) => void,
  setPhotoDownloadState: (text: string) => void,
  setError: (text: string) => void
) => {
  const auth = getAuth();
  const storage = getStorage();
  const metadata = {
    contentType: "image/jpeg",
  };

  if (auth.currentUser) {
    const response = await fetch(imageURL);
    const blob = await response.blob();

    const imageId = generateRandomId();
    const childPath = `post/${auth.currentUser.uid}/${imageId}`;
    const storageRef = ref(storage, childPath);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPhotoDownloadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            setPhotoDownloadState(snapshot.state);
            break;
          case "running":
            setPhotoDownloadState(snapshot.state);
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            setError(error.code);
            break;
          case "storage/canceled":
            setPhotoDownloadState("cancelled");
            setError(error.code);
            break;
          case "storage/unknown":
            setError("unknown error accured");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
        });
      }
    );
  } else {
    setError("Something went wrong with authorization...");
  }
};
const generateRandomId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
