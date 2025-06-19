import { useStores } from "@/models/helpers/useStores"
import { AppStackScreenProps } from "@/navigators"
import { $styles } from "@/theme/styles"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Text, Screen } from "@/components"
import { useHeader } from "@/utils/useHeader"
// import VoiceTest from "@/components/ChatComponent/InputVoice"
import YTVoice from "@/components/ChatComponent/YTVoice"
import PressRecognitionHooked from "@/components/ChatComponent/PressRecognitionHooked"
import VoiceTest from "@/components/ChatComponent/InputVoice"
import TTS from "@/components/ChatComponent/TTS"
import TTSHooked from "@/components/ChatComponent/TTSHooked"
import Chat from "@/components/ChatUI/Chat"

interface ChatScreenProps extends AppStackScreenProps<"Chat"> {}
export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen(_props) {
  const {
    authenticationStore: { logout },
  } = useStores()

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <Chat user={{ _id: 1 }}/>
    </Screen>
  )
})
