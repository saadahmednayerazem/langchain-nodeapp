import { Flex, Stack, Text } from "@mantine/core";
import prettyBytes from "pretty-bytes";

import { useFiles } from "~/hooks";
import FileDelete from "~/components/file-delete";

function FileList() {
  const { files } = useFiles();

  return (
    <Stack spacing="xs" mt="xl">
      {files?.map((file) => {
        const { name, size } = file;
        return (
          <Flex key={name}>
            <Stack spacing={0}>
              <Text size="lg">{name}</Text>
              <Text size="sm">
                {prettyBytes(size)}
              </Text>
            </Stack>
            <FileDelete name={name} />
          </Flex>
        );
      })}
    </Stack>
  );
}

export default FileList;
