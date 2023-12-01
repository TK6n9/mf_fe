import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData, viewTF } from "../atom/atom";
import Comments from "./Comment";
import "./PostDetail.css";
function PostDetail() {
  const [viewTFstate, setViewTF] = useRecoilState(viewTF);
  const { postId } = useParams(); // URL에서 postId 파라미터를 가져옴
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [userDataState, setUserData] = useRecoilState(userData);

  const toast = useToast();
  const fetchPost = async () => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_LOCAL_PORT}/post/${postId}`,
        {
          withCredentials: true,
        }
      );
      setPost(req.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_PORT}/post/${postId}`, {
        withCredentials: true,
      });
      toast({
        title: "게시글 삭제 성공.",
        description: "게시글이 성공적으로 삭제되었습니다.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/board");
    } catch (error) {
      console.error(error);
      toast({
        title: "에러 발생",
        description: "게시글 삭제 중 오류가 발생했습니다.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const editPost = () => {
    navigate(`/edit/${postId}`);
  };

  const fetchComments = async () => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_LOCAL_PORT}/post/comments/${postId}`,
        {
          withCredentials: true,
        }
      );
      setComments(req.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [isFilled, setIsFilled] = useState(false);
  const [pop, setPop] = useState(false);
  const [likeCount, setLikeCount] = useState(null);

  const fetchLikeCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_PORT}/post/${postId}/likeCount`,
        { withCredentials: true }
      );

      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleHeart = async () => {
    setPop(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_PORT}/post/${postId}/like`,
        {
          isLiked: !isFilled,
        },
        {
          withCredentials: true,
        }
      );
      setIsFilled(!isFilled);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => setPop(false), 400);
  };

  const checkIfLiked = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_PORT}/post/${postId}/check-like`,
        {
          withCredentials: true,
        }
      );

      setIsFilled(response.data.isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const followButton = async () => {
    const followerId = userDataState?.id; // 팔로우 하는 사람의 ID
    const followingId = post?.UserId; // 팔로우 받는 사람의 ID

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_PORT}/auth/follow`,
        {
          followerId,
          followingId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // alert("팔로우 성공!");
        toast({
          title: "팔로우 완",
          description: "팔로우 완",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        checkFollowStatus();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const unFollowButton = async () => {
    const followerId = userDataState?.id; // 팔로우 해제하는 사람의 ID
    const followingId = post?.UserId; // 팔로우 해제 받는 사람의 ID

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_LOCAL_PORT}/auth/unfollow`,
        {
          data: {
            followerId,
            followingId,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast({
          title: "언팔 완",
          description: "언팔 완",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        checkFollowStatus(); // 팔로우 상태를 다시 확인합니다.
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [followChecker, setFollowChecker] = useState(null);
  const checkFollowStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_PORT}/auth/isFollowing`,
        {
          params: {
            followerId: userDataState?.id, // 현재 로그인한 사용자의 ID
            followingId: post?.UserId, // 프로필 주인의 ID
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.following) {
          setFollowChecker(response.data.following);
        } else {
          setFollowChecker(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userDataState?.id && post?.UserId) {
      checkFollowStatus();
    }
  }, [post]);

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchLikeCount();
    checkIfLiked();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [postId]);

  if (isLoading) {
    return (
      <Box
        w={"100%"}
        h={"50vh"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ background: "#44008b" }}
      >
        <Text fontFamily={"Pretendard"} fontSize={"8xl"}>
          🧘‍♂️💫🧘‍♀️
        </Text>
      </Box>
    );
  }

  return (
    viewTFstate && (
      <div style={{ background: "rgb(248 247 243)" }}>
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
        <Container
          maxW="container.md"
          centerContent
          p={5}
          style={{ background: "rgba(248, 247, 243, 0.3)" }}
        >
          <Box p={5} shadow="md" borderWidth="1px" w="full" mt={"48px"}>
            <Flex direction="column" align="center">
              {post.img && (
                <Image
                  src={`${process.env.REACT_APP_LOCAL_PORT}/uploads/${post.img}`}
                  alt="description"
                />
              )}
              <Heading mb={4} mt={4} fontFamily={"Pretendard"}>
                {post.title}
              </Heading>
              <Text mb={4} mt={4} fontFamily={"Pretendard"}>
                {post.content}
              </Text>
              <Divider my={4} />
              <Flex justifyContent={"space-between"} w={"100%"}>
                <div onClick={toggleHeart}>
                  {isFilled ? (
                    <AiFillHeart
                      size="24px"
                      color="red"
                      className={pop ? "pop-animation" : ""}
                    />
                  ) : (
                    <AiOutlineHeart
                      size="24px"
                      color="red"
                      className={pop ? "pop-animation" : ""}
                    />
                  )}
                  <Text fontSize={"xs"} fontFamily={"Pretendard"}>
                    좋아요 : {likeCount}
                  </Text>
                </div>
                <VStack alignItems={"flex-end"}>
                  <Text fontWeight="400" fontFamily={"Pretendard"}>
                    작성자: {post.User.userName}
                  </Text>
                  <Text
                    fontWeight="300"
                    color="gray.500"
                    fontFamily={"Pretendard"}
                  >
                    작성시간: {moment(post.createdAt).format("YY/MM/DD")}
                  </Text>
                  {userDataState?.id !== post?.UserId && (
                    <Button
                      bg={!followChecker ? "rgb(6,57,55)" : "red"}
                      color="white"
                      _hover={{
                        bg: !followChecker ? "rgb(6,57,55)" : "red",
                        textDecoration: "none",
                      }}
                      onClick={!followChecker ? followButton : unFollowButton}
                      size="sm"
                      mt={"24px"}
                    >
                      {followChecker === true ? (
                        <Text fontFamily={"Pretendard"}>언팔하기</Text>
                      ) : (
                        <Text fontFamily={"Pretendard"}>팔로우</Text>
                      )}
                    </Button>
                  )}
                </VStack>
              </Flex>
              <Spacer />
            </Flex>
          </Box>

          <Flex width="full" justify="space-between" mb={"48px"}>
            <Button
              isDisabled={userDataState.id === post.UserId ? false : true}
              onClick={editPost}
              bg="rgb(6,57,55)"
              color="white"
              _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
              size="sm"
              mt={"24px"}
            >
              <Text fontFamily={"Pretendard"}>수정</Text>
            </Button>
            <Button
              bg="rgb(6,57,55)"
              color="white"
              _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
              isDisabled={userDataState.id === post.UserId ? false : true}
              onClick={deletePost}
              size="sm"
              mt={"24px"}
            >
              <Text fontFamily={"Pretendard"}>삭제</Text>
            </Button>
          </Flex>
          <Comments
            post={post}
            comments={comments}
            refreshComments={fetchComments}
          />
        </Container>
      </div>
    )
  );
}

export default PostDetail;
