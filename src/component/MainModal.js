import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { default as React, useState } from "react";

function MainModal() {
  const { onClose } = useDisclosure();
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [userNameState, setUserNameState] = useState();
  const [passwordState, setPasswordState] = useState();

  const handleRegister = async () => {
    if (!userNameState || !passwordState) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    try {
      const req = await axios.post(
        "http://3.34.127.164/auth/join",
        {
          userNameState,
          passwordState,
        },
        { withCredentials: true }
      );
      console.log("#__계정등록성공", req);

      if (req.status === 200) {
        setIsSignup(false);
        setIsLogin(true);
      }
    } catch (error) {
      console.log("#__계정등록 고장남", error);
      alert(error.response.data);
    }
  };

  //여기서부터 프론트 로그인로직
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginSubmit = async () => {
    const data = {
      userName: loginUserName,
      password: loginPassword,
    };
    try {
      const req = await axios.post("http://3.34.127.164/auth/login", data, {
        withCredentials: true,
      });
      console.log("#__로그인성공", req);
      if (req.status === 200) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("#__로그인버튼고장남", error);
      alert(error.response.data);
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.900" />

        <ModalContent
          borderRadius="0"
          border="0"
          boxShadow="none"
          bg="rgb(248, 247, 243)"
        >
          {isSignup ? (
            <>
              <ModalHeader>
                <Text fontFamily={"Pretendard"}>회원가입</Text>
              </ModalHeader>
              <ModalBody>
                <FormControl mt={4}>
                  <FormLabel>
                    <Text fontFamily={"Pretendard"}>닉네임</Text>
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="닉네임이 곧 아이디"
                    onChange={(e) => setUserNameState(e.target.value)}
                    borderRadius="0"
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
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    <Text fontFamily={"Pretendard"}>비밀번호</Text>
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="비밀번호를 설정하세요"
                    onChange={(e) => setPasswordState(e.target.value)}
                    borderRadius="0"
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
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  bg="rgb(6,57,55)"
                  color="white"
                  _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
                  mr={3}
                  onClick={handleRegister}
                >
                  <Text fontFamily={"Pretendard"}>가입</Text>
                </Button>
                <Button
                  bg="rgb(6,57,55)"
                  color="white"
                  _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
                  onClick={() => setIsSignup(false)}
                >
                  <Text fontFamily={"Pretendard"}>뒤로</Text>
                </Button>
              </ModalFooter>
            </>
          ) : isLogin ? (
            <>
              <ModalHeader>
                <Text fontFamily={"Pretendard"}>로그인</Text>
              </ModalHeader>
              <ModalBody>
                <FormControl>
                  <FormLabel>
                    <Text fontFamily={"Pretendard"}>닉네임</Text>
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="본인 닉네임 입력"
                    onChange={(e) => setLoginUserName(e.target.value)}
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
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    <Text fontFamily={"Pretendard"}>비밀번호</Text>
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={(e) => setLoginPassword(e.target.value)}
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
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  bg="rgb(6,57,55)"
                  color="white"
                  _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
                  mr={3}
                  onClick={handleLoginSubmit}
                >
                  <Text fontFamily={"Pretendard"}>로그인</Text>
                </Button>
                <Button
                  bg="rgb(6,57,55)"
                  color="white"
                  _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
                  onClick={() => {
                    setIsSignup(true);
                    setIsLogin(false);
                  }}
                >
                  <Text fontFamily={"Pretendard"}>회원가입하기</Text>
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader>
                <Text fontFamily={"Pretendard"}>🧘‍♀️ COG 수련원 알림 🧘‍♂️</Text>
              </ModalHeader>
              <ModalBody>
                <Text fontFamily={"Pretendard"}>
                  회원인 경우만 이용이 가능합니다.
                </Text>
                <br />
                <Text fontFamily={"Pretendard"}>회원가입을 하시겠습니까 ?</Text>
                <br />
                <Text
                  fontFamily={"Pretendard"}
                  fontSize={"12px"}
                  fontWeight={300}
                >
                  잔 버그 있음,, 아직 추가 개발 중 할 거 많음...반응형고려x 예정
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{
                    width: "100px",
                    alignSelf: "end",
                  }}
                  bg="rgb(6,57,55)"
                  color="white"
                  mr={3}
                  onClick={() => setIsSignup(true)}
                  _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
                >
                  <Text fontFamily={"Pretendard"}>회원가입</Text>
                </Button>
                <Button
                  bg="rgb(6,57,55)"
                  color="white"
                  _hover={{ bg: "rgb(6,57,55)", textDecoration: "none" }}
                  onClick={() => {
                    setIsSignup(false);
                    setIsLogin(true);
                  }}
                >
                  <Text fontFamily={"Pretendard"}>이미 회원입니다.</Text>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default MainModal;
