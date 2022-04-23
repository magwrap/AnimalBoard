import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Caption,
  Colors,
  Paragraph,
  Subheading,
  Title,
  useTheme,
} from "react-native-paper";
import { DBUser } from "types";

type ViewProfileInfoProps = Omit<DBUser, "emailVerified">;

const ViewProfileInfo: React.FC<ViewProfileInfoProps> = (props) => {
  const { colors, roundness, dark } = useTheme();
  const borderColor = { borderColor: colors.accent };
  const borderRadius = { borderRadius: roundness };

  return (
    <View style={[styles.container, borderRadius]}>
      <View style={styles.top}>
        <View style={styles.avatarAndTitle}>
          <Avatar.Image
            size={70}
            source={{ uri: props.avatar }}
            style={styles.avatar}
          />
          {/* <Title>{props.displayName}</Title> */}
        </View>
        <View style={[styles.seperator, borderColor]} />
        <View style={styles.userInfo}>
          <Subheading>{props.email}</Subheading>
          <Caption style={styles.centerText}>
            born: {props.birthDate.toDate().toLocaleDateString()}
          </Caption>
        </View>
      </View>
      <View style={[styles.seperator, borderColor]} />
      <View style={styles.userDes}>
        <Paragraph>
          {props.description ? props.description : "No description..."}
        </Paragraph>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
    padding: 5,
    justifyContent: "center",
    borderWidth: 1,
  },
  top: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  avatar: {
    marginHorizontal: 20,
  },
  avatarAndTitle: {
    alignItems: "center",
    paddingVertical: 5,
  },
  userInfo: {
    flexDirection: "column",

    justifyContent: "center",
  },
  userDes: { width: "80%", alignItems: "center" },
  centerText: { textAlign: "center" },
  seperator: {
    height: 1,
    borderBottomWidth: 1,
    width: "45%",
  },
});

export default ViewProfileInfo;
