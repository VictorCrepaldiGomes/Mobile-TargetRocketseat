import { styles } from "./styles";
import { ColorValue, View } from "react-native";
export default function Separator({ color }: { color: ColorValue }) {
  return <View style={[styles.container, { backgroundColor: color }]} />;
}
