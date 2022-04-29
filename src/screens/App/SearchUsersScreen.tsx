import { FontSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { Appbar, Colors, useTheme } from "react-native-paper";

interface SearchUsersScreenProps {}

const SearchUsersScreen: React.FC<SearchUsersScreenProps> = ({}) => {
  const [search, setSearch] = useState("");
  const { colors, roundness } = useTheme();
  const textInputRef = useRef<TextInput | null>(null);
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();
  const _goBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const borderRadius = { borderRadius: roundness };
  const backgroundColor = { backgroundColor: colors.background };
  const textColor = { color: colors.text };
  const placeholderColor = Colors.grey500;

  useEffect(() => {
    textInputRef.current?.focus();
  }, [isFocused]);
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <View style={[styles.inputContainer, borderRadius, backgroundColor]}>
          <TextInput
            ref={textInputRef}
            style={[styles.input, textColor]}
            value={search}
            onChangeText={setSearch}
            placeholder="search"
            placeholderTextColor={placeholderColor}
          />
        </View>
      </Appbar.Header>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginRight: "1%",
  },
  input: {
    padding: "2%",
    fontSize: FontSizes.MEDIUM,
  },
});

export default SearchUsersScreen;
