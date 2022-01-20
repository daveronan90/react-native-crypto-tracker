import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { colors } from "../assets/data/colors";

const ListItem = ({
  current_price,
  image,
  name,
  symbol,
  price_change_percentage_7d_in_currency,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", flexGrow: 1, marginBottom: 24 }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 48, height: 48, marginRight: 8 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 18 }}>{name}</Text>
          <Text style={{ fontSize: 14, color: colors.gray }}>
            {symbol.toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, textAlign: "right" }}>
            €
            {current_price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "right",
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
    </TouchableOpacity>
  );
};

export default ListItem;
