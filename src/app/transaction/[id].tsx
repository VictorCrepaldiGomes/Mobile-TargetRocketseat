import { Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { InputCurrency } from "@/components/InputCurrency";
import { Input } from "@/components/Input";
import { Button } from "@/components/Buttons";
import TransactionTypeComponent from "@/components/TransactionType";
import { TransactionType } from "@/utils/TransactionsTypes";

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;
  const [type, setType] = React.useState(TransactionType.Input);

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
        <InputCurrency value={0} label="Valor" onChangeValue={() => {}} />
        <Input label="Motivo (opcional)" placeholder="EX: Investir" />
        <Button title="Salvar" onPress={() => {}} />
      </View>
    </View>
  );
}
