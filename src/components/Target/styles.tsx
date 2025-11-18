import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    gap: 7,
  },
  name: {
    fontFamily: font.medium,
    fontSize: 14,
    color: colors.black,
  },
  status: {
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: font.regular,
  }
});