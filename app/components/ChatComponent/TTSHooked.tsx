import { View, StyleSheet, Button } from "react-native"
import * as Speech from "expo-speech"
import { useSpeak } from "../../hooks/useSpeak"

export default function TTSHooked(props: any) {
  const { speakState, speak } = useSpeak(props)

  return (
    <View style={styles.container}>
      <Button title={speakState.isSpeaking ? "Speaking..." : "Press to hear some words"} onPress={() => {speak()}} disabled={speakState.isSpeaking}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
})
