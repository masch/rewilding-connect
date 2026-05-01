import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useLocale } from "../hooks/useI18n";
import { getNativeLocale } from "../logic/formatters";

interface AppDateTimePickerProps {
  value: Date;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: "date" | "time" | "datetime";
  display?: "default" | "spinner" | "calendar" | "clock";
  testID?: string;
}

/**
 * A thin wrapper around @react-native-community/datetimepicker
 * that automatically handles locale resolution using the project's standards.
 */
export function AppDateTimePicker({
  value,
  onChange,
  minimumDate,
  maximumDate,
  mode = "date",
  display = "default",
  testID,
}: AppDateTimePickerProps) {
  const { locale } = useLocale();

  return (
    <DateTimePicker
      value={value}
      mode={mode}
      display={display}
      onChange={onChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      locale={getNativeLocale(locale)}
      testID={testID}
    />
  );
}
