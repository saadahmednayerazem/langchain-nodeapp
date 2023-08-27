import { Text } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";

import FileUpload from "~/components/file-upload";
import FileList from "~/components/file-list";
import Chat from "~/components/chat";
import { useUserId } from "~/hooks";

const Home: NextPage = () => {
  const { userId } = useUserId();
  return (
    <>
      <Head>
        <title>Chat With (pdf, docx, csv, txt, json) documents using ChatGPT 4</title>
        <meta name="description" content="Saad Ahmed " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <script src="http://tryauthor.code/public/iframeResizer.contentWindow.min.js" async />
        <div className="row m-0 p-0">
          <div className="col-md-4 sidebar">
            <div className="card border-0 shadow-sm">
              <div className="card-body card-body-padding">
                <h6 className="mt-1 ml-3 fs-16 fw-bolder">Chat With (pdf, docx, csv, txt, json) documents using ChatGPT 4</h6>
                <p className="fs-12 text-muted mb-4 small">Chat With (pdf, docx, csv, txt, json) documents using ChatGPT 4</p>

                <FileUpload />

                <FileList />

                {/*<Text size="lg" className="mt-5"><strong>Db-Id={userId}</strong></Text>*/}
                {/*<EditPrompts />*/}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card card-body card-body-padding card-panel shadow-sm border-0 bg-white">
              <Chat />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
