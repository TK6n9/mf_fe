import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { ChatCnt } from "../atom/atom";

function CreateRoomForm() {
  const [ChatCntState, setChatCnt] = useRecoilState(ChatCnt);

  const [title, setTitle] = useState("");
  const [max, setMax] = useState("");
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://34.64.161.131/server/room",
        { title, max, owner, password },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <form>
        <VStack spacing={4} w={"100%"}>
          <FormControl id="title">
            <FormLabel fontFamily={"Pretendard"} fontWeight={400}>
              채팅방 이름
            </FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl id="max">
            <FormLabel fontFamily={"Pretendard"} fontWeight={400}>
              최대 인원
            </FormLabel>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </FormControl>
          <FormControl id="owner">
            <FormLabel fontFamily={"Pretendard"} fontWeight={400}>
              {" "}
              방장 이름
            </FormLabel>
            <Input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel fontFamily={"Pretendard"} fontWeight={400}>
              방 비밀번호
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Flex justifyContent="flex-end" w="100%">
            <Button
              type="submit"
              bg="rgb(6,57,55)"
              color="white"
              _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
              justifyContent={"flex-end"}
              onClick={handleSubmit}
            >
              <Text
                fontFamily={"Pretendard"}
                onClick={() => {
                  setChatCnt((ChatCntState) => !ChatCntState);
                }}
              >
                생성
              </Text>
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

export default CreateRoomForm;
