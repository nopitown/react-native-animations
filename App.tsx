import React, { useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import Animated, {
  Value,
  useCode,
  cond,
  eq,
  add,
  interpolate,
  startClock,
  set,
  not,
  Extrapolate,
} from "react-native-reanimated";
import { useClock, useValues } from "react-native-redash";

function Card() {
  return (
    <View style={styles.card}>
      <Text>Hey! I'm a card</Text>
    </View>
  );
}

const duration = 1000;
export default function App() {
  const [show, setShow] = useState(true);
  const clock = useClock([]);
  const [startTime, from, to] = useValues(0, 0, 0);
  const startAnimation = new Value(1);
  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () => [
      cond(eq(startAnimation, 1), [
        startClock(clock),
        set(from, opacity),
        set(to, not(to)),
        set(startTime, clock),
        set(startAnimation, 0),
      ]),
    ],
    [clock, from, opacity, startAnimation, startTime, to]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: opacity }}>
        <Card />
      </Animated.View>
      <View style={styles.button}>
        <Button
          title={show ? "hide" : "show"}
          onPress={() => setShow((prev) => !prev)}
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
    backgroundColor: "#f0f",
  },
  button: {
    justifyContent: "flex-end",
    flex: 1,
  },
});
