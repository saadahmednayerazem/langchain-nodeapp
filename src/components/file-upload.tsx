import type { DropzoneProps } from "@mantine/dropzone";
import { Stack, Text, rem } from "@mantine/core";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

import { useFileUpload } from "~/hooks/useFileUpload";

const acceptedFiles = {
  [MIME_TYPES.pdf]: [".pdf"],
  [MIME_TYPES.doc]: [".doc"],
  [MIME_TYPES.docx]: [".docx"],
  "text/plain": [".txt"],
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
        <Text size="sm">Click To Upload</Text>
        <Text size="sm">
          Only pdf, doc, docx, txt files formats are allowed here
        </Text>
      </Stack>
    </Dropzone>
  );
}

export default FileUpload;
