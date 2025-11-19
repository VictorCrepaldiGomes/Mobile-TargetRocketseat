import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 42,
    backgroundColor: colors.gray[100],
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 16,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    gap: 7,
  },
  title: {
    fontFamily: font.medium,
    fontSize: 14,
    color: colors.gray[500]
  },
});
