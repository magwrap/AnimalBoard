import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

interface MyHeaderProps {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
  showButtonsOnRight?: boolean;
}

const MyHeader: React.FC<MyHeaderProps> = ({
  showBackButton = false,
  title = "Animal Board",
  subtitle = "",
  showButtonsOnRight = false,
}) => {
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header>
      {showBackButton && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {showButtonsOnRight && (
        <>
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </>
      )}
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({});

export default MyHeader;
