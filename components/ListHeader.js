import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../assets/data/colors";

const ListHeader = () => {
  return (
    <>
      <Text style={styles.largeTitle}>Markets</Text>
      <View style={styles.line} />
    </>
  );
};

const styles = StyleSheet.create({
  largeTitle: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  line: {
    height: 2,
    backgroundColor: colors.gray,
    marginTop: 16,
    marginBottom: 24,
  },
});

export default ListHeader;
