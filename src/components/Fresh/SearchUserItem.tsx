import { generateRandomNum } from "@/hooks/firebase/idGeneretor";
import { AppScreenNames } from "@/navigation/ScreenNames";
import { IconSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import {
  Avatar,
  IconButton,
  List,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { QueryDocUser } from "types";
import { AntDesign } from "@expo/vector-icons";

interface SearchUserItemProps {
  userItem: QueryDocUser;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ userItem }) => {
  console.log(generateRandomNum());
  const navigation = useNavigation();
  const { colors } = useTheme();
  const _viewUserProfile = (uid: string) => {
    navigation.navigate(AppScreenNames.USER_PROFILE_SCREEN, {
      uid,
    });
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
        right={(props) => (
          <IconButton
            {...props}
            icon={() => (
              <AntDesign
                name="adduser"
                size={IconSizes.NORMAL}
                color={colors.text}
              />
            )}
            onPress={() => {}}
          />
        )}
      />
    </TouchableRipple>
  );
};

export default SearchUserItem;
