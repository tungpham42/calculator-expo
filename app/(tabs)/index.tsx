import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Calculator from "../../src/components/Calculator";
import { store } from "../../src/store/store";

const HomeScreen = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Calculator />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
