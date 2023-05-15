
import { useQAPromptTemplate, useQuestionGeneratorTemplate } from "~/hooks";

const QA_Prompt_Template = `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}
Helpful Answer:`;

const Question_Generator_Template = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

function EditPrompts() {

  const {qaPromptTemplate, setQAPromptTemplate} = useQAPromptTemplate(QA_Prompt_Template);

  const {questionGeneratorTemplate, setQuestionGeneratorTemplate} = useQuestionGeneratorTemplate(Question_Generator_Template);

  if(qaPromptTemplate == '' || qaPromptTemplate === undefined){
    setQAPromptTemplate(QA_Prompt_Template);
  }
  if(questionGeneratorTemplate == '' || questionGeneratorTemplate === undefined){
    setQuestionGeneratorTemplate(Question_Generator_Template);
  }

  return (
   <>
      <h4 className="mb-0">Edit Prompt - QA_Prompt_Template</h4>
      <textarea 
        rows="13" 
        className="container"
        onChange={(e) => setQAPromptTemplate(e.target.value)}
        defaultValue={QA_Prompt_Template}
      ></textarea>

      <h4 className="mb-0">Edit Prompt - Question_Generator_Template</h4>
      <textarea 
      rows="10" 
      className="container"
      defaultValue={Question_Generator_Template}
      onChange={(e) => setQuestionGeneratorTemplate(e.target.value) }
      ></textarea>
    </>
  );
}

export default EditPrompts;
