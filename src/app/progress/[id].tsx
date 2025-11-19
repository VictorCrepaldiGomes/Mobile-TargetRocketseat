import { Alert, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { Transaction, TransactionProps } from "@/components/Transaction";
import List from "@/components/List";
import { Button } from "@/components/Buttons";
import React from "react";

import { TransactionType } from "@/utils/TransactionsTypes";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useState } from "react";
import NumberToCurrency from "@/utils/numberToCurrency";
import Loading from "@/components/Loading";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function Progress() {
  const params = useLocalSearchParams<{ id: string }>();
  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();
  const [isFetching, setIsFetching] = useState(false);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id)
      );

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: NumberToCurrency(item.amount),
          date: String(item.created_at),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionType.Output : TransactionType.Input,
        }))
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Erro", "Não foi possível buscar as transações.");
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);
    setIsFetching(false);
  }

  function handleTransactionRemove(id: string) {
    Alert.alert("Confirmação", "Deseja realmente remover esta transação?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await transactionsDatabase.remove(Number(id));
            Alert.alert("Sucesso", "Transação removida com sucesso!");
            fetchTransactions();
          } catch (error) {
            console.error("Error removing transaction:", error);
            Alert.alert("Erro", "Não foi possível remover a transação.");
          }
        },
      },
    ]);
  }



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
          <Transaction data={item} onRemove={() => {
            handleTransactionRemove(item.id);
          }} />
        )}
      />
      <Button
        title="Adicionar Transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
