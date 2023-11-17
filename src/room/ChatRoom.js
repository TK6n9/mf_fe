import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useSocket } from "../context/SocketContext";

function ChatRoom({ roomId }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  const toast = useToast();
  const socket = useSocket();

  useEffect(() => {
    axios
      .get(`https://34.64.161.131/server/room/${roomId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setChats(response.data.chats);
      })
      .catch((error) =>
        toast({
          title: "Error loading chats",
          description: error.toString(),
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );

    socket.on("chat", (newChat) => {
      setChats((prevChats) => [...prevChats, newChat]);
    });

    return () => socket.off("chat");
  }, [roomId, socket, toast]);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post(
          `https://34.64.161.131/server/room/${roomId}/chat`,
          {
            chat: message,
          },
          { withCredentials: true }
        );
        setChats((prevChats) => [...prevChats, response.data]);
        setMessage("");
      } catch (error) {
        toast({
          title: "Error sending message",
          description: error.toString(),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      overflowY="auto"
      maxHeight="400px"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl">Chat Room</Text>
        <VStack spacing={3} width="100%" alignItems="flex-start">
          {chats?.map((chat, index) => (
            <Box key={index} p={3} bg="gray.100" borderRadius="md" width="100%">
              <Text fontWeight="bold">{chat?.user}</Text>
              <Text>{chat?.chat}</Text>
            </Box>
          ))}
        </VStack>
        <HStack width="100%">
          <Input
            placeholder="뻐구기 날리기..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            flex={1}
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
          />
          <Button
            bg="rgb(6,57,55)"
            color="white"
            _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
            onClick={sendMessage}
          >
            <Text fontFamily={"Pretendard"}>보내기</Text>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ChatRoom;
