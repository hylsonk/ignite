import { useStores } from "@/models/helpers/useStores"
import { AppStackScreenProps } from "@/navigators"
import { $styles } from "@/theme/styles"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Text, Screen } from "@/components"
import { useHeader } from "@/utils/useHeader"
import VoiceTest from "@/components/ChatComponent/InputVoice"

interface ChatScreenProps extends AppStackScreenProps<"Chat"> {}
export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen(_props) {
  const {
    authenticationStore: { logout },
  } = useStores()

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <Text>Chat</Text>
      <VoiceTest />
    </Screen>
  )
})
