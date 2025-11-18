import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Text,
} from "react-native";

import { styles } from "./styles";

import { colors } from "@/themes";

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
};

export function Button({ title, isProcessing = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={isProcessing}
      {...rest}
    >
      {isProcessing ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
