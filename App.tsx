import React, { useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

function Card() {
  return (
    <View style={styles.card}>
      <Text>Hey! I'm a card</Text>
    </View>
  );
}

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {show && <Card />}
      <View style={styles.button}>
        <Button
          title={show ? "hide" : "show"}
          onPress={() => setShow((prev: boolean) => !prev)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#000",
    width: "90%",
    padding: "10%",
  },
  button: {
    justifyContent: "flex-end",
    flex: 1,
  },
});
