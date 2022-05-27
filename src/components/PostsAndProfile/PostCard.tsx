import { removePostFromDB } from "@/hooks/firebase/Posts/FirestorePostsCrud";
import { getUserFromDB } from "@/hooks/firebase/User/FirestoreUser";
import { toggleRemoveSnackBar, useAppDispatch } from "@/hooks/reduxHooks";
import { AppScreenNames } from "@/navigation/ScreenNames";
import { cardStyles } from "@/styles/Card/cardStyles";
import { MyColors } from "@/styles/ColorPallete";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth, User } from "firebase/auth";
import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";

import {
  Avatar,
  Button,
  Caption,
  Card,
  Divider,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import { DBUser, DBUserPost } from "types";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import PhotoZoomModal from "./PhotoZoomModal";

// nazwa, photoUrl, opis, data_powstania, data_edycji
interface PostCardProps {
  item: QueryDocumentSnapshot<DBUserPost>;
  userId: User["uid"];
  feed: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ item, userId, feed = false }) => {
  const [user, setUser] = useState<DBUser | null>();
  const [visible, setVisible] = React.useState(false);
  const [keepVisible, setKeepVisible] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setKeepVisible(true);
  };
  const dontKeepModal = () => setKeepVisible(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    _fetchUser();
  }, []);

  const { title, description, photoURL, editionDate }: DBUserPost = item.data();

  const onLongPress = () => {
    showModal();
    dontKeepModal();
  };
  const _fetchUser = async () => {
    const fetchedUser = await getUserFromDB(userId);
    setUser(fetchedUser);
  };

  const _viewUserProfile = (uid: string) => {
    // if (route.params.uid !== uid) {
    navigation.navigate(AppScreenNames.USER_PROFILE_SCREEN, {
      uid,
    });
    // }
  };

  const _removePost = () => {
    //TODO: zamiast alerta dac snackbar
    Alert.alert(
      "Warning!",
      "Are you sure you want to permanently delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await removePostFromDB(item.ref.path, photoURL, setLoading);
            dispatch(toggleRemoveSnackBar());
          },
          style: "destructive",
        },
      ]
    );
  };

  const _editPost = () => {
    navigation.navigate(AppScreenNames.EDIT_POST_SCREEN, {
      postPath: item.ref.path,
    });
  };

  const LeftContent = (props: object) => {
    if (user) {
      return (
        <Pressable onPress={() => _viewUserProfile(userId)}>
          <Avatar.Image {...props} source={{ uri: user.avatar }} />
        </Pressable>
      );
    }
    return <Avatar.Icon {...props} icon="account" />;
  };
  const RightContent = (props: object) => {
    const auth = getAuth();
    if (feed) {
      return <></>;
    }
    if (userId === auth.currentUser?.uid) {
      return (
        <View style={cardStyles.crudButtons}>
          <Button
            compact
            mode="contained"
            style={cardStyles.crudButton}
            color={colors.accent}
            onPress={_editPost}>
            edit
          </Button>
          <Button
            compact
            mode="contained"
            style={cardStyles.crudButton}
            color={MyColors.WARNING}
            onPress={_removePost}>
            remove
          </Button>
        </View>
      );
    }
    return <></>;
  };

  if (loading) {
    return (
      <Card style={cardStyles.container}>
        <Card.Title title="" style={cardStyles.user} />
        <Card.Content>
          <Title> </Title>
        </Card.Content>
        <View style={[cardStyles.cover, cardStyles.coverReplacement]}>
          <MyActivityIndicator />
        </View>
        <Card.Actions>
          <Caption> </Caption>
        </Card.Actions>
      </Card>
    );
  }

  return (
    <Card style={cardStyles.container} mode="elevated">
      <Card.Title
        title={user ? user.displayName : "user"}
        left={LeftContent}
        style={[cardStyles.user]}
        right={RightContent}
      />
      <Divider />
      <Card.Content>
        <View style={cardStyles.text}>
          {title ? <Title>{title}</Title> : null}
          {description ? <Paragraph>{description}</Paragraph> : null}
        </View>
      </Card.Content>
      <PhotoZoomModal
        visible={visible}
        hideModal={hideModal}
        photoURL={photoURL}
      />
      <Pressable
        // onPressIn={showModal}
        delayLongPress={100}
        onLongPress={onLongPress}
        onPressOut={keepVisible ? () => {} : hideModal}>
        {visible ? (
          <View style={[cardStyles.cover, cardStyles.coverReplacement]} />
        ) : (
          <Card.Cover source={{ uri: photoURL }} style={[cardStyles.cover]} />
        )}
      </Pressable>
      <Card.Actions style={cardStyles.actions}>
        <Caption>
          {editionDate.toDate().toLocaleTimeString([], {
            // hour: "2-digit",
            // minute: "2-digit",
            // hourCycle: "h24",
          })}
          {" - "}
          {editionDate.toDate().toLocaleDateString()}
        </Caption>
      </Card.Actions>
    </Card>
  );
};

export default PostCard;
