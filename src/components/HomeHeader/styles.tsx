import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 324,
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    paddingBottom: 18,
    gap: 24,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  label: {
    color: colors.white,
    fontFamily: font.regular,
    fontSize: 12,
  },
  total: {
    color: colors.white,
    fontFamily: font.bold,
    fontSize: 32,
  },
  sumarry: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
