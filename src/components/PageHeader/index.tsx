import { View, TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

import { colors } from "@/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type PageHeader = {
  title: string;
  subtitle?: string;
  rightButton?: {
    icon: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
  };
};

export default function PageHeader({
  title,
  subtitle,
  rightButton,
}: PageHeader) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back" size={32} color={colors.black} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {rightButton && (
        <TouchableOpacity
          style={{ position: "absolute", top: 32, right: 24 }}
          activeOpacity={0.7}
          onPress={rightButton.onPress}
        >
          <MaterialIcons
            name={rightButton.icon}
            size={24}
            color={colors.gray[500]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
