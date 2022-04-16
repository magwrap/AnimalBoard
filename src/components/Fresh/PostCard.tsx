import React from "react";
import { StyleSheet } from "react-native";
import {
  Avatar,
  Caption,
  Card,
  Divider,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";

interface PostCardProps {}
// nazwa, photoUrl, opis, data_powstania, data_edycji
const PostCard: React.FC<PostCardProps> = ({}) => {
  const LeftContent = (props: object) => (
    <Avatar.Icon {...props} icon="account" />
  );

  return (
    <>
      <Card style={styles.container} mode="elevated">
        <Card.Title
          title="Nazwa uzytkownika"
          left={LeftContent}
          style={[styles.user]}
        />
        <Card.Content>
          <Title>Nazwa</Title>
          <Paragraph>Opis</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions style={styles.actions}>
          <Caption>Data powstania</Caption>
          <Caption>Data edycji</Caption>
        </Card.Actions>
      </Card>
      <Divider />
      <Divider />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    // borderBottomWidth: 2, borderBottomColor: "#000"
  },
  user: {},
  actions: { justifyContent: "space-around" },
});

export default PostCard;
