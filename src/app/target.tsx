import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import PageHeader from "@/components/PageHeader";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Meta"
        subtitle="Economize para alcançar sua menta financeira"
        rightButton={{ icon: "edit", onPress: () => {} }}
      />
      <Button
        title="Nova meta"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
