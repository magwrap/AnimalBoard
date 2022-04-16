import { StyleSheet, View } from "react-native";
import * as React from "react";
import { Button, Caption, Paragraph } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { MyColors } from "@/styles/ColorPallete";

interface DatePickerProps {}

const DatePicker: React.FC<DatePickerProps> = ({}) => {
  const nowDate = new Date();
  const thirteenYearsFromNow = nowDate.setFullYear(nowDate.getFullYear() - 13);
  const thirteenYearsFromNowPlsDay = thirteenYearsFromNow + 86400000;

  const [date, setDate] = React.useState<Date | undefined>(
    new Date(thirteenYearsFromNowPlsDay)
  );
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined"
        style={styles.buttonStyle}
        contentStyle={styles.buttonContentStyle}>
        Pick date
      </Button>
      <View style={styles.dateField}>
        <View style={styles.date}>
          <Paragraph>Date of birth: </Paragraph>
          <Paragraph>{date ? date?.toLocaleDateString() : "..."}</Paragraph>
        </View>
        <Caption>You must be over 13 years old in order to sign up</Caption>
      </View>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        validRange={{
          startDate: new Date(1900, 1, 2), // optional
          endDate: new Date(thirteenYearsFromNow), // optional
          disabledDates: [new Date()], // optional
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  buttonStyle: { margin: 5 },
  buttonContentStyle: { width: "100%" },
  dateField: {
    margin: 5,
  },
  date: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});

export default DatePicker;
