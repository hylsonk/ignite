import { useState, useEffect } from "react"
import Voice, { SpeechErrorEvent, SpeechResultsEvent } from "@react-native-voice/voice"
import * as Speech from "expo-speech"

interface ISpeak {
    error: string
    isSpeaking: any
}

export const useSpeak = (props: any) => {
    const [speakState, setSpeakState] = useState<ISpeak>({
        error: "",
        isSpeaking: false,
    })

    const speak = () => {
        Speech.speak(props.thingToSay, { language: props.language })
    }

    async function checkIfSpeaking() {
        let speaking = await Speech.isSpeakingAsync();
        return speaking
    }

    useEffect(() => {
        const interval = setInterval(() => {
            (async () => {
                try {
                    const speaking = await checkIfSpeaking();
                    setSpeakState((prevState) => ({
                        ...prevState,
                        isSpeaking: speaking,
                    }))
                } catch (err) {
                    console.error('Erro:', err);
                }
            })();
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return {
        speakState,
        setSpeakState,
        speak,
    }
}
