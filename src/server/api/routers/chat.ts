import { z } from "zod";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain, loadQAMapReduceChain, loadQARefineChain, LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

import weaviate from "weaviate-ts-client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

export const wvClient = weaviate.client({
  scheme: "https",
  host: env.WEAVIATE_HOST,
  apiKey: new weaviate.ApiKey(env.WEAVIATE_API_KEY),
});

const QAPromptTemplate = `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}
Helpful Answer:`;

const question_generator_template = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const model = new ChatOpenAI({ openAIApiKey: env.OPENAI_API_KEY, temperature: 0, modelName: "gpt-3.5-turbo" });
const embeddings = new OpenAIEmbeddings({ openAIApiKey: env.OPENAI_API_KEY });

export const chatRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        question: z.string(),
        qaPromptTemplate: z.string(),
        questionGeneratorTemplate: z.string(),
        history: z.array(z.object({ agent: z.string(), text: z.string() })),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, question, qaPromptTemplate, questionGeneratorTemplate, history } = input;

      try {
        const vectorStore = await WeaviateStore.fromExistingIndex(embeddings, {
          client: wvClient,
          indexName: "Documents",
          metadataKeys: ["userId"],
        });

        console.log("question:"+question);
        const chatHistory = history.map((message) => message.text);
        console.log(chatHistory);

        const question_generator_prompt = PromptTemplate.fromTemplate(question_generator_template);
        const questionGeneratorChain = new LLMChain({
          llm: model,
          prompt: question_generator_prompt,
        });

        const chain = new ConversationalRetrievalQAChain({
          // combineDocumentsChain: loadQAMapReduceChain(model),
          combineDocumentsChain: loadQARefineChain(model),
          retriever: vectorStore.asRetriever(undefined, {
            distance: 0,
            where: {
              path: ["userId"],
              operator: "Equal",
              valueText: userId,
            },
          }),
          questionGeneratorChain: questionGeneratorChain,
          verbose: true,
        });
        const res = await chain.call({ 
          question: question,
          chat_history: chatHistory,
          // query: question,
        });
        console.log({ res });

        const response = res.output_text as string;
        return response;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
