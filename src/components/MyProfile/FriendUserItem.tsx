import { getUserFromDB } from "@/hooks/firebase/User/FirestoreUser";
import { AppScreenNames } from "@/navigation/ScreenNames";
import { IconSizes } from "@/styles/Fonts";

import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableRipple, List, Avatar } from "react-native-paper";
import { DBUser, QueryDocFollowing } from "types";

interface FriendUserItemProps {
  followedUser: QueryDocFollowing;
}

const FriendUserItem: React.FC<FriendUserItemProps> = ({ followedUser }) => {
  const navigation = useNavigation();
  const _viewUserProfile = () => {
    if (followedUser) {
      navigation.navigate(AppScreenNames.USER_PROFILE_SCREEN, {
        uid: followedUser.id,
      });
    }
  };

  const [user, setUser] = useState<DBUser | null>(null);

  useLayoutEffect(() => {
    (async () => {
      const fetchedUser = await getUserFromDB(followedUser.id);
      setUser(fetchedUser);
    })();
  }, []);

  return (
    <TouchableRipple onPress={_viewUserProfile}>
      <List.Item
        title={user ? user.displayName : "User"}
        description={user ? user.email : "example@email.com"}
        left={(props) => {
          return user?.avatar ? (
            <Avatar.Image
              {...props}
              source={{ uri: user.avatar }}
              size={IconSizes.HUGE}
            />
          ) : (
            <Avatar.Icon {...props} icon={"account"} size={IconSizes.HUGE} />
          );
        }}
      />
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({});

export default FriendUserItem;
