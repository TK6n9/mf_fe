import {
  Box,
  Divider,
  Flex,
  FormControl,
  Input,
  Link,
  Text,
} from "@chakra-ui/react"; // assuming you're using Chakra UI for the components
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../atom/atom";
function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDataState, setUserData] = useRecoilState(userData);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      email,
      password,
    };
    try {
      const respone = await axios.post("http://3.34.127.164/user/login", data, {
        withCredentials: true,
      });
      if (respone.status === 200) {
        const userId = respone.data.user.id;
        console.log("🚀__respone.data.user", respone.data.user);
        setUserData(respone.data.user);
        navigate(`/logined/${userId}`);
      } else {
        navigate(`/error`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <Flex direction="column" alignItems="center" bg="RGB(248 247 243)">
        <text style={{ fontSize: "50px", color: "RGB(24 56 66)" }}>로그인</text>
        <Box width={"50%"} p={4}>
          <FormControl isRequired>
            <Input
              placeholder="E-mail"
              value={email}
              borderRadius="0"
              minHeight="60px"
              _placeholder={{ color: "rgb(24, 56, 66)" }}
              borderColor="rgb(24, 56, 66)"
              variant="unstyled"
              borderWidth="1px"
              boxShadow="none"
              px={4} // 가로 방향 패딩 설정
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              borderRadius="0"
              minHeight="60px"
              _placeholder={{ color: "rgb(24, 56, 66)" }}
              borderColor="rgb(24, 56, 66)"
              variant="unstyled"
              borderWidth="1px"
              boxShadow="none"
              borderTopWidth="0"
              px={4} // 가로 방향 패딩 설정
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box
          as="button"
          px="47px"
          py="14px"
          border="1px"
          borderRadius="100px"
          bg="RGB(24 56 66)"
          onClick={handleSubmit}
          color="white"
          m={"24px"}
        >
          로그인
        </Box>

        <Link href="" mb={"24px"}>
          <Text>비밀번호를 잃어버리셨나요?</Text>
        </Link>
        <Link href="/join-ous" mb={"24px"}>
          <Text>계정이 아직 없습니다.</Text>
        </Link>
        <Flex>
          <Box
            as="button"
            px="27px"
            py="14px"
            border="1px"
            borderRadius="100px"
            bg="RGB(24 56 66)"
            onClick={""}
            m={"12px"}
            color="white"
          >
            카카오 로그인
          </Box>
          <Box
            as="button"
            px="27px"
            py="14px"
            border="1px"
            borderRadius="100px"
            bg="RGB(24 56 66)"
            onClick={""}
            color="white"
            m={"12px"}
          >
            네이버 로그인
          </Box>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}

export default Join;
