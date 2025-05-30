import { useEffect, useState } from "react"
import { Pressable, StyleSheet, TextInput, View, LogBox } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Feather } from "@expo/vector-icons"

import Voice, { SpeechResultsEvent } from "@react-native-voice/voice"

LogBox.ignoreLogs(["new NativeEventEmitter"])

export default function YTVoice() {
  const [search, setSearch] = useState("")
  const [isListening, setIsListening] = useState(false)

  function onSpeechResults({ value }: SpeechResultsEvent) {
    const text = value ?? []
    setSearch(text.join().replace(",", " "))
  }

  async function handleListening() {
    try {
      if (isListening) {
        await Voice.stop()
        setIsListening(false)
      } else {
        setSearch("")
        await Voice.start("pt-BR")
        setIsListening(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder={isListening ? "Gravando..." : "Pesquisar... "}
          onChangeText={setSearch}
          value={search}
        />

        <Pressable style={styles.button} onPress={handleListening}>
          <Feather name={isListening ? "pause" : "mic"} color="#FFF" size={24} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 12,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 52,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  input: {
    borderRadius: 12,
    flex: 1,
    fontSize: 16,
    height: 54,
    padding: 16,
  },
})
