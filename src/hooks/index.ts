import { useEffect } from "react";
import useAppState, { useStore } from "~/state";

import { getId } from "~/utils";

export function useFiles() {
  const files = useStore(useAppState, (state) => state.files);
  const addFile = useAppState((state) => state.addFile);
  const deleteFile = useAppState((state) => state.deleteFile);
  return { files, addFile, deleteFile };
}

export function useUserId() {
  const userId = useStore(useAppState, (state) => state.userId) as string;
  const setUserId = useAppState((state) => state.setUserId);
  return { userId, setUserId };
}

export function useSetUserId() {
  const { userId, setUserId } = useUserId();

  useEffect(() => {
    if (userId === "anonymous") {
      setUserId("user-" + getId());
    }
  }, [userId, setUserId]);
}

export function useQuestion() {
  const question = useStore(useAppState, (state) => state.question);
  const setQuestion = useAppState((state) => state.setQuestion);
  return { question, setQuestion };
}

export function useQAPromptTemplate() {
  const qaPromptTemplate = useStore(useAppState, (state) => state.qaPromptTemplate);
  const setQAPromptTemplate = useAppState((state) => state.setQAPromptTemplate);
  return { qaPromptTemplate, setQAPromptTemplate };
}

export function useQuestionGeneratorTemplate() {
  const questionGeneratorTemplate = useStore(useAppState, (state) => state.questionGeneratorTemplate);
  const setQuestionGeneratorTemplate = useAppState((state) => state.setQuestionGeneratorTemplate);
  return { questionGeneratorTemplate, setQuestionGeneratorTemplate };
}

export function useHistory() {
  const history = useStore(useAppState, (state) => state.history) || [];
  const setHistory = useAppState((state) => state.setHistory);
  const addToHistory = useAppState((state) => state.addToHistory);
  return { history, setHistory, addToHistory };
}
