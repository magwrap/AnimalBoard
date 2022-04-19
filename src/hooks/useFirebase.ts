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
      birthDate: Timestamp.fromDate(new Date()),
    });
    if (!user.emailVerified) {
      await sendEmailVerification(user);
    }
  }
};

export const addPostToDB = async (
  title: string,
  des: string,
  downloadURL: string
) => {
  const postId = generateRandomId();
  console.log("creating uid: ", postId);
  const auth = getAuth();
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
  }
};

export const storeImage = async (
  imageURL: string,
  setDownloadURL: (text: string) => void,
  setPhotoDownloadProgress: (num: number) => void,
  setPhotoDownloadState: (text: string) => void,
  setError: (text: string) => void
) => {
  const storage = getStorage();

  const metadata = {
    contentType: "image/jpeg",
  };
  console.log("fetching");
  const response = await fetch(imageURL);
  console.log(response);

  const blob = await response.blob();

  const storageRef = ref(storage, "images/" + response.url);
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        console.log("File available at", downloadURL);
        setDownloadURL(downloadURL);
      });
    }
  );
};
const generateRandomId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
