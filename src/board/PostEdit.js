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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostEdit() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [post, setPost] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://3.34.127.164/post/${postId}`, {
        withCredentials: true,
      });
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post: ", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const updatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      if (selectedFile) {
        formData.append("img", selectedFile);
      }

      await axios.put(`http://3.34.127.164/post/${postId}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "성공적 수정 ",
        description: "성공적 수정",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/board/${postId}`);
    } catch (error) {
      console.error("Error updating post: ", error);
      toast({
        title: "문제발생",
        description: "문제 발생2",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
          <FormControl id="post-title">
            <FormLabel fontFamily={"Pretendard"}>제목</FormLabel>
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
              name="title"
              value={post.title}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="post-content" mt={4}>
            <FormLabel fontFamily={"Pretendard"}> 내용</FormLabel>
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
              name="content"
              value={post.content}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="post-image" mt={4}>
            <FormLabel fontFamily={"Pretendard"}>사진 변경하기</FormLabel>
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
              id="img"
              ref={fileInputRef}
              name="img"
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              onClick={handleButtonClick}
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

            {fileName === "" && (
              <Text mt={2} fontFamily={"Pretendard"}>
                {post.img}
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
            m={"24px 0px 24px 0px"}
            style={{
              width: "100px",
              alignSelf: "end",
            }}
            onClick={updatePost}
            fontFamily={"Pretendard"}
          >
            수정
          </Box>
        </VStack>
      </Flex>
    </>
  );
}

export default PostEdit;
