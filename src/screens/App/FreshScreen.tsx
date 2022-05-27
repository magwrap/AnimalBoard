import ViewMyFeed from "@/components/Fresh/ViewMyFeed";
import MyHeader from "@/components/Header/MyHeader";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

interface FreshScreenProps {}

const FreshScreen: React.FC<FreshScreenProps> = ({}) => {
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({ tabBarBadge: false });
    }
  }, [isFocused]);

  const { currentUser } = getAuth();

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader more search />
      {currentUser ? <ViewMyFeed /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FreshScreen;

// const scrollRef = React.useRef(null);
// const navigation = useNavigation();
// useScrollToTop(
//   React.useRef({
//     scrollToTop: () => scrollRef.current?.scrollToOffset({ offset: -100 }),
//   })
// );
// React.useEffect(() => {
//   const unsubscribe = navigation.addListener("tabPress", (e) => {
//     // Prevent default behavior

//     e.preventDefault();
//     if (scrollRef.current) {
//       useScrollToTop(scrollRef);
//     }
//   });

//   return unsubscribe;
// }, [navigation]);
