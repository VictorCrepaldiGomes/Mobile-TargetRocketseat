import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontFamily: font.bold,
    fontSize: 24,
    color: colors.black,
    marginBottom: 7,
  },
  subtitle: {
    fontFamily: font.regular,
    fontSize: 14,
    color: colors.gray[500],
  },
});
