import { Text, View, Button} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Transaction ID: {id}</Text>
      <Button
        title="Go Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
