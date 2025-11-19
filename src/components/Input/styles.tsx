import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  label: {
    fontFamily: font.regular,
    fontSize: 12,
    color: colors.gray[500],
  },
  input: {
    color: colors.black,
    fontFamily: font.regular,
    fontSize: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
});
