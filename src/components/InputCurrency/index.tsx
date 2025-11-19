import { View, TextInput, Text } from "react-native";
import { colors } from "@/themes";
import Input, { CurrencyInputProps } from "react-native-currency-input";

import { styles } from "./styles";

type InputProps = CurrencyInputProps & {
  label: string;
  onChangeValue?: (value: number) => void;
};

export const InputCurrency = ({ label, onChangeValue, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        {...rest}
        placeholderTextColor={colors.gray[400]}
        placeholder="Ex: R$ 0,00"
        prefix="R$ "
        delimiter="."
        onChangeValue={(val) => {
          const safeValue = val && !isNaN(val) ? val : 0;
          onChangeValue?.(safeValue);
        }}
        separator=","
        precision={2}
        minValue={0}
      />
    </View>
  );
};
