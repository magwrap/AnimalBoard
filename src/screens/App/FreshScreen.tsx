import PostCard from "@/components/Fresh/PostCard";
import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Divider, Title } from "react-native-paper";

interface FreshScreenProps {
  navigation: any;
}

const FreshScreen: React.FC<FreshScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PostCard />
        <PostCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FreshScreen;
