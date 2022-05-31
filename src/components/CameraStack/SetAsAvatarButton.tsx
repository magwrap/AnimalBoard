import {
  toggleAvatarChangeSnackBar,
  toggleDownloadSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import React from "react";
import { Colors, IconButton, useTheme } from "react-native-paper";
import { Alert } from "react-native";
import { editUserInDB } from "@/hooks/firebase/User/FirestoreUser";
interface SetAsAvatarButtonProps {
  uri: string | null;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editing: boolean;
}

const SetAsAvatarButton: React.FC<SetAsAvatarButtonProps> = ({
  uri,
  setEditing,
  editing,
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state) => state.CurrentUserReducer.currentUser
  );
  const backgroundColor = {
    backgroundColor: MyColors.TRANSPARENT_BLACK,
  };
  const margin = { margin: 0, marginTop: "40%" };
  const iconColor = Colors.white;
  const _askIfSet = async () => {
    Alert.alert(
      "Set as Avatar",
      "Do you want to set this photo as your account profile picture?",
      [
        {
          text: "YES",
          style: "default",
          onPress: () => _setAvatar(),
        },
        { text: "NO", style: "cancel" },
      ]
    );

    const _setAvatar = async () => {
      if (currentUser) {
        await editUserInDB(
          setEditing,
          currentUser.displayName,
          currentUser.description,
          currentUser.birthDate,
          currentUser.email,
          currentUser.emailVerified,
          uri
        );
        dispatch(toggleAvatarChangeSnackBar());
      }
    };
  };
  return (
    <IconButton
      icon="account"
      size={IconSizes.NORMAL}
      color={iconColor}
      onPress={_askIfSet}
      style={[backgroundColor, margin]}
      disabled={editing}
    />
  );
};

export default SetAsAvatarButton;
