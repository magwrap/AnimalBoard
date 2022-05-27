import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchMyFeedThunk, sortFeed } from "@/state/slices/MyFeed";
import { getAuth } from "firebase/auth";
import { QueryDocumentSnapshot } from "firebase/firestore";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { DBUserPost, QueryDocUserPost } from "types";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import MySeperator from "../MyCustoms/MySeperator";
import PostCard from "../PostsAndProfile/PostCard";
import { incrementDisplayedPosts } from "@/hooks/reduxHooks";

interface ViewMyFeedProps {}

const ViewMyFeed: React.FC<ViewMyFeedProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState<QueryDocUserPost[]>([]);
  const myFeed = useAppSelector((state) => state.MyFeedReducer.myFeed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFeed(myFeed);
    setLoading(false);
  }, [myFeed]);

  const getNextFeedPage = () => {
    setLoading(true);
    console.log("next page");
    dispatch(incrementDisplayedPosts());
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
        {loading && <MyActivityIndicator />}
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
          <></>
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
