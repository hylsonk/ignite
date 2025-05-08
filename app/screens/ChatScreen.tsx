import { useStores } from "@/models/helpers/useStores";
import { AppStackScreenProps } from "@/navigators";
import { $styles } from "@/theme/styles";
import { useAppTheme } from "@/utils/useAppTheme";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { View } from "react-native";
import { Text, Screen } from "@/components"
import { useHeader } from "@/utils/useHeader";

interface ChatScreenProps extends AppStackScreenProps<"Chat"> {}
export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen(_props){
  const { themed, theme } = useAppTheme()

  const { navigation } = _props
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
    </Screen>
    )
});