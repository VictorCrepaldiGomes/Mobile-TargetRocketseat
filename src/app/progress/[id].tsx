import { Alert, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { Transaction } from "@/components/Transaction";
import List from "@/components/List";
import { Button } from "@/components/Buttons";
import React from "react";

import { TransactionType } from "@/utils/TransactionsTypes";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useState } from "react";
import NumberToCurrency from "@/utils/numberToCurrency";
import Loading from "@/components/Loading";

export default function Progress() {
  const params = useLocalSearchParams<{ id: string }>();
  const targetDatabase = useTargetDatabase();
  const [isFetching, setIsFetching] = useState(false);
  const [details, setDetails] = useState({
    current: "R$ 0,00",
    name: "",
    target: "R$ 0,00",
    percentage: 0,
  });

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      if (!response) {
        Alert.alert("Erro", "Meta não encontrada.");
        return;
      }
      setDetails({
        name: response.name,
        current: NumberToCurrency(response.current),
        target: NumberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      console.error("Error fetching target details:", error);
      Alert.alert("Erro", "Não foi possível buscar os detalhes da meta.");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  if (isFetching) {
    return <Loading />;
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);
    setIsFetching(false);
  }

  const transactions = [
    {
      id: "1",
      value: "R$ 250,00",
      date: "10/12/2025",
      description: "Compra na Apple Store",
      type: TransactionType.Output,
    },
    {
      id: "2",
      value: "R$ 459,00",
      date: "10/8/2025",
      description: "Venda de produto",
      type: TransactionType.Input,
    },
  ];
  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => {
            router.navigate(`/target?id=${params.id}`);
          },
        }}
      />
      <ProgressBar data={details} />
      <List
        title="Transações"
        data={transactions}
        emptyMessage="Nenhuma transação encontrada"
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
      />
      <Button
        title="Adicionar Transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
