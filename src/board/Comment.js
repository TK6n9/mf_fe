import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData, viewTF } from "../atom/atom";
function Comments({ post, comments, refreshComments }) {
  const [viewTFstate, setViewTF] = useRecoilState(viewTF);
  const [reply, setReply] = useState("");
  const userDataState = useRecoilValue(userData);

  const handleAddComment = async () => {
    const data = {
      reply,
      UserId: userDataState.userName,
      PostId: post.id,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_PORT}/post/comment`,
        data,
        {
          withCredentials: true,
        }
      );
      setReply("");
      refreshComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const data = {
      UserId: userDataState.userName,
    };

    try {
      const config = {
        data: data,
        withCredentials: true,
      };
      await axios.delete(
        `${process.env.REACT_APP_LOCAL_PORT}/post/comment/${commentId}`,
        config
      );
      refreshComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    viewTFstate && (
      <>
        <VStack w={"100%"}>
          {comments &&
            comments?.map((comment) => (
              <Box key={comment.id} p="4" w={"100%"}>
                <HStack justifyContent="space-between">
                  <Box>
                    <Text fontWeight="bold" fontFamily={"Pretendard"}>
                      {comment.replyUserName}
                    </Text>
                    <Text fontFamily={"Pretendard"}> {comment.comment}</Text>
                  </Box>
                  {userDataState.userName === comment.replyUserName && (
                    <Button
                      variant="unstyled"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <CloseIcon boxSize={2} />
                    </Button>
                  )}
                </HStack>
              </Box>
            ))}
        </VStack>
        <Box w={"100%"} mt={10}>
          <Flex direction="column" align="stretch">
            <Input
              borderRadius="0"
              border="1px solid"
              borderColor="rgb(6, 57, 55)"
              boxShadow={"none"}
              _hover={{
                borderColor: "rgb(6, 57, 55)",
              }}
              _focus={{
                outline: "none",
                boxShadow: "none",
                border: "1px solid",
                borderColor: "rgb(6, 57, 55)",
              }}
              placeholder="댓글을 입력하세요"
              id="reple"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <Button
              onClick={handleAddComment}
              mt="2"
              ml="2"
              alignSelf="flex-end"
              bg="rgba(6,57,55 ,1)"
              color="white"
              _hover={{
                bg: "rgba(6,57,55, 1)",
                textDecoration: "none",
              }}
              size="sm"
            >
              <Text fontFamily={"Pretendard"}>댓글 달기</Text>
            </Button>
          </Flex>
        </Box>
      </>
    )
  );
}

export default Comments;
