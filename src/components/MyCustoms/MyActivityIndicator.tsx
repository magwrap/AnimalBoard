import React from "react";
import { ActivityIndicator } from "react-native-paper";

interface MyActivityIndicatorProps {
  style?: object;
}

const MyActivityIndicator: React.FC<MyActivityIndicatorProps> = (props) => {
  return <ActivityIndicator {...props} size="small" />;
};

export default MyActivityIndicator;
