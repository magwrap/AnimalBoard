import { cardStyles } from "@/styles/Card/cardStyles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Caption, Card, Title } from "react-native-paper";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";

interface EmptyPostCardProps {}

const EmptyPostCard: React.FC<EmptyPostCardProps> = ({}) => {
  return (
    <Card style={cardStyles.container}>
      <Card.Title title="" style={cardStyles.user} />
      <Card.Content>
        <Title> </Title>
      </Card.Content>
      <View style={[cardStyles.cover, cardStyles.coverReplacement]}>
        <MyActivityIndicator />
      </View>
      <Card.Actions>
        <Caption> </Caption>
      </Card.Actions>
    </Card>
  );
};
const styles = StyleSheet.create({});

export default EmptyPostCard;
