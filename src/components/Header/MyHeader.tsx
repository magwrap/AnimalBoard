import { AppScreenNames } from "@/navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import MyMenu from "./MyMenu";

interface MyHeaderProps {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
  search?: boolean;
  more?: boolean;
}

const MyHeader: React.FC<MyHeaderProps> = ({
  showBackButton = false,
  title = "Animal Board",
  subtitle = "",
  search = false,
  more = false,
}) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();
  // const { colors } = useTheme();

  const _handleSearch = () =>
    navigation.navigate(AppScreenNames.SEARCH_USERS_SCREEN);

  return (
    <Appbar.Header
    // style={{ backgroundColor: colors.primary }}
    >
      {showBackButton && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {search && <Appbar.Action icon="magnify" onPress={_handleSearch} />}
      {more && (
        <MyMenu visible={visible} openMenu={openMenu} closeMenu={closeMenu} />
      )}
    </Appbar.Header>
  );
};

export default MyHeader;
