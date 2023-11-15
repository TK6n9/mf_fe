import { ChatIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RoomList from "./RoomList";

const ChatModal = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const openChatModal = () => {
    setIsChatModalOpen(true);
  };
  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  return (
    <>
      <IconButton
        icon={<ChatIcon fontSize={"24px"} />}
        aria-label="채팅 아이콘"
        position="fixed"
        bottom="2rem"
        right="2rem"
        style={{ zIndex: "99999" }}
        onClick={openChatModal}
        boxSize={"36px"}
      />
      <Modal isOpen={isChatModalOpen} onClose={closeChatModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily={"Pretendard"}
            fontSize={"16px"}
            fontWeight={400}
          >
            LIVE CHAT
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RoomList />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatModal;
