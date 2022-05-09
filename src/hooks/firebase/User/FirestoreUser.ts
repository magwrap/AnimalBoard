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
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { DBUser } from "types";
import { FirestoreCollectionNames } from "../CollectionNames";
import { generateRandomNum } from "../idGeneretor";

export const addUserToDB = async (user: User) => {
  const db = getFirestore();
  const docRef = doc(db, FirestoreCollectionNames.USERS, user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  } else {
    await setDoc(doc(db, FirestoreCollectionNames.USERS, user.uid), {
      email: user.email,
      displayName: user.displayName
        ? user.displayName
        : `user${generateRandomNum().toString()}`,
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
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
        setErrorMsg("Something went wrong...");
        setLoading(false);
      });
  }
};
