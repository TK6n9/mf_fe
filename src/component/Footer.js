// src/Footer.js
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { viewTF } from "../atom/atom";
import "./Footer.css";
const Footer = () => {
  const [showText, setShowText] = useState(false);
  const [viewTFstate, setViewTF] = useRecoilState(viewTF);
  const imageWrapperRef = useRef(null);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + window.innerHeight;
      const imageWrapperTop = imageWrapperRef.current.offsetTop;
      const imageHalfHeight = imageWrapperRef.current.clientHeight / 2;

      // 이미지가 화면 절반 정도 보였을 때
      if (scrollPosition > imageWrapperTop + imageHalfHeight) {
        setShowText(true);
      } else {
        setShowText(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    viewTFstate && (
      <>
        <Box
          bg="RGB(248 247 243)"
          color="RGB(24 56 66)"
          p={4}
          minHeight="200px"
        >
          <Flex
            justifyContent="space-between"
            mr={"24px"}
            ml={"24px"}
            mt={"48px"}
          >
            <Flex direction="column">
              <Text fontSize="xl" mb={"0px"} fontFamily={"Pretendard"}>
                CenterOfGravity
              </Text>
              <Text fontSize="md" mb={"24px"} fontFamily={"Pretendard"}></Text>
              {/* <InputGroup size="sm" mb={"24px"}>
              <Input placeholder="이메일" />
              <InputRightAddon children=".com" />
            </InputGroup> */}
              <Flex direction={"row"} mb={"48px"} mt={"24px"}>
                <Link
                  href="https://www.instagram.com/tomato_dev_cog/"
                  mr={"12px"}
                >
                  <FaInstagram />
                </Link>
                <Text fontSize="2xs" fontFamily={"Pretendard"}>
                  @tomato_dev_cog
                </Text>
              </Flex>
              <Text fontSize="2xs" fontFamily={"Pretendard"}>
                © {new Date().getFullYear()} cog 수련원
              </Text>
              <Flex>
                <Link href="/privacy" mr={4}>
                  <Text fontSize="2xs" fontFamily={"Pretendard"}>
                    개인 정보 정책
                  </Text>
                </Link>
                <Link href="/terms" mr={4}>
                  <Text fontSize="2xs" fontFamily={"Pretendard"}>
                    이용약관
                  </Text>
                </Link>
                <Link href="/terms" mr={4}>
                  <Text fontSize="2xs" fontFamily={"Pretendard"}>
                    쿠키
                  </Text>
                </Link>
              </Flex>
            </Flex>
            <Flex direction="row">
              <Flex direction="column" alignItems={"flex-start"} mr={"150px"}>
                <Text mb={"24px"} fontSize="xl" fontFamily={"Pretendard"}>
                  마음수련
                </Text>
                <Link href="">
                  <Text mb={"24px"} fontFamily={"Pretendard"} fontSize="sm">
                    우리의 이야기
                  </Text>
                </Link>
                <Link href="">
                  <Text mb={"24px"} fontFamily={"Pretendard"} fontSize="sm">
                    신문
                  </Text>
                </Link>
                <Link href="">
                  <Text mb={"24px"} fontFamily={"Pretendard"} fontSize="sm">
                    마스터 클래스
                  </Text>
                </Link>
              </Flex>
              <Flex direction="column" alignItems={"flex-start"}>
                <Text mb={"24px"} fontSize="xl" fontFamily={"Pretendard"}>
                  지원하다
                </Text>
                <Link href="">
                  <Text mb={"24px"} fontFamily={"Pretendard"} fontSize="sm">
                    질의응답
                  </Text>
                </Link>
                <Link href="">
                  <Text mb={"24px"} fontFamily={"Pretendard"} fontSize="sm">
                    연락하다
                  </Text>
                </Link>

                <Link href="">
                  <Text mb={"24px"} fontFamily={"Pretendard"} fontSize="sm">
                    후원하다
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <div className="image-wrapper" ref={imageWrapperRef}>
          <div
            className={"image-content"}
            style={{
              height: "800px",
              backgroundImage: 'url("/4190917.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              backgroundAttachment: "fixed",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Flex direction={"row"} fontSize="4xl" mr={"48px"} ml={"48px"}>
              <Flex
                justifyContent="space-between"
                className={showText ? "fade-in" : "hidden"}
                w={"100%"}
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  color: "white",
                  padding: "50px",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                <Text
                  fontSize="3xl"
                  color="white"
                  w={"50%"}
                  mt={"50px"}
                  mr={"48px"}
                  fontFamily={"Pretendard"}
                >
                  시간이 지나도 변하지 않는 가치를 만들어 보겠습니다.
                </Text>
                <Text
                  color="white"
                  fontSize="md"
                  w={"50%"}
                  mt={"50px"}
                  fontFamily={"Pretendard"}
                >
                  우리의 삶은 어디서 왔고 어디로 가야하는가를 탐구하는 곳입니다.
                </Text>
              </Flex>
            </Flex>
          </div>
        </div>
      </>
    )
  );
};

export default Footer;
