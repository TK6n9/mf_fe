import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Icon, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { useRecoilState } from "recoil";
import { userData, viewTF } from "../atom/atom";
import CardList from "../component/CardList";
import CardList2 from "../component/CardList2";
import CardList3 from "../component/CardList3";
import MainModal from "../component/MainModal";
import "./index.css";
const images = [
  {
    src: "./111.jpg",
    text: "",
    textPosition: {
      width: "50%",
      position: "absolute",
      top: "80%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
  },
  {
    src: "./222.jpg",
    text: "",
    textPosition: {
      width: "50%",
      position: "absolute",
      top: "20px",
      left: "20px",
      textAlign: "center",
    },
  },
  {
    src: "./333.jpg",
    text: "",
    textPosition: {
      width: "50%",
      position: "absolute",
      bottom: "20px",
      right: "20px",
      textAlign: "center",
    },
  },
];
const imageDuration = 5000; // 이미지 전환 간격 (7초)
const fadeDuration = 2; // 이미지 페이드 인/아웃 시간 (2초)

function MainPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userDataState, setUserData] = useRecoilState(userData);
  const [viewTFstate, setViewTF] = useRecoilState(viewTF);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, imageDuration);

    return () => clearInterval(interval);
  }, []);
  const currentImage = images[currentIndex];
  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const cardListRef = useRef(null);
  const cardListRef2 = useRef(null);
  const cardListRef3 = useRef(null);

  const handleScroll = () => {
    if (cardListRef.current) {
      const rect = cardListRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        cardListRef.current.classList.add("slide-up");
      } else {
        cardListRef.current.classList.remove("slide-up");
      }
    }
  };
  const handleScroll2 = () => {
    if (cardListRef2.current) {
      const rect = cardListRef2.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        cardListRef2.current.classList.add("slide-up");
      } else {
        cardListRef2.current.classList.remove("slide-up");
      }
    }
  };
  const handleScroll3 = () => {
    if (cardListRef3.current) {
      const rect = cardListRef3.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        cardListRef3.current.classList.add("slide-up");
      } else {
        cardListRef3.current.classList.remove("slide-up");
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll2);
    window.addEventListener("scroll", handleScroll3);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll2);
      window.removeEventListener("scroll", handleScroll3);
    };
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_PORT}`, {
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

  return (
    viewTFstate && (
      <>
        <Box position="relative" minHeight="500px" height="44.44vw">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={`Image ${index + 1}`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: index === currentIndex ? 1 : 0,
                transition: `opacity ${fadeDuration}s ease`,
              }}
            />
          ))}
          <Text fontSize="md" color="white" {...currentImage.textPosition}>
            {currentImage.text}
          </Text>
          <Flex position="absolute" bottom="24px" right="48px" align="center">
            <Icon
              as={ArrowBackIcon}
              w={5}
              h={5}
              onClick={goToPreviousImage}
              color="white"
              mr={"12px"}
              style={{ cursor: "pointer" }}
            />
            <Icon
              as={ArrowForwardIcon}
              w={5}
              h={5}
              onClick={goToNextImage}
              color="white"
              style={{ cursor: "pointer" }}
            />
          </Flex>
        </Box>
        <div ref={cardListRef} className="hidden">
          <Element name="cardList" className="card-list">
            <CardList />
          </Element>
        </div>
        <div
          ref={cardListRef2}
          className="hidden"
          style={{ background: "rgb(248 247 243)" }}
        >
          <Element name="cardList" className="card-list">
            <CardList2 />
          </Element>
        </div>
        <div ref={cardListRef3} className="hidden">
          <Element name="cardList" className="card-list">
            <CardList3 />
          </Element>
        </div>
        <Divider />
        {userDataState === null || userDataState === undefined ? (
          <MainModal />
        ) : (
          ""
        )}
      </>
    )
  );
}

export default MainPage;
