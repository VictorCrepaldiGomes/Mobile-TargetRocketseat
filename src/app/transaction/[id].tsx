import { Alert, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { InputCurrency } from "@/components/InputCurrency";
import { Input } from "@/components/Input";
import { Button } from "@/components/Buttons";
import TransactionTypeComponent from "@/components/TransactionType";
import { TransactionType } from "@/utils/TransactionsTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;
  const [type, setType] = React.useState(TransactionType.Input);
  const [isCreating, setIsCreating] = React.useState(false);
  const [amount, setAmount] = React.useState(0)
  const [observation, setObservation] = React.useState<string>("");
  const transactionsDatabase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert("Atenção", "Por favor, insira um valor válido.");
      }

      setIsCreating(true);
      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionType.Output ? amount * -1 : amount,
        observation,
      });
      Alert.alert("Sucesso", "Transação criada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating transaction:", error);
      Alert.alert("Erro", "Não foi possível criar a transação.");
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Transação"
        subtitle="A cada valor guardado você fica mais proximo da sua meta."
      />
      <TransactionTypeComponent
        selected={type}
        onChange={(type) => {
          setType(type);
        }}
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <InputCurrency value={amount} label="Valor" onChangeValue={setAmount} />
        <Input
          label="Motivo (opcional)"
          placeholder="EX: Investir"
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
