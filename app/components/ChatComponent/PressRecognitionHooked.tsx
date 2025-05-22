/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useVoiceRecognition } from "../../hooks/useVoiceRecognition"

export default function PressRecognitionHooked() {
  const { state, startRecognizing, stopRecognizing } = useVoiceRecognition()
  const [borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">("lightgray")

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 30 }}>Talk GPT 🤖</Text>
      <Text style={styles.instructions}>
        Press and hold this button to record your voice. Release the button to send the recording,
        and you&#39;ll hear a response
      </Text>
      <Text style={styles.welcome}>Your message: &quot;{state.results[0]}&quot;</Text>
      <Pressable
        onPressIn={() => {
          setBorderColor("lightgreen")
          startRecognizing()
        }}
        onPressOut={() => {
          setBorderColor("lightgray")
          stopRecognizing()
        }}
        style={{
          width: "90%",
          padding: 30,
          gap: 10,
          borderWidth: 3,
          alignItems: "center",
          borderRadius: 10,
          borderColor: borderColor,
        }}
      >
        <Text style={styles.welcome}>
          {state.isRecording ? "Release to Send" : "Hold to Speak"}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  action: {
    color: "#0000FF",
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  button: {
    height: 50,
    width: 50,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  instructions: {
    color: "#333333",
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  stat: {
    color: "#B0171F",
    marginBottom: 1,
    textAlign: "center",
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
})
