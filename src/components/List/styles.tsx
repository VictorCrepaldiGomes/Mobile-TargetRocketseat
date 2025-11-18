import { colors, font } from "@/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 72,
    gap: 12,
    paddingTop: 16,
  },
  title: {
    marginTop: 24,
    paddingBottom: 16,
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    fontSize: 18,
    fontFamily: font.medium
  },
  empty: {
    textAlign: "center",
    color: colors.gray[500],
    fontFamily: font.regular,
    fontSize: 14,
    marginTop: 32,
  },
});
