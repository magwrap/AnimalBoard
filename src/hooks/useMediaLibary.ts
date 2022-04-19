import { CameraCapturedPicture } from "expo-camera/build/Camera.types";
import * as MediaLibrary from "expo-media-library";

export const addPhotoToLibary = async (uri: string) => {
  const albumName = "AnimalBoard";
  const album = await MediaLibrary.getAlbumAsync(albumName);
  try {
    const asset = await MediaLibrary.createAssetAsync(uri);

    if (album) {
      MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
    } else {
      MediaLibrary.createAlbumAsync(albumName, asset, false);
    }
  } catch (err) {
    console.error(err);
  }
};

export const downloadPhoto = async (
  photoTaken: CameraCapturedPicture | null,
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const permission = await MediaLibrary.getPermissionsAsync();

  if (!permission?.granted) {
    try {
      console.log("asking");
      const response = await MediaLibrary.requestPermissionsAsync();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  if (photoTaken && permission?.granted) {
    setDownloading(true);
    console.log(photoTaken.uri);
    try {
      addPhotoToLibary(photoTaken.uri).then(() => {
        setDownloading(false);
      });
    } catch (error) {
      setDownloading(false);
    }
  }
};
