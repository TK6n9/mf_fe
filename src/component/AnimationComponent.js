import { Flex } from "@chakra-ui/react";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation1702949206866.json";
const AnimationComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // 애니메이션 JSON 파일
  };

  return (
    <Flex>
      <Lottie options={defaultOptions} height={64} width={64} />
      <Lottie options={defaultOptions} height={64} width={64} />
      <Lottie options={defaultOptions} height={64} width={64} />
      <Lottie options={defaultOptions} height={64} width={64} />
      <Lottie options={defaultOptions} height={64} width={64} />
    </Flex>
  );
};

export default AnimationComponent;
