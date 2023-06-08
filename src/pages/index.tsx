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
        <title>Chat with pdf,docx,csv,txt,json documents</title>
        <meta name="description" content="Saad Ahmed " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <script src="https://peaceful-faraday.143-110-176-81.plesk.page/public/iframeResizer.contentWindow.min.js" async />
        <div className="row m-0 p-0">
          <div className="col-md-4 sidebar">
            <div className="card border-0 shadow-sm">
              <div className="card-body card-body-padding">
                <h6 className="mt-1 ml-3 fs-16 fw-bolder">Critique and Analyze</h6>
                <p className="fs-12 text-muted mb-4 small">Critique and Analyze Chat Question Answering With Your Multiple Documents</p>

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
