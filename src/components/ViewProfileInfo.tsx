import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Caption,
  Divider,
  Headline,
  Paragraph,
} from "react-native-paper";

type ViewProfileInfoProps = Omit<DBUser, "emailVerified" | "email">;

const ViewProfileInfo: React.FC<ViewProfileInfoProps> = (props) => {
  const dateOfBirth = new Date(props.birthDate.seconds);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Avatar.Image
          size={70}
          source={{ uri: props.avatar }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Headline>{props.displayName}</Headline>
          <Caption>{dateOfBirth.toLocaleDateString()}</Caption>
        </View>
      </View>
      <Divider />
      <View style={styles.userDes}>
        <Paragraph>{props.description}</Paragraph>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  top: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
  },
  avatar: { margin: 20, marginLeft: "10%" },
  userInfo: {
    justifyContent: "center",
  },
  userDes: {},
});

export default ViewProfileInfo;
