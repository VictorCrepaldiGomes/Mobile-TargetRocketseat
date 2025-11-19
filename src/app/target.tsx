import { View, Alert } from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Buttons";
import { InputCurrency } from "@/components/InputCurrency";
import { useEffect, useState } from "react";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import React from "react";


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
      update();
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

  async function update() {
    try {
      await targetDatabase.update({
        id: Number(params.id),
        name,
        amount,
      });

      Alert.alert("Sucesso", "Meta atualizada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Erro ao atualizar meta:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao atualizar a meta. Por favor, tente novamente."
      );
      setIsProcessing(false);
    }
  }

  async function fetchDetailsEdit(id: number) {
    try {
      const response = await targetDatabase.show(id);

      if (response) {
        setName(response.name);
        setAmount(response.amount);
        console.log("response", response);
      } else {
        Alert.alert("Erro", "Meta não encontrada. Por favor, tente novamente.");
        router.back();
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes da meta:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao carregar os detalhes da meta. Por favor, tente novamente."
      );
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetailsEdit(Number(params.id));
    }
  }, [params.id]);

  function handleDelete() {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta meta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await targetDatabase.remove(Number(params.id));
            Alert.alert("Sucesso", "Meta excluída com sucesso!", [
              { text: "OK", onPress: () => router.replace("/") },
            ]);
          } catch (error) {
            console.error("Erro ao excluir meta:", error);
            Alert.alert(
              "Erro",
              "Ocorreu um erro ao excluir a meta. Por favor, tente novamente."
            );
          }
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title={params.id ? "Editar Meta" : "Nova Meta"}
        subtitle="Economize para alcançar sua menta financeira"
        rightButton={{
          icon: params.id === "Editar meta" ? "edit" : "delete",
          onPress: () => {
            handleDelete();
          },
        }}
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
