import { cardStyles } from "@/styles/Card/profileInfoCard";
import { IconSizes } from "@/styles/Fonts";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Caption,
  Card,
  Paragraph,
  Subheading,
  useTheme,
} from "react-native-paper";
import { DBUser } from "types";

type ViewProfileInfoProps = Omit<DBUser, "emailVerified">;

const ViewProfileInfo: React.FC<ViewProfileInfoProps> = (props) => {
  const { colors } = useTheme();
  const borderColor = { borderColor: colors.accent };

  return (
    <Card style={[cardStyles.container, { marginBottom: 2 }]}>
      <View>
        <View style={styles.top}>
          <View style={styles.avatarAndTitle}>
            {props.avatar ? (
              <Avatar.Image
                source={{ uri: props.avatar }}
                size={IconSizes.GIGANT}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Icon icon={"account"} size={IconSizes.GIGANT} />
            )}
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
