import Center from "@/components/Center";
import * as React from "react";
import { Divider, Title } from "react-native-paper";

interface CameraScreenProps {
  navigation: any;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  return (
    <Center>
      <Title>Tab Two</Title>
      <Divider />
    </Center>
  );
};

export default CameraScreen;
