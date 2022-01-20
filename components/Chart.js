import React, { useEffect,useState } from "react";
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../assets/data/colors";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";

export const { width: SIZE } = Dimensions.get("window");

const Chart = ({
  current_price,
  image,
  name,
  symbol,
  price_change_percentage_7d_in_currency,
  sparkline_in_7d,
}) => {
  const latestCurrentPrice = useSharedValue(current_price);

  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    latestCurrentPrice.value = current_price;

    setTimeout(() => setChartReady(true), 0);
  }, [current_price]);

  const formatEUR = (value) => {
    "worklet";
    if (value === "") {
      return `€ ${latestCurrentPrice.value
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }
    const formattedValue = `€ ${parseFloat(value)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;

    return formattedValue;
  };
  return (
    <ChartPathProvider
      data={{ points: sparkline_in_7d.price, smoothingStrategy: "bezier" }}
    >
      <View style={styles.content}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: image }} style={styles.symbol} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: colors.gray, fontSize: 12 }}
            >{`${name} (${symbol.toUpperCase()})`}</Text>
            <Text style={{ color: colors.gray }}>7d</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <ChartYLabel
            format={formatEUR}
            style={{ fontWeight: "bold", fontSize: 18, color: colors.black }}
          />
          <Text
            style={{
              fontSize: 16,
              color:
                price_change_percentage_7d_in_currency >= 0
                  ? colors.green
                  : colors.red,
            }}
          >
            {price_change_percentage_7d_in_currency.toFixed(2)}%
          </Text>
        </View>
      </View>
      {chartReady && (
        <View style={{ marginTop: 40 }}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: "black" }} />
        </View>
      )}
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  content: { padding: 16 },
  symbol: { width: 24, height: 24, marginRight: 8 },
  title: {},
});

export default Chart;
