import Center from "@/components/Center";
import DarkThemeSwitch from "@/components/DarkThemeSwitch";
import * as React from "react";
import { Button, Divider, Title } from "react-native-paper";

interface FreshScreenProps {
  navigation: any;
}

const FreshScreen: React.FC<FreshScreenProps> = ({ navigation }) => {
  return (
    <Center>
      <Title>Tab One</Title>
      <Button mode="contained">Press Me</Button>
      <Divider />
      <DarkThemeSwitch />
    </Center>
  );
};

export default FreshScreen;
