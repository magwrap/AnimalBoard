import { getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import ViewUserPosts from "@/components/ViewUserPosts";

interface MyProfilePostsScreenProps {}

const MyProfilePostsScreen: React.FC<MyProfilePostsScreenProps> = ({}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Paragraph>
        Moje Posty fetchuje i je wyswietla, jest opcja edycji i usuniecia
      </Paragraph>

      {currentUser ? <ViewUserPosts user={currentUser} /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyProfilePostsScreen;
