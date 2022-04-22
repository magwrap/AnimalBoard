import Layout from "@/constants/Layout";
import { getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import {
  Avatar,
  Caption,
  Card,
  Divider,
  Paragraph,
  Title,
} from "react-native-paper";
import { DBUserPost } from "typesWithImports";

// nazwa, photoUrl, opis, data_powstania, data_edycji
const PostCard: React.FC<DBUserPost & { user: User }> = ({
  photoURL,
  title,
  description,
  creationDate,
  editionDate,
  user,
}) => {
  const [coverSize, setCoverSize] = useState({
    height: Layout.window.width,
    width: Layout.window.width,
  });
  const LeftContent = (props: object) => (
    <Avatar.Image {...props} source={{ uri: user.photoURL }} />
  );
  const RightContent = (props: object) => {
    const auth = getAuth();
    if (user.uid === auth.currentUser?.uid) {
      return <Paragraph>edit, remove</Paragraph>;
    }
    return <></>;
  };

  useEffect(() => {
    Image.getSize(photoURL, (width, height) => {
      setCoverSize({ height: height / 2, width: width / 2 });
    });
  }, []);

  return (
    <>
      <Card style={styles.container} mode="elevated">
        <Card.Title
          title={user.displayName}
          left={LeftContent}
          style={[styles.user]}
          right={RightContent}
        />
        <Card.Content>
          {title ? <Title>{title}</Title> : null}
          {description ? <Paragraph>{description}</Paragraph> : null}
        </Card.Content>
        <Card.Cover
          source={{ uri: photoURL }}
          style={[
            styles.cover,
            { height: coverSize.height, width: coverSize.width },
          ]}
        />
        <Card.Actions style={styles.actions}>
          <Caption>
            created: {creationDate.toDate().toLocaleDateString()}
          </Caption>
          <Caption>
            last edit: {editionDate.toDate().toLocaleDateString()}
          </Caption>
        </Card.Actions>
      </Card>
      <View style={styles.seperator} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    // borderBottomWidth: 2, borderBottomColor: "#000"
  },
  user: {},
  cover: { height: 100 },

  actions: { justifyContent: "space-around" },
  seperator: { height: "1%" },
});

export default PostCard;
