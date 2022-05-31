import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchMyFeedThunk } from "@/state/slices/MyFeed";
import { getAuth } from "firebase/auth";
import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { DBUserPost, QueryDocUserPost } from "types";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import MySeperator from "../MyCustoms/MySeperator";
import EmptyPostCard from "../PostsAndProfile/EmptyPostCard";
import PostCard from "../PostsAndProfile/PostCard";

interface ViewMyFeedProps {}

const ViewMyFeed: React.FC<ViewMyFeedProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState<QueryDocUserPost[]>([]);
  const { myFeed, endReached } = useAppSelector((state) => state.MyFeedReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    takeCareOfFeed();
  }, [myFeed]);
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
    return feed;
  };

  const removeDuplicates = async (feed: QueryDocUserPost[]) => {
    console.log("feed: ", feed.length);
    const orign = feed.filter((postF, indexF, arr) => {
      let dupliacte = arr.map((postM, indexM) => {
        if (indexF !== indexM && postF.id === postM.id) {
          return true;
        }
        return false;
      });
      return dupliacte;
    });
    console.log("filtered: ", orign.length);
    return orign;
  };

  const getNextFeedPage = () => {
    setLoading(true);
    const { currentUser } = getAuth();
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
        loading ? (
          <>
            <EmptyPostCard />
            <EmptyPostCard />
          </>
        ) : (
          <Paragraph style={{ textAlign: "center" }}>No posts yet...</Paragraph>
        )
      }
      ListFooterComponent={<ListFooter />}
      showsVerticalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({});

export default ViewMyFeed;
