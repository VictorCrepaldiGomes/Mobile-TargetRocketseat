import {
  FlatList,
  FlatListProps,
  StyleProp,
  View,
  Text,
  ViewStyle,
} from "react-native";

import { styles } from "./styles";
import { colors } from "@/themes";
import Separator from "../Separator";

type Props<T> = FlatListProps<T> & {
  title: string;
  emptyMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function List<T>({
  title,
  emptyMessage = "Nenhum item encontrado",
  containerStyle,
  ...rest
}: Props<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={rest.data}
        ItemSeparatorComponent={<Separator color={colors.gray[200]} />}
        keyExtractor={rest.keyExtractor}
        renderItem={rest.renderItem}
        contentStyle={styles.listContent}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
