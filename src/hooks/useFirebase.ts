import {
  deleteUser,
  getAuth,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  startAfter,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { DBUser, DBUserPost, QueryDocUserPost } from "types";
export enum FirestoreCollectionNames {
  USERS = "users",
  POSTS = "posts",
  USER_POSTS = "userPosts",
}
//TODO: refaktoryzacja tego pliku
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

export const getUserFromDB = async (uid: string) => {
  const db = getFirestore();
  const userRef: DocumentReference<DBUser> = doc(
    //custom type
    db,
    FirestoreCollectionNames.USERS,
    uid
  );
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
};

export const editUserInDB = async (
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  displayName?: DBUser["displayName"],
  description?: DBUser["description"],
  birthDate?: DBUser["birthDate"],
  email?: DBUser["email"],
  emailVerified?: DBUser["emailVerified"],
  avatar?: DBUser["avatar"]
) => {
  setEditing(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser) {
    const db = getFirestore();
    const userRef: DocumentReference<DBUser> = doc(
      //custom type
      db,
      FirestoreCollectionNames.USERS,
      currentUser.uid
    );
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      updateProfile(auth.currentUser, {
        displayName: displayName ? displayName : currentUser.displayName,
        photoURL: avatar ? avatar : currentUser.photoURL,
      })
        .then(async () => {
          const userData = userSnap.data();
          await updateDoc(userRef, {
            displayName: displayName ? displayName : userData.displayName,
            description: description ? description : userData.description,
            birthDate: birthDate ? birthDate : userData.birthDate,
            avatar: avatar ? avatar : userData.avatar,
            email: email ? email : userData.email,
            emailVerified: emailVerified
              ? emailVerified
              : userData.emailVerified,
          });
          setEditing(false);
        })
        .catch((error) => {
          console.log(error);
          setEditing(false);
        });
    }
  } else {
    setEditing(false);
  }
};

export const removeUserFromDB = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    setLoading(true);
    deleteUser(user)
      .then(async () => {
        const db = getFirestore();
        await deleteDoc(doc(db, FirestoreCollectionNames.USERS, user.uid));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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

export const storeImage = async (
  imageURL: string,
  setDownloadURL: (text: string) => void,
  setPhotoDownloadState: (text: string) => void,
  setError: (text: string) => void,
  progressRef: React.MutableRefObject<number>
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
        progressRef.current = progress;
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

const removeImageFromStorage = async (imageURL: string) => {
  const storage = getStorage();
  const imageRef = ref(storage, imageURL);
  deleteObject(imageRef)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      return "fail";
    });
  return "unknown";
};

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

const generateRandomId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
