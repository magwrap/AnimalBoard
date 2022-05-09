import {
  checkIfIsFollowed,
  followUser,
  unFollowUser,
} from "@/hooks/firebase/User/Following/FirestoreUserFriends";
import { cardStyles } from "@/styles/Card/profileInfoCard";
import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import { getAuth } from "firebase/auth";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Colors, useTheme } from "react-native-paper";

interface ProfileFollowButtonsProps {
  uid: string;
}

const ProfileFollowButtons: React.FC<ProfileFollowButtonsProps> = ({ uid }) => {
  const { currentUser } = getAuth();
  if (currentUser) {
    if (currentUser.uid === uid) {
      return <></>;
    }
  }
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const buttonColor = isFollowed ? Colors.grey400 : colors.accent;
  const buttonText = isFollowed ? "UNFOLLOW" : "FOLLOW";

  useLayoutEffect(() => {
    (async () => {
      const followed = await checkIfIsFollowed(uid);
      setIsFollowed(followed);
    })();
  }, []);

  const _followUser = async (uid: string) => {
    await followUser(uid, setLoading, setIsFollowed);
    //TODO: show snackbar with info ze dodano do znajomych
  };

  const _unFollowUser = async (uid: string) => {
    await unFollowUser(uid, setLoading, setIsFollowed);
    //TODO: show snackbard with info ze usunieto
  };

  const onPressFollow = () =>
    isFollowed ? _unFollowUser(uid) : _followUser(uid);

  return (
    <Card style={[cardStyles.container, { marginTop: 0 }]}>
      <View style={{ width: "100%" }}>
        <Button
          onPress={onPressFollow}
          color={buttonColor}
          mode="contained"
          style={styles.button}
          disabled={loading}>
          {buttonText}
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {},
});
export default ProfileFollowButtons;
