import {
  getUserPostsQueryFirst,
  getUserPostsQueryNext,
} from "@/hooks/useFirebase";
import { User } from "firebase/auth";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { DBUserPost } from "types";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import MySeperator from "../MyCustoms/MySeperator";
import PostCard from "./PostCard";

interface ViewUserPostsProps {
  uid: User["uid"];
  HeaderComponent?: JSX.Element;
}

const ViewUserPosts: React.FC<ViewUserPostsProps> = ({
  uid,
  HeaderComponent,
}) => {
  const [postsQuerySnapschot, setPostsQuerySnapschot] =
    useState<QuerySnapshot<DocumentData> | null>(null);
  const [fetching, setFetching] = useState(true);
  //TODO: dodac nasluchwanie postow uzytkownika ze jak sie zmienia to sie automatycznie rerenderuje

  useEffect(() => {
    getUserPostsQuery();
  }, [uid]);

  const getUserPostsQuery = async () => {
    if (uid) {
      const q = await getUserPostsQueryFirst(uid, setFetching);
      setPostsQuerySnapschot(q);
    }
  };
  //TODO: dodac paging
  const getNextUserPostsQuery = async () => {
    if (uid) {
      if (postsQuerySnapschot) {
        const lastVisible =
          postsQuerySnapschot.docs[postsQuerySnapschot.docs.length - 1];
        const q = await getUserPostsQueryNext(uid, lastVisible, setFetching);
        setPostsQuerySnapschot(q);
      }
    }
  };
  const _renderItem = ({
    item,
  }: {
    item: QueryDocumentSnapshot<DBUserPost>;
  }) => {
    const userId = item.ref.parent.parent?.id;
    if (userId) {
      return (
        <PostCard
          item={item}
          userId={userId}
          getUserPostsQuery={getUserPostsQuery}
        />
      );
    }
    return <></>;
  };

  if (fetching) {
    return <MyActivityIndicator />;
  }

  //TODO: dodac on end reached - pobiera nastepna strone - zajebac z wallpaper app
  if (postsQuerySnapschot && postsQuerySnapschot.docs !== undefined) {
    return (
      <FlatList
        data={postsQuerySnapschot?.docs}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => {}}
        ItemSeparatorComponent={() => <MySeperator />}
        ListEmptyComponent={() => <Paragraph>No posts yet...</Paragraph>}
        ListFooterComponent={<ListFooter />}
        ListHeaderComponent={HeaderComponent}
        showsVerticalScrollIndicator={false}
      />
    );
  }
  return <Paragraph>Something went wrong...</Paragraph>;
};

export default ViewUserPosts;

const ListFooter = () => {
  return <View style={{ padding: 5, height: 100 }} />;
};
