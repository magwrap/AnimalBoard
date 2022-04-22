import PostCard from "@/components/PostCard";
import MyHeader from "@/components/MyHeader";
import * as React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Divider, Title } from "react-native-paper";
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

interface FreshScreenProps {}

const FreshScreen: React.FC<FreshScreenProps> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader showButtonsOnRight />
      <ScrollView
      // ref={scrollRef}
      >
        {/* <PostCard />
        <PostCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: STATUS_BAR_HEIGHT,
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
