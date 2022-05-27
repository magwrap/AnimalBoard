import { getAuth } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { generateRandomId } from "../idGeneretor";

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

export const removeImageFromStorage = async (imageURL: string) => {
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
