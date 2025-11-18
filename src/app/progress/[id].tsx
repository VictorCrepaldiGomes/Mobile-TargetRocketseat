import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function Progress() {
    const params = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Progress ID: {params.id}</Text>
      <Button
        title="Go Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
