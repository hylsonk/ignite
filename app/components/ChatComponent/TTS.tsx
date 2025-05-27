import { View, StyleSheet, Button } from "react-native"
import * as Speech from "expo-speech"

export default function TTS() {
  const speak = () => {
    const thingToSay =
      "Dados da Receita Federal mostram o total de contribuintes que faz jus à famosa frase 'brasileiro deixa tudo para a última hora'. As pessoas têm até sexta-feira, dia 30 de maio, para entregar a declaração do Imposto de Renda. Mas muitos brasileiros deixaram para a última hora… "
    Speech.speak(thingToSay, { language: "pt-BR" })
  }

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
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
