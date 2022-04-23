import MyHeader from "@/components/Header/MyHeader";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

interface FreshScreenProps {}

const FreshScreen: React.FC<FreshScreenProps> = ({}) => {
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();
  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({ tabBarBadge: false });
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader more search />
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
