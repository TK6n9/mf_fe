import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../atom/atom";
function MyPage() {
  const [userDataState, setUserData] = useRecoilState(userData);
  const [myPost, setMyPost] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const userId = userDataState?.id;
    try {
      const response = await axios.get(
        `https://3.34.127.164/post/mypage/${userId}`,
        {
          withCredentials: true,
        }
      );
      setMyPost(response.data);
    } catch (error) {
      console.log("🚀__mypage", error);
    }
  };

  //팔로우 팔로잉 조회하기
  const [followersState, setFollowersState] = useState("");
  const [followingState, setFollowingState] = useState("");
  const myFollowing = async (userId) => {
    try {
      const followersResponse = await axios.get(
        `https://3.34.127.164/auth/myFollowers?userId=${userId}`,
        { withCredentials: true }
      );
      const followers = followersResponse.data.followers;

      const followingResponse = await axios.get(
        `https://3.34.127.164/auth/myFollowing?userId=${userId}`,
        { withCredentials: true }
      );
      const following = followingResponse.data.following;

      setFollowersState(followers);
      setFollowingState(following);

      return { followers, following };
    } catch (error) {
      console.error("Error fetching followers and following:", error);
    }
  };

  useEffect(() => {
    if (userDataState?.id) {
      fetchData();
      myFollowing(userDataState?.id);
    }
  }, [userDataState?.id]);

  const CardList = (cards) => {
    return (
      <SimpleGrid columns={[1, 2, 3]} spacing={10} w={"100%"}>
        {[...cards].reverse().map((card) => (
          <Box
            key={card.id}
            borderWidth="1px"
            borderRadius="0"
            overflow="hidden"
            minH={"100px"}
            cursor={"pointer"}
            onClick={() => {
              navigate(`/board/${card.id}`);
            }}
          >
            <Box ml={3}>
              <Text
                fontFamily={"Pretendard"}
                fontWeight={400}
                mt={2}
                fontSize={14}
              >
                제목 : {card.title}
              </Text>
              <Text
                fontFamily={"Pretendard"}
                fontWeight={300}
                mt={2}
                fontSize={10}
              >
                내용 : {card.content}
              </Text>
              <Text
                fontFamily={"Pretendard"}
                fontWeight={300}
                mt={2}
                fontSize={10}
              >
                좋아요 : {card.like}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <div style={{ background: "rgb(248 247 243)" }}>
      <Flex position="relative">
        <Image
          src={"../4190917.jpg"}
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
          MyPage
        </Text>
      </Flex>
      <Flex
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
      >
        <Flex
          direction="row"
          mt="5%"
          justifyContent={"space-between"}
          w={"50%"}
        >
          <Flex>
            <Text fontFamily={"Pretendard"} fontWeight={300}>
              안녕하세요
            </Text>
            &nbsp;&nbsp;
            <Text fontFamily={"Pretendard"} fontWeight={400}>
              {userDataState?.userName}
            </Text>
            &nbsp;
            <Text fontFamily={"Pretendard"} fontWeight={300}>
              님
            </Text>
          </Flex>
          <Flex>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Text fontFamily={"Pretendard"} fontWeight={300}>
                    팔로우&nbsp;&nbsp;{followersState.length}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {followersState &&
                    followersState?.map((item) => {
                      return (
                        <Text fontFamily={"Pretendard"} fontWeight={300} mb={2}>
                          {item.userName}
                        </Text>
                      );
                    })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Text fontFamily={"Pretendard"} fontWeight={300}>
                    팔로잉&nbsp;&nbsp;{followingState.length}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {followingState &&
                    followingState?.map((item) => {
                      return (
                        <Text fontFamily={"Pretendard"} fontWeight={300} mb={2}>
                          {item.userName}
                        </Text>
                      );
                    })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
        <Flex
          alignItems={"flex-start"}
          w={"50%"}
          mt={"5%"}
          direction={"column"}
        >
          <Text fontFamily={"Pretendard"} fontWeight={300} mb={5}>
            내가 쓴 게시물
          </Text>
          {myPost && CardList(myPost)}
        </Flex>
      </Flex>
    </div>
  );
}

export default MyPage;
