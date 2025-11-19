import { View, TextInput, Text } from "react-native";
import { colors } from "@/themes";
import Input, { CurrencyInputProps } from "react-native-currency-input";

import { styles } from "./styles";

type InputProps = CurrencyInputProps & {
  label: string;
};

export const InputCurrency = ({ label, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        {...rest}
        placeholderTextColor={colors.gray[400]}
        placeholder="Ex: Viagem para praia"
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
      />
    </View>
  );
};
