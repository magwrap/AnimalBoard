import PostCard from "@/components/Fresh/PostCard";
import DarkThemeSwitch from "@/components/MyProfile/DarkThemeSwitch";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Paragraph } from "react-native-paper";

interface CustomizeProfileScreenProps {}

const CustomizeProfileScreen: React.FC<CustomizeProfileScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Paragraph>
        Moje Posty fetchuje i je wyswietla, jest opcja edycji i usuniecia
      </Paragraph>
      <PostCard />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomizeProfileScreen;
