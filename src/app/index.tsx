import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { font } from "@/themes/font";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: font.bold }}>Open as</Text>
      <Button
        title="Nova meta"
        onPress={() => {
          router.navigate("/target");
        }}
      />
      <Button
        title="Transação"
        onPress={() => {
          router.navigate("/transaction/132");
        }}
      />
      <Button
        title="Progresso"
        onPress={() => {
          router.navigate("/progress/132");
        }}
      />
    </View>
  );
}
