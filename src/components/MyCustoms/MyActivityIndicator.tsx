import React from "react";
import { ActivityIndicator } from "react-native-paper";

interface MyActivityIndicatorProps {}

const MyActivityIndicator: React.FC<MyActivityIndicatorProps> = ({}) => {
  return <ActivityIndicator size="small" />;
};

export default MyActivityIndicator;
