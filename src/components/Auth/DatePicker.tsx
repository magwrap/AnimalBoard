import { StyleSheet } from "react-native";
import * as React from "react";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { MyColors } from "@/styles/ColorPallete";

interface DatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  error: boolean;
  thirteenYearsFromNow: number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
  error,
  thirteenYearsFromNow,
}) => {
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

  const buttonColor = error ? MyColors.WARNING : undefined;

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined"
        style={styles.buttonStyle}
        contentStyle={styles.buttonContentStyle}
        color={buttonColor}>
        Pick date
      </Button>

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
});

export default DatePicker;
