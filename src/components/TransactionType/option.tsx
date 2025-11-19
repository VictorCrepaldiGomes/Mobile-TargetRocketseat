import { ColorValue, Pressable, PressableProps, Text } from "react-native";

import { styles } from "./styles";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { colors } from "@/themes";

type Props = PressableProps & {
  title: string;
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
};

export default function Option({
  title,
  isSelected,
  icon,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[styles.title, { color: isSelected ? colors.white : colors.gray[500] }]}>{title}</Text>
    </Pressable>
  );
}
