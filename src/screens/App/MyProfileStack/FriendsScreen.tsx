import Center from "@/components/Center";
import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import FriendUserItem from "@/components/MyProfile/FriendUserItem";
import { getUserFollowingQuery } from "@/hooks/firebase/User/Following/FirestoreUserFollowing";
import { getAuth } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { QueryDocFollowing } from "types";

interface FriendsScreenProps {}

const FriendsScreen: React.FC<FriendsScreenProps> = ({}) => {
  const [followedPerPage] = useState(50);
  const [fetching, setFetching] = useState(false);
  const [following, setFollowing] = useState<{
    followingData: QueryDocFollowing[];
    lastVisible: QueryDocFollowing | null;
  }>({
    followingData: [],
    lastVisible: null,
  });
  const [uid, setUid] = useState("");

  useEffect(() => {
    const { currentUser } = getAuth();
    if (currentUser) {
      setUid(currentUser.uid);
      getFollowingPage(currentUser.uid);
    }
  }, []);

  const updateFollowed = (
    followingData: QueryDocFollowing[],
    lastVisible: QueryDocFollowing
  ) => {
    setFollowing({
      followingData,
      lastVisible,
    });
  };

  const getFollowingPage = (uid: string) => {
    getUserFollowingQuery(uid, followedPerPage, setFetching, updateFollowed);
  };

  const _renderItem = useCallback(({ item }: { item: QueryDocFollowing }) => {
    return <FriendUserItem followedUser={item} />;
  }, []);

  const ListFooter = () => {
    return (
      <View style={{ padding: 5, height: 100 }}>
        {fetching && <MyActivityIndicator />}
      </View>
    );
  };

  return (
    <FlatList
      data={following.followingData}
      keyExtractor={(item: QueryDocFollowing) => item.id}
      renderItem={_renderItem}
      onEndReached={() => getFollowingPage(uid)}
      onEndReachedThreshold={0.01}
      scrollEventThrottle={150}
      ItemSeparatorComponent={() => <MySeperator />}
      ListEmptyComponent={() =>
        fetching ? (
          <></>
        ) : (
          <Center>
            <Paragraph style={{ textAlign: "center", marginTop: "10%" }}>
              You have no friends...
            </Paragraph>
          </Center>
        )
      }
      ListFooterComponent={<ListFooter />}
      showsVerticalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({
  searchbar: {
    margin: "2%",
  },
  seperator: { borderBottomWidth: 1 },
});

const MySeperator = () => {
  return <View style={styles.seperator}></View>;
};

export default FriendsScreen;
