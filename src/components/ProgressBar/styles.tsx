import { StyleSheet } from "react-native";
import { colors, font } from "@/themes";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        fontFamily: font.medium,
        fontSize: 12,
        color: colors.gray[500],
        marginBottom: 5,
    },
    status: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    value: {
        fontFamily: font.medium,
        fontSize: 18,
        color: colors.black,
        flex: 1,
    },
    target: {
        fontSize: 14,
        color: colors.gray[500],
        fontFamily: font.medium,
    },
    percentage: {
        fontSize: 14,
        fontFamily: font.bold,
        color: colors.blue[500],

    },
    progress: {
        marginTop: 16,
        width: "100%",
        height: 5,
        borderRadius: 5,
        backgroundColor: colors.gray[300],
        overflow: "hidden",
    },
    currentProgress: {
        height: 5,
        backgroundColor: colors.blue[500],
    },
    
});