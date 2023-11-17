import {
  Box,
  Button,
  Divider,
  Flex,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ChatCnt } from "../atom/atom";
import ChatRoom from "./ChatRoom";
import CreateRoomForm from "./CreateRoomForm";
function RoomList() {
  const [ChatCntState, setChatCnt] = useRecoilState(ChatCnt);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomMakeCnt, setRoomMakeCnt] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  useEffect(() => {
    axios
      .get("https://34.64.161.131/server", { withCredentials: true })
      .then((response) => {
        console.log("🚀__response.data.rooms", response.data.rooms);
        setRooms(response.data.rooms);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, [ChatCntState]);

  const handleRoomClick = (roomId) => {
    console.log("#__roomId", roomId);

    setSelectedRoomId(roomId);
  };
  useEffect(() => {
    setRoomMakeCnt(false);
  }, [rooms.length]);

  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px">
        <VStack spacing={4}>
          <Flex justifyContent="flex-start" w="100%">
            <Text fontSize="xl" fontFamily={"Pretendard"}>
              방 목록
            </Text>
          </Flex>
          <Flex justifyContent="flex-start" w="100%">
            <List spacing={3}>
              {rooms.map((room) => (
                <ListItem key={room.id}>
                  <Text
                    onClick={() => handleRoomClick(room.id)}
                    fontFamily={"Pretendard"}
                    cursor={"pointer"}
                  >
                    {room.title}
                  </Text>

                  <Divider my={2} />
                </ListItem>
              ))}
            </List>
          </Flex>
        </VStack>
        <Flex justifyContent="flex-end" w="100%">
          <Button
            bg="rgb(6,57,55)"
            color="white"
            _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
            onClick={() => {
              setRoomMakeCnt(!roomMakeCnt);
            }}
          >
            <Text fontFamily={"Pretendard"}>방 만들기</Text>
          </Button>
        </Flex>
      </Box>
      {roomMakeCnt && <CreateRoomForm />}
      {selectedRoomId && <ChatRoom roomId={selectedRoomId} />}
    </>
  );
}

export default RoomList;
