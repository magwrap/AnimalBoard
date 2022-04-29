import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Appbar } from "react-native-paper";
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

  const _handleSearch = () => console.log("Searching");

  return (
    <Appbar.Header>
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
