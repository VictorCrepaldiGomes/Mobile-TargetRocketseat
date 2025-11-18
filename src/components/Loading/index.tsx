import { ActivityIndicator } from "react-native";

import { styles } from "./styles";

import { colors } from "@/themes/color";

export default function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color={colors.blue[500]}
      style={styles.container}
    />
  );
}
