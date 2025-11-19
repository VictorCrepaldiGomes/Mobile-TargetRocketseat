import { View, Alert } from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Buttons";
import { InputCurrency } from "@/components/InputCurrency";
import { useState } from "react";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || !amount || amount <= 0 || isNaN(amount)) {
      return Alert.alert(
        "Atenção",
        "Por favor, preencha todos os campos corretamente."
      );
    }
    setIsProcessing(true);

    if (params.id) {
    } else {
      create();
    }
  }

  async function create() {
    try {
      if (!name.trim()) {
        Alert.alert("Erro", "Nome da meta é obrigatório");
        setIsProcessing(false);
        return;
      }

      if (!amount || amount <= 0 || isNaN(amount)) {
        Alert.alert("Erro", "Valor da meta deve ser maior que zero");
        setIsProcessing(false);
        return;
      }

      await targetDatabase.create({
        name: name.trim(),
        amount: Number(amount),
      });

      Alert.alert("Sucesso", "Meta criada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Erro ao criar meta:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao criar a meta. Por favor, tente novamente."
      );
      setIsProcessing(false);
    }
  }
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Meta"
        subtitle="Economize para alcançar sua menta financeira"
        rightButton={{ icon: "edit", onPress: () => {} }}
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da Meta"
          placeholder="Ex: Viagem para praia"
          onChangeText={setName}
          value={name}
        />
        <InputCurrency
          label="Valor alvo"
          value={amount}
          onChangeValue={(value) => setAmount(value || 0)}
        />
        <Button
          title="Salvar"
          onPress={() => {
            handleSave();
          }}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
