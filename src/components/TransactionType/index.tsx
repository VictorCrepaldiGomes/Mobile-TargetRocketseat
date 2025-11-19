import { View } from "react-native";

import { styles } from "./styles";

import { colors } from "@/themes";

import Option from "./option";

import { TransactionType } from "@/utils/TransactionsTypes";

type Props = {
    selected: TransactionType,
    onChange: (type: TransactionType) => void
};

export default function TransactionTypeComponent({ selected, onChange }: Props) {
    return (
        <View style={styles.container}>
          <Option 
            title="Guardar"
            icon="arrow-upward"
            isSelected={selected === TransactionType.Input}
            selectedColor={colors.blue[500]}
            onPress={() => onChange(TransactionType.Input)}
          />
          <Option 
            title="Resgatar"
            icon="arrow-downward"
            isSelected={selected === TransactionType.Output}
            selectedColor={colors.red[400]}
            onPress={() => onChange(TransactionType.Output)}
          />
        </View>
    );
}