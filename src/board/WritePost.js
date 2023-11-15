import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // 파일 객체 저장
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 데이터 URL 저장
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
    }
  };

  const handlePostSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imagePreview) {
      formData.append("img", file); // 파일 객체를 FormData에 추가
    } else {
      console.error("No file selected.");
    }
    try {
      const req = await axios.post("http://3.34.127.164/post/", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // This is important for multer to work
        },
      });

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      if (req.status === 201) {
        console.log("#__성공");
        navigate("/board");
      }
    } catch (error) {
      console.log("#__실패", error);
    }
  };
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Flex position="relative">
        <Image
          src={"../777.jpg"}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "15vw",
            minHeight: "300px",
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
          }}
          fontSize="xl"
          color="white"
          fontFamily={"Pretendard"}
        >
          Community
        </Text>
      </Flex>
      <Flex w={"100%"} bg="RGB(248 247 243)" justify={"center"}>
        <VStack spacing={4} align="stretch" w={"50%"} mt={10}>
          <FormControl>
            <FormLabel htmlFor="title" fontFamily={"Pretendard"}>
              제목
            </FormLabel>
            <Input
              borderRadius="0" // removes border radius
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
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="content" fontFamily={"Pretendard"}>
              내용
            </FormLabel>
            <Textarea
              borderRadius="0" // removes border radius
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
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fontFamily={"Pretendard"}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="image" fontFamily={"Pretendard"}>
              사진 올리기
            </FormLabel>
            <Input
              borderRadius="0"
              border={"none"}
              borderColor="rgb(6, 57, 55)"
              boxShadow={"none"}
              _focus={{
                outline: "none",
                boxShadow: "none",
                border: "none",
              }}
              type="file"
              id="img"
              ref={fileInputRef}
              name="img"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Button
              onClick={handleButtonClick}
              // variant="unstyled"
              size="sm"
              bg="rgba(6,57,55 ,1)"
              color="white"
              _hover={{
                bg: "rgba(6,57,55, 1)",
                textDecoration: "none",
              }}
              p={4}
              fontFamily={"Pretendard"}
            >
              파일선택
            </Button>
            {fileName && (
              <Text mt={2} fontFamily={"Pretendard"}>
                {fileName}
              </Text>
            )}
          </FormControl>

          <Box
            as="button"
            px="24px"
            py="7px"
            border="1px"
            borderRadius="100px"
            bg="rgba(6,57,55 ,1)"
            color="white"
            _hover={{
              bg: "rgba(6,57,55, 1)",
              textDecoration: "none",
            }}
            onClick={handlePostSubmit}
            m={"24px 0px 24px 0px"}
            style={{
              width: "100px",
              alignSelf: "end",
            }}
            fontFamily={"Pretendard"}
          >
            등록
          </Box>
        </VStack>
      </Flex>
    </>
  );
}

export default WritePost;
