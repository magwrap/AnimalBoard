import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { editUserInDB } from "@/hooks/firebase/User/FirestoreUser";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Timestamp } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput, Title, useTheme } from "react-native-paper";
import { DBUser } from "types";
import DatePicker from "./DatePicker";

interface ChangeNameDesBirthProps {
  hideModal: () => void;
}

const ChangeNameDesBirth: React.FC<ChangeNameDesBirthProps> = ({
  hideModal,
}) => {
  const [displayName, setDisplayName] = useState<DBUser["displayName"]>("");
  const [description, setDescription] = useState<DBUser["description"]>("");
  const user = useAppSelector((state) => state.CurrentUserReducer.currentUser);
  const nowDate = new Date();
  const thirteenYearsFromNow = nowDate.setFullYear(nowDate.getFullYear() - 13);
  const thirteenYearsFromNowPlsDay = thirteenYearsFromNow + 86400000;
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(thirteenYearsFromNowPlsDay)
  );

  const [editing, setEditing] = useState(false);

  const { colors } = useTheme();
  useLayoutEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setDescription(user.description);
      setDate(user.birthDate.toDate());
    }
  }, []);

  const _editProfile = async () => {
    if (displayName && date) {
      await editUserInDB(
        setEditing,
        displayName,
        description,
        Timestamp.fromDate(date)
      );
      Alert.alert(
        "Profile Edited",
        "Go to your profile to see the changes!",
        [{ text: "OK", onPress: hideModal }],
        { cancelable: true, onDismiss: hideModal }
      );
    }
  };
  if (displayName) {
    return (
      <View style={styles.container}>
        <Title>Change your profile info</Title>
        <MyTextInput
          label="Display Name"
          placeholder="This will be your !"
          value={displayName}
          onChangeText={setDisplayName}
          mode="outlined"
          maxLength={20}
          right={<TextInput.Affix text={`${displayName.length}/20`} />}
        />
        <MyTextInput
          label="Profile Description"
          placeholder="How do you want to be seen?"
          value={description}
          onChangeText={setDescription}
          multiline
          mode="outlined"
          maxLength={200}
          right={<TextInput.Affix text={`${description.length}/200`} />}
        />
        <DatePicker
          date={date}
          setDate={setDate}
          thirteenYearsFromNow={thirteenYearsFromNow}
        />
        <Button
          mode="contained"
          color={colors.accent}
          onPress={_editProfile}
          loading={editing}
          disabled={editing}>
          Submit Changes
        </Button>
      </View>
    );
  } else {
    return <MyActivityIndicator />;
  }
};
const styles = StyleSheet.create({
  container: {
    marginBottom: "10%",
  },
});

export default ChangeNameDesBirth;
