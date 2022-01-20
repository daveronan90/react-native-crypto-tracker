import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { getMarketData } from "./services/cryptoService";
import ListItem from "./components/ListItem";
import ListHeader from "./components/ListHeader";
import Chart from "./components/Chart";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [selectedCoinData, setselectedCoinData] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const updateMarketData = async () => {
      const newData = await getMarketData();
      setData(newData);
    };
    updateMarketData();
  }, []);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const openModal = (item) => {
    setselectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{
            ...styles.container,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({ item }) => (
              <ListItem {...item} onPress={() => openModal(item)} />
            )}
            ListHeaderComponent={<ListHeader />}
          />
        </SafeAreaView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            elevation: 3,
          }}
        >
          <Chart {...selectedCoinData} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
