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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-image">
        <div className="logo-img">
          <a href="#">
            <svg className="box-0-2-3 box-d5-0-2-15" viewBox="0 0 141 18" role="img" aria-label="logo" focusable="true" aria-hidden="false" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M13.88 13.304c-2.462-.02-4.853-.8-6.817-2.222C4.77 9.437 3.22 7.016 2.727 4.312c0-.18-.057-.36-.082-.509a1.165 1.165 0 01.04-.515c.05-.167.14-.321.258-.453.12-.131.267-.237.433-.309.165-.071.345-.108.527-.108h.588c.445 2.058 1.623 3.903 3.331 5.22a10.015 10.015 0 006.001 2.043c5.25.11 10.361-4.36 13.628-9.243a1.142 1.142 0 00-.4-.32A1.192 1.192 0 0026.543 0H1.184C.87 0 .569.12.347.332A1.111 1.111 0 000 1.135v14.642c0 .301.125.59.347.803.222.213.523.332.837.332h25.36a1.229 1.229 0 00.858-.321 1.094 1.094 0 00.358-.814V3.256c-4.335 7.223-9.283 10.048-13.88 10.048z"></path></svg>
          </a>
        </div>

        <div className="container pb-5">
          <div className="row">
            <div className="col-md-4 sidebar">
              <FileUpload />

              <FileList />

              <EditPrompts />
              <Text size="lg" className="sticky bottom-0 mt-auto">
                <strong>Db-Id={userId}</strong>
              </Text>
            </div>
            <div className="col-md-8">

              <div className="text-center">
                <div className="box-0-2-3 box-d8-0-2-20">
                  <div className="box-0-2-3 box-d9-0-2-21">
                    <div className="flex-0-2-1 flex-d4-0-2-22 box-0-2-3 box-d10-0-2-23" data-ats-login-icon="logo_gr_small">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="18" fill="none" viewBox="0 0 30 18">
                        <g clip-path="url(#clip0_11012_450125)">
                          <path fill="#fff" d="M14.766 14.118a12.571 12.571 0 01-7.253-2.358c-2.438-1.746-4.087-4.315-4.612-7.184 0-.191-.06-.382-.087-.54a1.233 1.233 0 01.042-.547c.054-.177.148-.341.275-.48.127-.14.284-.252.46-.328.176-.076.368-.115.561-.115h.625c.474 2.184 1.727 4.142 3.544 5.54a10.67 10.67 0 006.385 2.167c5.585.116 11.022-4.626 14.497-9.808a1.213 1.213 0 00-.426-.34A1.27 1.27 0 0028.238 0H1.26a1.29 1.29 0 00-.89.353A1.178 1.178 0 000 1.204v15.538c0 .32.133.626.369.852.236.226.556.353.89.353h26.98c.168.004.335-.024.492-.082.157-.059.3-.147.42-.26a1.157 1.157 0 00.381-.863V3.455c-4.612 7.665-9.875 10.663-14.766 10.663z"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_11012_450125">
                            <path fill="#fff" d="M0 0H29.533V18H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-body card-panel">
                <Chat />
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
};

export default Home;
