import React, { useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import useChatStore from "@/storage/useContainerChatStore";

const { height } = Dimensions.get("window");

const Chat = ({ user }) => {

  const addChatMessage = useChatStore((state) => state.addChatMessage);
  const chatMessages = useChatStore((state) => state.chatMessages);
  const getMessageFromAI = useChatStore((state) => state.getMessageFromAI);

  const renderSend = (props) => {

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginRight: 6, gap: 4 }}>
        <Pressable>
          <Icon name="mic" size={24} color="#063b88" />
        </Pressable>
        <Send {...props} containerStyle={{ height: 40 }}>
          <View style={{ marginBottom: 8 }}>
            <Icon name="send" size={24} color="#063b88" />
          </View>
        </Send>
      </View>
    );
  };

  const renderInputToolBar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 16,
          backgroundColor: "#f2f8fc",
          borderColor: "rgb(224, 225, 229)",
          borderStyle: "solid",
          borderWidth: "1px",
          marginHorizontal: 8,
          marginTop: 5,
        }}
      />
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#FFFFFF",
            boxShadow: "rgba(66, 133, 244, 0.1) 0px 3px 10px 0px"
          },
          right: {
            backgroundColor: "#063b88",
          },
        }}
      />
    );
  };

  const onSend = useCallback(async (messages = []) => {

    addChatMessage(messages[0]);
    await getMessageFromAI(messages[0]);

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chat with AI</Text>
      </View>

      <GiftedChat
        messages={chatMessages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user._id,
        }}
        renderAvatar={null}
        renderUsernameOnMessage={false}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolBar}
        renderSend={renderSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(243, 248, 255)",
  },
  header: {
    paddingTop: height * 0.07,
    flexDirection: "row",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    paddingVertical: 8,
    backgroundColor: "#f2f8fc",
  },
  heading: {
    fontWeight: "500",
    paddingLeft: 16,
    fontSize: 20,
  },
});

export default Chat;