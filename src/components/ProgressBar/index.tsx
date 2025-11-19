import { Text, View } from "react-native";
import { styles } from "./styles";
import { DimensionValue } from "react-native/types_generated/index";

type SavedValue = {
  current: string;
  target: string;
  percentage: number;
};

type Props = {
  data: SavedValue;
};

export function ProgressBar({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor guardado</Text>
      <View style={styles.status}>
        <Text style={styles.value}>
          {data.current} <Text style={styles.target}>/ {data.target}</Text>
        </Text>
        <Text style={styles.percentage}>{data.percentage.toFixed()}%</Text>
      </View>
      <View style={styles.progress}>
        <View
          style={[
            styles.currentProgress,
            { width: `${data.percentage}%` as DimensionValue },
          ]}
        ></View>
      </View>
    </View>
  );
}
