import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: {
    fontSize: 12,
    color: colors.gray[300],
    fontFamily: font.regular,
  },
  value: {
    fontSize: 18,
    color: colors.white,
    fontFamily: font.bold,
  },
});
