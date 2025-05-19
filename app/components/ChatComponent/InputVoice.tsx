import { Component } from "react"
import { StyleSheet, Text, View, TouchableHighlight } from "react-native"

import Voice, {
  type SpeechRecognizedEvent,
  type SpeechResultsEvent,
  type SpeechErrorEvent,
} from "@react-native-voice/voice"

type Props = {}
type State = {
  recognized: string
  pitch: string
  error: string
  end: string
  started: string
  results: string[]
  partialResults: string[]
}

class VoiceTest extends Component<Props, State> {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
  }

  constructor(props: Props) {
    super(props)
    Voice.onSpeechStart = this.onSpeechStart
    Voice.onSpeechRecognized = this.onSpeechRecognized
    Voice.onSpeechEnd = this.onSpeechEnd
    Voice.onSpeechError = this.onSpeechError
    Voice.onSpeechResults = this.onSpeechResults
    Voice.onSpeechPartialResults = this.onSpeechPartialResults
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  onSpeechStart = (e: any) => {
    console.log("onSpeechStart: ", e)
    this.setState({
      started: "√",
    })
  }

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log("onSpeechRecognized: ", e)
    this.setState({
      recognized: "√",
    })
  }

  onSpeechEnd = (e: any) => {
    console.log("onSpeechEnd: ", e)
    this.setState({
      end: "√",
    })
  }

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log("onSpeechError: ", e)
    this.setState({
      error: JSON.stringify(e.error),
    })
  }

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechResults: ", e)
    this.setState({
      results: e.value && e.value?.length > 0 ? e.value : [],
    })
  }

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechPartialResults: ", e)
    this.setState({
      partialResults: e.value && e.value?.length > 0 ? e.value : [],
    })
  }

  onSpeechVolumeChanged = (e: any) => {
    console.log("onSpeechVolumeChanged: ", e)
    this.setState({
      pitch: e.value,
    })
  }

  _startRecognizing = async () => {
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    })

    try {
      await Voice.start("pt-BR")
    } catch (e) {
      console.error(e)
    }
  }

  _stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel()
    } catch (e) {
      console.error(e)
    }
  }

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy()
    } catch (e) {
      console.error(e)
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
        <Text style={styles.instructions}>Press the button and start speaking.</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          )
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          )
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Text>Recognize</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  action: {
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  instructions: {
    marginBottom: 5,
    textAlign: "center",
  },
  stat: {
    marginBottom: 1,
    textAlign: "center",
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
})

export default VoiceTest
