import ViewProfileInfo from "@/components/PostsAndProfile/ViewProfileInfo";
import ViewUserPosts from "@/components/PostsAndProfile/ViewUserPosts";
import { getUserFromDB } from "@/hooks/firebase/User/FirestoreUser";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { DBUser } from "types";

interface UserProfileScreenProps {
  route: {
    params: {
      uid: string;
    };
  };
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ route }) => {
  const [user, setUser] = useState<DBUser | null>(null);

  const uid = route.params.uid;
  const navigation = useNavigation();

  useEffect(() => {
    _fetchUser();
  }, []);
  useLayoutEffect(() => {
    navigation.setParams({
      name: user?.displayName,
    });
  }, [user]);

  const _fetchUser = async () => {
    const fetchedUser = await getUserFromDB(uid);
    setUser(fetchedUser);
  };
  const HeaderComponent = () => {
    return user ? <ViewProfileInfo {...user} /> : <></>;
  };
  return (
    <View style={styles.container}>
      {uid && user?.displayName !== undefined ? (
        <ViewUserPosts uid={uid} HeaderComponent={<HeaderComponent />} />
      ) : (
        <Paragraph>blad</Paragraph>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default UserProfileScreen;
