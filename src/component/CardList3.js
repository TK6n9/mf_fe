import { Flex, Image, Text } from "@chakra-ui/react";

const CardList3 = () => {
  return (
    <Flex justify={"center"}>
      <Flex m={"48px"} direction={"column"}>
        <Text fontSize="5xl" mb={"48px"} mt={"48px"} fontFamily={"Pretendard"}>
          COG 수련원에 관하여
        </Text>
        <Flex>
          <Flex direction={"column"} w={"50%"}>
            <Text fontSize="xl" mb={"48px"} fontFamily={"Pretendard"}>
              COG란 무엇인가요?
            </Text>

            <Text fontSize="sm" mb={"48px"} fontFamily={"Pretendard"}>
              중력의 중심과 톱니바퀴입니다.
              <br />
              <br /> 중력의 중심 처럼 나 자신을 잃지 말자라는 의미와
              <br /> 톱니바퀴처럼 우리는 어쩔 수 없이 어울려 살아야하는 운명,
              <br />
              <br />
              나는 어떤 톱니바퀴로 어떠한 역할을 해야하나라는 의미가 있습니다.
            </Text>

            <Text fontSize="xl" mb={"48px"} fontFamily={"Pretendard"}>
              여기서 무엇을 하면 돼 ?
            </Text>

            <Text fontSize="sm" mb={"48px"} fontFamily={"Pretendard"}>
              자유롭게 글을 쓰고 자신의 생각, 경험, 감정, 악담, 험담 모든 것이
              허용됩니다.
            </Text>

            <Text fontSize="xl" mb={"48px"} fontFamily={"Pretendard"}>
              목적이 뭔데?
            </Text>

            <Text fontSize="sm" mb={"48px"} fontFamily={"Pretendard"}>
              목적은 허무한 삶에 대한 토론이며, 허무한 삶에 어떤 기여를 할 수
              있을까?
              <br />
              내일을 살게 만드는 힘을 만들어 내는 것입니다.
              <br />
              <br />
              어제 길을 걷다가 할머니들끼리 공용체육시절을 이용하는 것을
              보았습니다.
              <br />
              <br />
              도란도란 이야기를 나누며 내일 또 보자 내일은 공원에 가자 약속을
              하는 것<br />
              아침을 반갑게 맞이하는 힘이 아닐까요
            </Text>

            <Text fontSize="xl" mb={"48px"} fontFamily={"Pretendard"}>
              이용에 아무런 댓가는 없는가 ?
            </Text>

            <Text fontSize="sm" mb={"48px"} fontFamily={"Pretendard"}>
              나를 더 발전시키는 목적이므로 비용적 측면은 없고 익명으로
              운영됩니다.
              <br />
              모든 반박, 비난 환영합니다.
            </Text>
          </Flex>
          <Flex mb={"48px"} ml={"48px"} mr={"48px"} w={"50%"}>
            <Image
              src="./444.jpg"
              style={{
                borderRadius: "10px",
                objectFit: "cover",
                maxWidth: "100%",
              }}
            ></Image>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardList3;
