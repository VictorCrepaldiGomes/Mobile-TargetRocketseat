import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors } from "@/themes";
import { TransactionType } from "@/utils/TransactionsTypes";

export type TransactionProps = {
  id: string;
  value: string;
  date: string;
  description?: string;
  type: TransactionType;
};

type Props = {
  data: TransactionProps;
  onRemove: () => void;
};

export function Transaction({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={
          data.type === TransactionType.Input
            ? "arrow-upward"
            : "arrow-downward"
        }
        size={20}
        color={
          data.type === TransactionType.Input
            ? colors.blue[500]
            : colors.red[400]
        }
      />
      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.date} {data.description && <Text> - {data.description}</Text>}
        </Text>
      </View>
      <TouchableOpacity onPress={onRemove} activeOpacity={0.7}>
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  );
}
