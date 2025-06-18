import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as API from "./useContainerAPIStore";
interface ChatMessage {
  _id: number
  text: string
  createdAt: Date
  user: {
    _id: number
    name: string
    avatar: string
  }
}

interface AIResponse {
  answer: string;
}

interface ContainerChatState {
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  getMessageFromAI: (content: string) => Promise<void>;
  resetChatSession: () => void;
}

const initialMessages: ChatMessage[] = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

const useChatStore = create(
  persist<ContainerChatState>(
    (set, get) => ({
      chatMessages: initialMessages,
      addChatMessage: (message) =>
        set((state) => ({ chatMessages: [message, ...state.chatMessages] })),
      isTyping: false,
      setIsTyping: (isTyping) => set(() => ({ isTyping })),
      getMessageFromAI: async (content: string) => {

        try {
          const response = await API.post<AIResponse>("/rag", {
            query: content.text,
          });

          console.log(response);

          set((state) => ({
            chatMessages: [
              {
                _id: 1,
                text: response.answer,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
              ...state.chatMessages,
            ]
          }));
        } catch (error) {
          console.error("Erro ao enviar mensagem para a IA:", error);
        }
      },
      resetChatSession: () => {
        set({ chatMessages: initialMessages, isTyping: false });
      },
    }),
    {
      name: "chat_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useChatStore;
