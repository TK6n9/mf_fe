// src/Navbar.js
import { Divider, Flex, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useRecoilState } from "recoil";
import { userData, viewTF } from "../atom/atom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();

  const [userDataState, setUserData] = useRecoilState(userData);
  const [viewTFstate, setViewTF] = useRecoilState(viewTF);

  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_PORT}/`, {
        withCredentials: true,
      });
      setUserData(response.data);
      setViewTF(true);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const [showText, setShowText] = useState(false);
  const [index, setIndex] = useState(0);
  const texts = [
    "시간이 지나도 변하지 않는 가치",
    "내일은 또 다른 처음입니다.",
    "배는 주변의 바닷물로 바다에 떠 있을 수 있지만, 바닷물이 배 안으로 들어 올땐 배는 침몰한다.",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 2000);
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setShowText(true);
      }, 2000);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [texts.length]);
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_PORT}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // handleLogout();
  }, []);

  return (
    viewTFstate && (
      <>
        <Flex
          w={"100%"}
          bg="RGB(24 56 55)"
          height={"24px"}
          align={"center"}
          justify={"center"}
          as={"nav"}
          position="sticky"
          top="0"
          zIndex="1"
        >
          <CSSTransition
            classNames={{
              enter: "slide-enter",
              enterActive: "slide-enter-active",
              exit: "slide-exit",
              exitActive: "slide-exit-active",
            }}
            in={showText}
            timeout={2000}
            unmountOnExit
          >
            <Text fontSize="xs" color={"white"} fontFamily={"Pretendard"}>
              {texts[index]}
            </Text>
          </CSSTransition>
        </Flex>
        <Flex
          as={"nav"}
          align={"center"}
          height={"70px"}
          justify="space-between"
          wrap="wrap"
          bg="white"
          color="RGB(24 56 66)"
          position="sticky"
          top="0"
          zIndex="1"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        >
          <Flex align="center" ml={"24px"}>
            <Link href="/">
              <Text fontSize="xl" fontFamily={"Pretendard"}>
                ⚙️ COG ⚙️
              </Text>
            </Link>
          </Flex>
          <Flex align="center">
            <Link href="/board" mr={"48px"}>
              <Text fontFamily={"Pretendard"}>Community</Text>
            </Link>
            {userDataState === null || userDataState === undefined ? (
              ""
            ) : (
              <>
                <Link href="/mypage" mr={"48px"}>
                  <Flex>
                    <Text fontFamily={"Pretendard"}>{"Welcome 🙋🏻‍♀️"}</Text>
                    &nbsp;&nbsp;
                    <Text fontFamily={"Pretendard"}>
                      {userDataState.userName}
                    </Text>
                  </Flex>
                </Link>
                <Link onClick={handleLogout} style={{ marginRight: "48px" }}>
                  <Text fontFamily={"Pretendard"}>Logout</Text>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
        <Divider />
      </>
    )
  );
};

export default Navbar;
