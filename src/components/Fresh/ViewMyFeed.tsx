import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchMyFeedThunk } from "@/state/slices/MyFeed";
import { getAuth } from "firebase/auth";
import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { DBUserPost, QueryDocUserPost } from "types";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import MySeperator from "../MyCustoms/MySeperator";
import EmptyPostCard from "../PostsAndProfile/EmptyPostCard";
import PostCard from "../PostsAndProfile/PostCard";
import { clearFeed } from "@/hooks/reduxHooks";

interface ViewMyFeedProps {}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ViewMyFeed: React.FC<ViewMyFeedProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState<QueryDocUserPost[]>([]);
  const { myFeed, endReached } = useAppSelector((state) => state.MyFeedReducer);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { currentUser } = getAuth();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    if (currentUser) {
      dispatch(clearFeed());
      dispatch(fetchMyFeedThunk(currentUser.uid));
    }
    wait(2000).then(() => setRefreshing(false));
    setLoading(false);
  }, []);

  useEffect(() => {
    takeCareOfFeed();
  }, [myFeed]);

  // useEffect(() => {
  //   console.log("log");
  //   (async () => {
  //     if (feed) {
  //       const sorted = await sortFeed([...feed]);
  //       setFeed(sorted);
  //     }
  //   })();
  // }, [feed.length]);
  //overcomplicated and not working properly but im too dumb to solve it
  const takeCareOfFeed = async () => {
    const sortedFeed = await sortFeed([...myFeed]);
    // const originalFeed = await removeDuplicates([...sortedFeed]);
    // setFeed(originalFeed);
    setFeed(sortedFeed);
    setLoading(false);
  };

  const sortFeed = async (feed: QueryDocUserPost[]) => {
    feed.sort((x, y) => {
      return y.data().editionDate.toMillis() - x.data().editionDate.toMillis();
    });
    return removeDuplicates(feed);
  };

  const removeDuplicates = async (feed: QueryDocUserPost[]) => {
    //TODO: wazna funkcja trzeba to zrobic...
    const originalFeed = feed.filter((post, index, arr) => {
      return arr.map((post2, index2) => {
        if (post.id === post2.id && index !== index2) {
          return false;
        }
        return true;
      });
    });
    return originalFeed;
  };

  const getNextFeedPage = () => {
    setLoading(true);
    if (currentUser?.uid) {
      dispatch(fetchMyFeedThunk(currentUser.uid));
    }
  };

  const _renderItem = useCallback(
    ({ item }: { item: QueryDocumentSnapshot<DBUserPost> }) => {
      const userId = item.ref.parent.parent?.id;
      if (userId) {
        return <PostCard item={item} userId={userId} feed />;
      }
      return <View style={{ height: 500 }}></View>;
    },
    [feed]
  );
  const ListFooter = () => {
    return (
      <View style={{ padding: 5, height: 100 }}>
        {loading && !endReached ? <MyActivityIndicator /> : null}
      </View>
    );
  };
  return (
    <FlatList
      data={feed}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={getNextFeedPage}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ItemSeparatorComponent={() => <MySeperator />}
      ListEmptyComponent={() =>
        loading || refreshing ? (
          <>
            <EmptyPostCard />
            <EmptyPostCard />
          </>
        ) : (
          <Paragraph style={{ textAlign: "center", marginTop: "10%" }}>
            No posts found...{"\n"}Add someone to friends to see theirs new
            posts!
          </Paragraph>
        )
      }
      ListFooterComponent={<ListFooter />}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};
const styles = StyleSheet.create({});

export default ViewMyFeed;
