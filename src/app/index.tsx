import { View, StatusBar } from "react-native";
import HomeHeader from "@/components/HomeHeader";
import Target from "@/components/Target"
import List from "@/components/List";
import { Button } from "@/components/Buttons";
import { router } from "expo-router";

const sumarry = {
  total: "R$ 100,00",
  input: { label: "Entradas", value: "R$ 5.000,00" },
  output: { label: "Saídas", value: "R$ 2.350,00" },
};

const targets = [
  {
    id: "1",
    name: "Cadeira Gamer",
    percentage: "95%",
    current: "R$ 2.325,00",
    target: "R$ 3.000,00",
  },
  {
    id: "2",
    name: "Viagem",
    percentage: "20%",
    current: "R$ 1.400,00",
    target: "R$ 7.450,00",
  },
  {
    id: "3",
    name: "Festa",
    percentage: "100%",
    current: "R$ 8.000,00",
    target: "R$ 8.000,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={sumarry} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => <Target data={item} onPress={() => router.navigate(`/progress/${item.id}`)} />}
      />
    <View style={{ padding: 24, paddingBottom: 32 }}>
      <Button title="Adicionar Meta" onPress={() => router.navigate("/target")} />
    </View>
    </View>
  );
}