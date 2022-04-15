import React from "react";
import Text from "react-native-paper";

interface MyTextProps {
  text: string;
  style: object;
}

const MyText: React.FC<MyTextProps> = ({ text, style }) => {
  return <Text style={style}>{text}</Text>;
};

export default MyText;
