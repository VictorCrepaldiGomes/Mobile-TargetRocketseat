import { View, StatusBar, Alert } from "react-native";
import HomeHeader from "@/components/HomeHeader";
import Target from "@/components/Target";
import List from "@/components/List";
import { Button } from "@/components/Buttons";
import { router, useFocusEffect } from "expo-router";
import {
  useTargetDatabase,
  TargetResponse,
} from "@/database/useTargetDatabase";
import { useCallback } from "react";
import { useState } from "react";
import NumberToCurrency from "@/utils/numberToCurrency";

type TargetUIData = {
  id: string;
  name: string;
  current: string;
  percentage: string;
  target: string;
};

const sumarry = {
  total: "R$ 14.650,00",
  input: { label: "Entradas", value: "R$ 5.000,00" },
  output: { label: "Saídas", value: "R$ 2.350,00" },
};

export default function Index() {
  const targetDatabase = useTargetDatabase();
  const [targets, setTargets] = useState<TargetUIData[]>([]);

  const fetchTargets = useCallback(async () => {
    try {
      const response = await targetDatabase.listBySavedValues();

      const mappedData = response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: NumberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: NumberToCurrency(item.amount),
      }));

      return mappedData;
    } catch (error) {
      console.error("Error fetching targets:", error);
      Alert.alert("Erro", "Não foi possível buscar as metas.");
      return [];
    }
  }, [targetDatabase]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  async function fetchData() {
    try {
      const targetData = await fetchTargets();
      setTargets(targetData || []);
    } catch (error) {
      console.error("Erro em fetchData:", error);
      setTargets([]);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={sumarry} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/progress/${item.id}`)}
          />
        )}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button
          title="Adicionar Meta"
          onPress={() => router.navigate("/target")}
        />
      </View>
    </View>
  );
}
