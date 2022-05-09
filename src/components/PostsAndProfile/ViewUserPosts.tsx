import {
  getUserPosts,
  getUserPostsNext,
} from "@/hooks/firebase/Posts/FirestoreUserPosts";
import { User } from "firebase/auth";
import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { DBUserPost, QueryDocUserPost } from "types";
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
  const [posts, setPosts] = useState<{
    postsData: QueryDocUserPost[];
    lastVisible: QueryDocUserPost | null;
  }>({ postsData: [], lastVisible: null });
  const [fetching, setFetching] = useState(true);
  const [postsPerPage] = useState(10);
  const [lastPost, setLastPost] = useState(false);
  useEffect(() => {
    getUserPostsSnapschot();
  }, [uid]);

  const updatePosts = (
    postsData: QueryDocUserPost[],
    lastVisible: QueryDocUserPost
  ) => {
    setPosts({
      postsData: posts?.postsData.concat(postsData),
      lastVisible,
    });
  };

  const triggerEndOfPosts = () => {
    setLastPost(true);
  };

  const getUserPostsSnapschot = async () => {
    if (uid) {
      await getUserPosts(uid, postsPerPage, setFetching, updatePosts);
    }
  };

  const getNextUserPostsSnapschot = async () => {
    if (posts?.postsData && posts.lastVisible && uid && !lastPost) {
      console.log("next");
      await getUserPostsNext(
        uid,
        postsPerPage,
        posts.lastVisible,
        setFetching,
        updatePosts,
        triggerEndOfPosts
      );
    }
  };
  const _renderItem = useCallback(
    ({ item }: { item: QueryDocumentSnapshot<DBUserPost> }) => {
      const userId = item.ref.parent.parent?.id;
      if (userId) {
        return <PostCard item={item} userId={userId} />;
      }
      return <View style={{ height: 500 }}></View>;
    },
    [posts?.postsData]
  );
  const ListFooter = () => {
    return (
      <View style={{ padding: 5, height: 100 }}>
        {fetching && <MyActivityIndicator />}
      </View>
    );
  };

  if (posts?.postsData) {
    return (
      <FlatList
        data={posts.postsData}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={getNextUserPostsSnapschot}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ItemSeparatorComponent={() => <MySeperator />}
        ListEmptyComponent={() =>
          fetching ? (
            <></>
          ) : (
            <Paragraph style={{ textAlign: "center" }}>
              No posts yet...
            </Paragraph>
          )
        }
        ListFooterComponent={<ListFooter />}
        ListHeaderComponent={HeaderComponent}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  if (fetching) {
    return <MyActivityIndicator />;
  }
  return <Paragraph>Something went wrong...</Paragraph>;
};

export default ViewUserPosts;

//na podstawie: https://youtu.be/huJhkqED0ig
