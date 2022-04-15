import React from "react";
import Text from "react-native-paper";

interface MyTextProps {
  children: React.ReactNode;
  style: object;
}

const MyText: React.FC<MyTextProps> = (props) => {
  return <Text {...props}>{props.children}</Text>;
};

export default MyText;
