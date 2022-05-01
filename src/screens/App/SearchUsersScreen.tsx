import Center from "@/components/Center";
import SearchUserItem from "@/components/Fresh/SearchUserItem";
import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import {
  searchUser,
  serachUserNext,
} from "@/hooks/firebase/User/FirestoreSearchUser";
import { FontSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Appbar,
  Colors,
  Paragraph,
  Searchbar,
  useTheme,
} from "react-native-paper";
import { QueryDocUser } from "types";

interface SearchUsersScreenProps {}

const SearchUsersScreen: React.FC<SearchUsersScreenProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [usersPerPage] = useState(50);
  const [fetching, setFetching] = useState(false);
  const [usersData, setUsersData] = useState<{
    users: QueryDocUser[];
    lastVisible: QueryDocUser | null;
  }>({
    users: [],
    lastVisible: null,
  });
  const [lastUser, setLastUser] = useState(false);
  const { colors, roundness } = useTheme();
  const textInputRef = useRef<TextInput | null>(null);
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();

  const _goBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const borderRadius = { borderRadius: roundness };
  const backgroundColor = { backgroundColor: colors.background };
  const textColor = { color: colors.text };
  const placeholderColor = Colors.grey500;

  useEffect(() => {
    textInputRef.current?.focus();
  }, [isFocused]);

  const triggerEndOfUsers = () => {
    setLastUser(true);
  };

  const updateUsers = (users: QueryDocUser[], lastVisible: QueryDocUser) => {
    setUsersData({
      users: users,
      lastVisible,
    });
  };

  const onChangeText = (text: string) => {
    setSearch(text);
    if (text) {
      searchUser(
        text.trim().toUpperCase(),
        usersPerPage,
        setFetching,
        updateUsers
      );
    }
  };

  const getNextUserPage = () => {
    if (search.trim() && usersData.lastVisible && !lastUser) {
      serachUserNext(
        search.trim(),
        usersPerPage,
        usersData.lastVisible,
        setFetching,
        updateUsers,
        triggerEndOfUsers
      );
    }
  };

  const _renderItem = useCallback(({ item }: { item: QueryDocUser }) => {
    return <SearchUserItem userItem={item} />;
  }, []);

  const ListFooter = () => {
    return (
      <View style={{ padding: 5, height: 100 }}>
        {fetching && <MyActivityIndicator />}
      </View>
    );
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeText}
          value={search}
          style={[styles.searchbar]}
          autoComplete
        />
      </Appbar.Header>
      <FlatList
        data={usersData.users}
        keyExtractor={(item: QueryDocUser) => item.id}
        renderItem={_renderItem}
        onEndReached={getNextUserPage}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ItemSeparatorComponent={() => <MySeperator />}
        ListEmptyComponent={() =>
          fetching ? (
            <></>
          ) : (
            <Center>
              <Paragraph>Search Users...</Paragraph>
            </Center>
          )
        }
        ListFooterComponent={<ListFooter />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    marginRight: "1%",
  },
  seperator: { borderBottomWidth: 1 },
});

export default SearchUsersScreen;

const MySeperator = () => {
  return <View style={styles.seperator}></View>;
};
