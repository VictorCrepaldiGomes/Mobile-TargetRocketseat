import { View } from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { Transaction } from "@/components/Transaction";
import List from "@/components/List";
import { Button } from "@/components/Buttons";

import { TransactionType } from "@/utils/TransactionsTypes";

export default function Progress() {
  const params = useLocalSearchParams<{ id: string }>();

  const details = {
    current: "R$ 1.200,00",
    target: "R$ 5.000,00",
    percentage: 40,
  };

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
        title="Apple Watch"
        rightButton={{ icon: "edit", onPress: () => {} }}
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
        onPress={() =>
          router.navigate(`/transaction/${params.id}`)
        }
      />
    </View>
  );
}
