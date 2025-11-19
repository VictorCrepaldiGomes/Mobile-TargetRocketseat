import { View, StatusBar, Alert } from "react-native";
import HomeHeader from "@/components/HomeHeader";
import Target, { TargetProps } from "@/components/Target";
import List from "@/components/List";
import { Button } from "@/components/Buttons";
import { router, useFocusEffect } from "expo-router";
import {
  useTargetDatabase,
  TargetResponse,
} from "@/database/useTargetDatabase";
import { useCallback } from "react";
import { useState } from "react";
import { HomeHeaderProps } from "@/components/HomeHeader";
import NumberToCurrency from "@/utils/numberToCurrency";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
type TargetUIData = {
  id: string;
  name: string;
  current: string;
  percentage: string;
  target: string;
};

export default function Index() {
  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();
  const [targets, setTargets] = useState<TargetUIData[]>([]);
  const [summary, setSummary] = useState<HomeHeaderProps>();

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

  async function fetchSummary(): Promise<HomeHeaderProps | undefined> {
    try {
      const response = await transactionsDatabase.summary();

      if (!response) {
        return {
          total: NumberToCurrency(0),
          input: {
            label: "Entradas",
            value: NumberToCurrency(0),
          },
          output: {
            label: "Saídas",
            value: NumberToCurrency(0),
          },
        };
      }

      const totalValue = response.input - response.output;

      return {
        total: NumberToCurrency(totalValue),
        input: {
          label: "Entradas",
          value: NumberToCurrency(response.input),
        },
        output: {
          label: "Saídas",
          value: NumberToCurrency(response.output),
        },
      };
    } catch (error) {
      console.error("Error fetching summary:", error);
      Alert.alert("Erro", "Não foi possível buscar o resumo financeiro.");
      return undefined;
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  async function fetchData() {
    try {
      const [targetData, summaryData] = await Promise.all([
        fetchTargets(),
        fetchSummary(),
      ]);

      setTargets(targetData || []);
      setSummary(summaryData);
    } catch (error) {
      console.error("Erro em fetchData:", error);
      setTargets([]);
      setSummary(undefined);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader
        data={
          summary || {
            total: "R$ 0,00",
            input: { label: "Entradas", value: "R$ 0,00" },
            output: { label: "Saídas", value: "R$ 0,00" },
          }
        }
      />
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
