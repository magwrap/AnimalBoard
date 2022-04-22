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
import { FlatList } from "react-native";
import { Paragraph } from "react-native-paper";
import { DBUserPost } from "typesWithImports";
import MyActivityIndicator from "./MyCustoms/MyActivityIndicator";
import PostCard from "./PostCard";

interface ViewUserPostsProps {
  user: User;
}

const ViewUserPosts: React.FC<ViewUserPostsProps> = ({ user }) => {
  const [postsQuerySnapschot, setPostsQuerySnapschot] =
    useState<QuerySnapshot<DocumentData> | null>(null);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    getUserPostsQuery();
  }, [user]);

  const getUserPostsQuery = async () => {
    if (user) {
      const q = await getUserPostsQueryFirst(user.uid, setFetching);
      setPostsQuerySnapschot(q);
    }
  };

  const getNextUserPostsQuery = async () => {
    if (user) {
      if (postsQuerySnapschot) {
        const lastVisible =
          postsQuerySnapschot.docs[postsQuerySnapschot.docs.length - 1];
        const q = await getUserPostsQueryNext(
          user.uid,
          lastVisible,
          setFetching
        );
        setPostsQuerySnapschot(q);
      }
    }
  };
  const _renderItem = ({
    item,
  }: {
    item: QueryDocumentSnapshot<DBUserPost>;
  }) => {
    const itemData = item.data();
    if (user) {
      return <PostCard {...itemData} user={user} />;
    }
    return <></>;
  };

  if (fetching) {
    return <MyActivityIndicator />;
  }
  //TODO: dodac on end reached - pobiera nastepna strone
  if (postsQuerySnapschot && postsQuerySnapschot.docs !== undefined) {
    return (
      <FlatList
        data={postsQuerySnapschot?.docs}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => {}}
      />
    );
  }
  return <Paragraph>Something went wrong...</Paragraph>;
};

export default ViewUserPosts;
