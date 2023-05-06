import { useRef } from "react";
import { Button, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

import ChatHistory from "./chat-history";
import { useHistory, useQuestion } from "~/hooks";
import { useChatApi } from "~/hooks/useChatApi";

function Chat() {
  const { question, setQuestion } = useQuestion();
  const { setHistory } = useHistory();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { chatApi, handleSend } = useChatApi({ scrollToBottom });

  return (
    <>
      <div className="flex-1 overflow-y-auto p-8">
        <ChatHistory />
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 p-8">
        <div className="flex justify-center">
          <Button variant="filled" color="gray" onClick={() => setHistory([])}>
            Clear chat messages
          </Button>
        </div>
        <div className="flex gap-2">
          <TextInput
            type="text"
            className="flex-1"
            placeholder="Type your message..."
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            disabled={chatApi.isLoading}
            onKeyDown={getHotkeyHandler([["Enter", handleSend]])}
          />
          <Button variant="filled" color="green" onClick={handleSend} loading={chatApi.isLoading}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default Chat;
