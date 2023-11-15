import { Divider, Flex, Text } from "@chakra-ui/react"; // assuming you're using Chakra UI for the components
import React from "react";
function ErrorPage() {
  return (
    <>
      <Flex direction="column" alignItems="center" bg="RGB(248 247 243)">
        <Text
          style={{ fontSize: "50px", color: "RGB(24 56 66)" }}
          fontFamily={"Pretendard"}
        >
          고장나쓰요
        </Text>
      </Flex>
      <Divider />
    </>
  );
}

export default ErrorPage;
