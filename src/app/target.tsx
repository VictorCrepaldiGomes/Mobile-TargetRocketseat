import { View, Text } from "react-native";
import { router } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Buttons";
import { InputCurrency } from "@/components/InputCurrency";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Meta"
        subtitle="Economize para alcançar sua menta financeira"
        rightButton={{ icon: "edit", onPress: () => {} }}
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da Meta" placeholder="Ex: Viagem para praia" />
        <InputCurrency label="Valor alvo" value={0} />
        <Button
          title="Salvar"
          onPress={() => {
            // router.back();
          }}
        />
      </View>
    </View>
  );
}
