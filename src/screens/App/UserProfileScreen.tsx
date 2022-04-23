import ViewProfileInfo from "@/components/PostsAndProfile/ViewProfileInfo";
import ViewUserPosts from "@/components/PostsAndProfile/ViewUserPosts";
import { getUserFromDB } from "@/hooks/useFirebase";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    navigation.setParams({
      name: user?.displayName,
    });
  }, [user]);

  const _fetchUser = async () => {
    const fetchedUser = await getUserFromDB(uid);
    setUser(fetchedUser);
  };
  return (
    <View style={styles.container}>
      {/* {user?.displayName !== undefined ? (
        <ViewProfileInfo
          {...{
            avatar: user?.avatar,
            birthDate: user?.birthDate,
            description: user?.description,
            email: user?.email,
          }}
        />
      ) : null} */}
      {uid && user?.displayName !== undefined ? (
        <ViewUserPosts
          uid={uid}
          headerComponent={<ViewProfileInfo {...user} />}
        />
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
