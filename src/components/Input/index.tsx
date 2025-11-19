import { View, TextInput, TextInputProps, Text } from "react-native";
import { colors } from "@/themes";

import { styles } from "./styles";

type InputProps = TextInputProps & {
  label: string;
  placeholder?: string;
};

export const Input = ({ label, placeholder, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} placeholderTextColor={colors.gray[400]} placeholder={placeholder} />
    </View>
  );
};
