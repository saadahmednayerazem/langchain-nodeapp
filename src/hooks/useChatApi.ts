import { notifications } from "@mantine/notifications";

import { api } from "~/utils/api";
import { useHistory, useQuestion, useQAPromptTemplate, useQuestionGeneratorTemplate, useUserId } from "~/hooks";

export const useChatApi = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const { userId } = useUserId();
  const { history, addToHistory } = useHistory();
  const { question, setQuestion } = useQuestion();
  const {qaPromptTemplate, setQAPromptTemplate} = useQAPromptTemplate();
  const {questionGeneratorTemplate, setQuestionGeneratorTemplate} = useQuestionGeneratorTemplate();

  const chatApi = api.chat.prompt.useMutation({
    onSuccess: (text) => {
      addToHistory({ agent: "ai", text });
      setQuestion("");
      scrollToBottom();
    },
    onError: (error) => {
      console.error(error);
      notifications.show({ title: "Error", message: error.message, color: "red" });
    },
  });

  const handleSend = () => {
    if (!question) return;
    if (!qaPromptTemplate) return;
    if (!questionGeneratorTemplate) return;
    addToHistory({ agent: "human", text: question });
    chatApi.mutate({ userId, question, qaPromptTemplate, questionGeneratorTemplate, history });
  };

  return { chatApi, handleSend };
};
