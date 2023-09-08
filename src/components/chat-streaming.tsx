// streaming
"use client";
import { useState } from "react";

// 
import { useRef } from "react";
import { Button, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
// 
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

  // streaming
  const [streamedData, setStreamedData] = useState("");

  // const handleChatSubmit = async (e) => {
  //   e.preventDefault();
  //   setStreamedData("");

  //   const formData = new FormData(e.currentTarget);
  //   const response = await fetch("api/chat?batch=1", {
  //     method: "POST",
  //     body: JSON.stringify(
  //       [
  //         {
  //           json: {question: formData.get("question"), userId: "99a0942e3c", history: []}
  //         }
  //       ]
  //     ),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const reader = response.body.getReader();

  //   while (true) {
  //     const { done, value } = await reader.read();

  //     if (done) {
  //       break;
  //     }

  //     const text = new TextDecoder().decode(value);
  //     setStreamedData((prevData) => prevData + text);
  //   }
  // };

  const handleClearChat = () => {
    setStreamedData("");
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto mb-4">
        <ChatHistory />
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 p-8">

        <div className="flex justify-center mb-2">
          <Button className="btn btn-danger" onClick={() => setHistory([])}>Clear chat messages</Button>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            onChange={(e) => setQuestion(e.target.value)}
            defaultValue={question}
            disabled={chatApi.isLoading}
            onKeyDown={getHotkeyHandler([["Enter", handleSend]])}
          />
          <Button className="btn btn-primary" onClick={handleSend} loading={chatApi.isLoading}>
            Submit
          </Button>
        </div>

        <div className="card">
          <div className="card-body">
            <h5>Streaming Functionality</h5>
            {/*<form onSubmit={handleChatSubmit}>
              <input
                className="form-control"
                placeholder="Enter prompt"
                name="question"
                required
              ></input>
              <div className="flex justify-center">
                <button type="submit" className="btn btn-primary">Send Chat</button>
                <button type="button" onClick={handleClearChat} className="btn btn-danger">Clear Chat</button>
              </div>
            </form>*/}
            {streamedData && (
              <div>
                <h3 className="text-2xl text-gray-400">AI Assistant</h3>
                <p className="text-gray-200 rounded-md bg-gray-700 p-4">
                  {streamedData}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default Chat;
