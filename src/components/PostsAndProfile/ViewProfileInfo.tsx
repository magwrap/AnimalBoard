import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Caption,
  Card,
  Colors,
  Paragraph,
  Subheading,
  Title,
  useTheme,
} from "react-native-paper";
import { DBUser } from "types";

type ViewProfileInfoProps = Omit<DBUser, "emailVerified">;

const ViewProfileInfo: React.FC<ViewProfileInfoProps> = (props) => {
  const { colors } = useTheme();
  const borderColor = { borderColor: colors.accent };

  return (
    <Card style={styles.container}>
      <View>
        <View style={styles.top}>
          <View style={styles.avatarAndTitle}>
            <Avatar.Image
              size={70}
              source={{ uri: props.avatar }}
              style={styles.avatar}
            />
          </View>
          <View style={[styles.seperator, borderColor]} />
          <View style={styles.userInfo}>
            <Subheading>{props.email}</Subheading>
            <Caption style={styles.centerText}>
              born: {props.birthDate.toDate().toLocaleDateString()}
            </Caption>
          </View>
        </View>
        <View style={styles.userDes}>
          <View style={[styles.seperator, borderColor]} />
          <Paragraph>
            {props.description ? props.description : "No description..."}
          </Paragraph>
        </View>
      </View>
    </Card>
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
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    marginHorizontal: 20,
  },
  avatarAndTitle: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "center",
  },
  userInfo: {
    flexDirection: "column",

    justifyContent: "center",
  },
  userDes: { width: "100%", alignItems: "center", justifyContent: "center" },
  centerText: { textAlign: "center" },
  seperator: {
    height: 1,
    borderBottomWidth: 1,
    width: "45%",
  },
});

export default ViewProfileInfo;
