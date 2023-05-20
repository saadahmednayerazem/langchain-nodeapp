import type { DropzoneProps } from "@mantine/dropzone";
import { Stack, Text, rem } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

import { useFileUpload } from "~/hooks/useFileUpload";

const acceptedFiles = {
  [MIME_TYPES.pdf]: [".pdf"],
  [MIME_TYPES.doc]: [".doc"],
  [MIME_TYPES.docx]: [".docx"],
  "text/csv": [".csv"],
  "text/plain": [".txt"],
  "application/json": [".json"],
};

function FileUpload(props: Partial<DropzoneProps>) {
  const { isLoading, handleAddFile } = useFileUpload();

  return (
    <Dropzone
      onDrop={handleAddFile}
      accept={acceptedFiles}
      maxFiles={1}
      loading={isLoading}
      {...props}
    >
      <Stack align="left" spacing="xs" style={{ minHeight: rem(42), pointerEvents: "none" }}>
        <Text size="sm" className="fw-bold">Click To Upload</Text>
        <Text size="sm">
          Only (pdf, doc, docx, csv, txt, json ) files formats are currently allow here
        </Text>
      </Stack>
    </Dropzone>
  );
}

export default FileUpload;
