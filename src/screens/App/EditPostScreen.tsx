import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import Layout from "@/constants/Layout";
import {
  editPostInDB,
  getPostFromDB,
} from "@/hooks/firebase/Posts/FirestorePostsCrud";
import { toggleEditSnackBar, useAppDispatch } from "@/hooks/reduxHooks";
import { cardStyles } from "@/styles/Card/cardStyles";
import { useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Caption,
  Card,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { DBUserPost } from "types";

interface EditPostScreenProps {
  route: {
    params: {
      postPath: string;
    };
  };
}

const EditPostScreen: React.FC<EditPostScreenProps> = ({ route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState<DBUserPost | null>(null);
  const [loading, setLoading] = useState(false);
  const now = new Date();
  const path = route.params.postPath;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    (async () => {
      const post = await getPostFromDB(path);
      if (post) {
        setTitle(post.title);
        setDescription(post.description);
        setPost(post);
      }
    })();
  }, [route.params.postPath]);
  const _editPost = async () => {
    if (post) {
      await editPostInDB({
        title,
        description,
        photoURL: post?.photoURL,
        creationDate: post.creationDate,
        editionDate: Timestamp.fromDate(now),
        postPath: path,
        setLoading,
      });
      dispatch(toggleEditSnackBar());
      navigation.goBack();
    }
  };

  if (!post) {
    return <MyActivityIndicator />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={cardStyles.container} mode="elevated">
          <Card.Content>
            <Button
              mode="contained"
              onPress={_editPost}
              loading={loading}
              disabled={loading}>
              Save Changes
            </Button>
            <View style={cardStyles.text}>
              <MyTextInput
                mode="outlined"
                label="title"
                value={title}
                onChangeText={setTitle}
                placeholder="No title yet"
                maxLength={25}
                right={<TextInput.Affix text={`${title.length}/25`} />}
              />
              <MyTextInput
                mode="outlined"
                label="description"
                value={description}
                onChangeText={setDescription}
                placeholder="No description yet"
                multiline
              />
            </View>
          </Card.Content>
          <Card.Cover source={{ uri: post.photoURL }} style={[styles.cover]} />

          <Card.Actions style={[cardStyles.actions]}>
            <View>
              <Caption>
                Created: {post.creationDate.toDate().toLocaleDateString()}
              </Caption>
              <Caption>
                {post.creationDate.toDate().toLocaleTimeString()}
              </Caption>
            </View>
            <View>
              <Caption>Edited: {now.toLocaleDateString()}</Caption>
              <Caption>{now.toLocaleTimeString()}</Caption>
            </View>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, height: "100%" },

  cover: { width: "100%", height: Layout.window.height * 0.8 },
});

export default EditPostScreen;
