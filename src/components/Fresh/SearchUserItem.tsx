import { AppScreenNames } from "@/navigation/ScreenNames";
import { IconSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Avatar,
  IconButton,
  List,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { QueryDocUser } from "types";
import { AntDesign } from "@expo/vector-icons";
import {
  checkIfIsFollowed,
  followUser,
} from "@/hooks/firebase/User/Following/FirestoreUserFriends";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import { getAuth } from "firebase/auth";

interface SearchUserItemProps {
  userItem: QueryDocUser;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ userItem }) => {
  const [isFollowed, setIsFollowed] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();
  useLayoutEffect(() => {
    (async () => {
      const followed = await checkIfIsFollowed(userItem.id);
      setIsFollowed(followed);
      // setLoading(false);
    })();
  }, []);

  const _viewUserProfile = (uid: string) => {
    navigation.navigate(AppScreenNames.USER_PROFILE_SCREEN, {
      uid,
    });
  };

  const _followUser = async (uid: string) => {
    await followUser(uid, setLoading, setIsFollowed);
  };
  const itemData = userItem.data();
  return (
    <TouchableRipple onPress={() => _viewUserProfile(userItem.id)}>
      <List.Item
        title={itemData.displayName}
        description={itemData.email}
        left={(props) => {
          return itemData.avatar ? (
            <Avatar.Image
              {...props}
              source={{ uri: itemData.avatar }}
              size={IconSizes.HUGE}
            />
          ) : (
            <Avatar.Icon {...props} icon={"account"} size={IconSizes.HUGE} />
          );
        }}
        right={(props) => {
          const { currentUser } = getAuth();

          if (userItem.id == currentUser?.uid) {
            return <></>;
          }
          if (loading) {
            return <MyActivityIndicator />;
          }
          if (isFollowed) {
            return (
              <IconButton
                {...props}
                icon={() => (
                  <MaterialCommunityIcons
                    name="account-check"
                    size={IconSizes.NORMAL}
                    color={colors.text}
                  />
                )}
              />
            );
          }
          return (
            <IconButton
              {...props}
              disabled={loading}
              icon={() => (
                <AntDesign
                  name="adduser"
                  size={IconSizes.NORMAL}
                  color={colors.text}
                />
              )}
              onPress={() => _followUser(userItem.id)}
            />
          );
        }}
      />
    </TouchableRipple>
  );
};

export default SearchUserItem;
