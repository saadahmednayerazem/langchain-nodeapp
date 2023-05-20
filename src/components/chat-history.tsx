import { Flex, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconRobot, IconUser } from "@tabler/icons-react";

import { useHistory } from "~/hooks";

function ChatHistory() {
  const { history } = useHistory();

  return (
    <Stack>
      {history.map((item, index) => {
        const isAi = item.agent === "ai";
        return (
          <Flex key={index} className="rounded border p-2 bg-white">
            <ThemeIcon color="white" size={24} radius="xl" mr="sm">
              {isAi ? <IconRobot color="#00a2ff" size={18} /> : <IconUser color="#00a2ff" size={18} />}
            </ThemeIcon>
            <Text size="md" className="">
              {item.text}
            </Text>
          </Flex>
        );
      })}
    </Stack>
  );
}

export default ChatHistory;
