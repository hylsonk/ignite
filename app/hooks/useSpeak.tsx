import { useState, useEffect } from "react"
import Voice, { SpeechErrorEvent, SpeechResultsEvent } from "@react-native-voice/voice"
import * as Speech from "expo-speech"

interface IState {
    error: string
    isSpeaking: any
}

export const useSpeak = (props: any) => {
    const [state, setState] = useState<IState>({
        error: "",
        isSpeaking: false,
    })

    const speak = () => {
        Speech.speak(props.thingToSay, { language: "pt-BR" })
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
                    setState((prevState) => ({
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
        state,
        setState,
        speak,
    }
}
