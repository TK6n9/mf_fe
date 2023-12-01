// src/CardList.js
import { Flex, Text } from "@chakra-ui/react";

const CardList = () => {
  return (
    <>
      <Flex align={"center"} justify={"center"} m={"86px"}>
        <Text
          fontSize="6xl"
          fontFamily={"Pretendard"}
          style={{
            background: "linear-gradient(#44008b 0 100%)",
            backgroundPosition: "0 calc(100% - 40px)",
            backgroundSize: "100% 14px",
            backgroundRepeat: "no-repeat",
          }}
        >
          🪐CENTER ⚙️F GRAVITY🌏
        </Text>
      </Flex>
      <Flex
        mr={"24px"}
        ml={"24px"}
        mb={"86px"}
        justifyContent={"space-between"}
      >
        <Flex direction={"column"} alignItems="center" w={"25%"}>
          <Text textAlign="center" mb={"48px"} fontSize={"6xl"}>
            ⚙️
          </Text>
          <Text textAlign="center" fontFamily={"Pretendard"} fontSize={"xs"}>
            인생 톱니바퀴
            <br />
          </Text>
        </Flex>
        <Flex direction={"column"} alignItems="center" w={"25%"}>
          <Text textAlign="center" mb={"48px"} fontSize={"6xl"}>
            👁️
          </Text>
          <Text textAlign="center" fontFamily={"Pretendard"} fontSize={"xs"}>
            보이는 것 <br />
            보이지 않는 것
          </Text>
        </Flex>
        <Flex direction={"column"} alignItems="center" w={"25%"}>
          <Text textAlign="center" mb={"48px"} fontSize={"6xl"}>
            ⏱️
          </Text>
          <Text textAlign="center" fontFamily={"Pretendard"} fontSize={"xs"}>
            씨앗을 심는 시기,
            <br />
            새싹이 자라는 시기,
            <br />
            성장하는 시기,
            <br />
            열매를 맺는 시기 존재하는가
          </Text>
        </Flex>
        <Flex direction={"column"} alignItems="center" w={"25%"}>
          <Text textAlign="center" mb={"48px"} fontSize={"6xl"}>
            🛥️
          </Text>
          <Text textAlign="center" fontFamily={"Pretendard"} fontSize={"xs"}>
            배는 주변의 바닷물로 <br />
            바다에 떠 있을 수 있지만,
            <br />
            바닷물이 배 안으로 들어 올땐
            <br /> 배는 침몰한다.
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CardList;
