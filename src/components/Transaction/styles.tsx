import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
    container: {
        height: 72,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    info: {
        flex: 1,
        gap: 7,
    },
    value: {
        fontSize: 14,
        fontFamily: font.medium,
        color: colors.black,
    },
    description: {
        fontSize: 12,
        fontFamily: font.regular,
        color: colors.gray[500],
    }
})