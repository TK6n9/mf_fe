import { Flex } from "@chakra-ui/react";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation1702948948770.json";
const AnimationComponent2 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // 애니메이션 JSON 파일
  };

  return (
    <Flex>
      <Lottie options={defaultOptions} height={86} width={86} />
      <Lottie options={defaultOptions} height={86} width={86} />
      <Lottie options={defaultOptions} height={86} width={86} />
      <Lottie options={defaultOptions} height={86} width={86} />
      <Lottie options={defaultOptions} height={86} width={86} />
    </Flex>
  );
};

export default AnimationComponent2;
