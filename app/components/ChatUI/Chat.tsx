import React, { useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GiftedChat, Bubble, InputToolbar, Send, MessageText } from "react-native-gifted-chat";
import useChatStore from "@/storage/useContainerChatStore";
import Markdown from "react-native-markdown-display";

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
          backgroundColor: "#ffffff",
          borderColor: "rgb(224, 225, 229)",
          borderStyle: "solid",
          borderWidth: 1,
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
            backgroundColor: "#ffffff",
            padding: 8,
            borderRadius: 12,
            maxWidth: "85%",
            flexShrink: 1,
          },
          right: {
            backgroundColor: "#063b88",
            padding: 8,
            borderRadius: 12,
            maxWidth: "85%",
            flexShrink: 1,
          },
        }}
      />
    );
  };

  const onSend = useCallback(async (messages = []) => {

    addChatMessage(messages[0]);
    await getMessageFromAI(messages[0]);

  }, []);

  const renderMarkdownMessageText = (props) => {
    const { currentMessage } = props;

    if (currentMessage && currentMessage.text) {
      return (
        <View style={{
          flexShrink: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          <Markdown
            style={{
              body: {
                color: props.position === 'left' ? '#000' : '#fff',
                fontSize: 14,
              },
              strong: {
                fontWeight: 'bold',
              },
              bullet_list: {
                paddingLeft: 16,
                marginBottom: 8,
              },
              ordered_list: {
                paddingLeft: 16,
                marginBottom: 8,
              },
              list_item: {
                flexDirection: 'row',
                flexWrap: 'wrap',
              },
              paragraph: {
                marginBottom: 8,
              },
            }}
          >
            {currentMessage.text}
          </Markdown>
        </View>
      );
    }
    return <MessageText {...props} />;
  };

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
        renderMessageText={renderMarkdownMessageText}
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