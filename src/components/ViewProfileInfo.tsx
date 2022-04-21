import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

interface ViewProfileInfoProps {}

const ViewProfileInfo: React.FC<ViewProfileInfoProps> = ({}) => {
  return (
    <View>
      <Avatar.Icon size={24} icon="folder" />
    </View>
  );
};
const styles = StyleSheet.create({});

export default ViewProfileInfo;
