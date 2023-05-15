import { Text } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";

import FileUpload from "~/components/file-upload";
import FileList from "~/components/file-list";
import EditPrompts from "~/components/edit-prompts";
import Chat from "~/components/chat";
import { useUserId } from "~/hooks";

const Home: NextPage = () => {
  const { userId } = useUserId();
  return (
    <>
      <Head>
        <title>Chat with pdf,docx,txt documents</title>
        <meta name="description" content="Saad Ahmed " />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="">
        <h2>Saad Ahmed - Chat with pdf,docx,txt documents node and next.js app </h2>
        <div className="container flex h-screen">
          <div className="flex w-full max-w-sm flex-col bg-[#FBFBFB] p-4 border rounded">
            <FileUpload />
            <FileList />
            <EditPrompts />
            <Text color="red" size="lg" className="sticky bottom-0 mt-auto">
              <strong>{userId}</strong>
            </Text>
          </div>
          <div className="flex flex-1 flex-col bg-[#e6e6e6] rounded">
            <Chat />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
