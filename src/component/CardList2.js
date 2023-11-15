import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import "./CardList2.css";

function CardList2() {
  const [hover1, setHover1] = useState(true); // 초기 값을 true로 변경
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

  const updateScreenSize = debounce(() => {
    setIsLargeScreen(window.innerWidth > 1024);
  }, 300);
  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  useEffect(() => {
    if (isLargeScreen) {
      setHover1(true);
      setHover2(false);
      setHover3(false);
      setHover4(false);
    } else {
      setHover1(true);
      setHover2(true);
      setHover3(true);
      setHover4(true);
    }
  }, [isLargeScreen]);

  return isLargeScreen === true ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "156px",
      }}
    >
      <div
        onMouseEnter={() => {
          setHover1(true);
          setHover2(false);
          setHover3(false);
          setHover4(false);
        }}
        className={`image-container1 ${hover1 ? "hover" : ""}`}
        style={{
          display: "flex",
          justifyContent: hover1 ? "flex-start" : "center",
          alignItems: "center",
        }}
      >
        {hover1 === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "55px",
            }}
          >
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "36px",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.53",
                letterSpacing: "-1.08px",
                textAlign: "left",
                color: "#fff",
              }}
            ></text>
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "20px",
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.75",
                letterSpacing: "-0.6px",
                textAlign: "left",
                color: "#fff",
              }}
            >
              본능이 악이라면 이성은 천사인가?
            </text>
            {/* <img
              src="./orangArrowIcon.png"
              alt=""
              style={{ width: "60px", height: "60px" }}
            ></img> */}
          </div>
        ) : (
          <text
            style={{
              fontFamily: "Pretendard",
              fontSize: "22px",
              fontWeight: "normal",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "1.36",
              letterSpacing: "-0.66px",
              textAlign: "left",
              color: "#fff",
            }}
          ></text>
        )}
      </div>
      <div
        onMouseEnter={() => {
          setHover2(true);
          setHover1(false);
          setHover3(false);
          setHover4(false);
        }}
        className={`image-container2 ${hover2 ? "hover" : ""}`}
        style={{
          display: "flex",
          justifyContent: hover2 ? "flex-start" : "center",
          alignItems: "center",
        }}
      >
        {hover2 === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "55px",
            }}
          >
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "36px",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.53",
                letterSpacing: "-1.08px",
                textAlign: "left",
                color: "#fff",
              }}
            ></text>
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "20px",
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.75",
                letterSpacing: "-0.6px",
                textAlign: "left",
                color: "#fff",
              }}
            >
              부처를 만나면 부처를 죽이고 조사를 만나면 조사를 죽여라.
            </text>
            {/* <img
              src="./orangArrowIcon.png"
              alt=""
              style={{ width: "60px", height: "60px" }}
            ></img> */}
          </div>
        ) : (
          <text
            style={{
              fontFamily: "Pretendard",
              fontSize: "22px",
              fontWeight: "normal",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "1.36",
              letterSpacing: "-0.66px",
              textAlign: "left",
              color: "#fff",
            }}
          ></text>
        )}
      </div>

      <div
        onMouseEnter={() => {
          setHover3(true);
          setHover1(false);
          setHover2(false);
          setHover4(false);
        }}
        className={`image-container3 ${hover3 ? "hover" : ""}`}
        style={{
          display: "flex",
          justifyContent: hover3 ? "flex-start" : "center",
          alignItems: "center",
        }}
      >
        {hover3 === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "55px",
            }}
          >
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "36px",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.53",
                letterSpacing: "-1.08px",
                textAlign: "left",
                color: "#fff",
              }}
            ></text>
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "20px",
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.75",
                letterSpacing: "-0.6px",
                textAlign: "left",
                color: "#fff",
              }}
            >
              나 자신까지 속여 버릴 것인가?
            </text>
            {/* <img
              src="./orangArrowIcon.png"
              alt=""
              style={{ width: "60px", height: "60px" }}
            ></img> */}
          </div>
        ) : (
          <text
            style={{
              fontFamily: "Pretendard",
              fontSize: "22px",
              fontWeight: "normal",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "1.36",
              letterSpacing: "-0.66px",
              textAlign: "left",
              color: "#fff",
            }}
          ></text>
        )}
      </div>
      <div
        onMouseEnter={() => {
          setHover4(true);
          setHover1(false);
          setHover2(false);
          setHover3(false);
        }}
        className={`image-container4 ${hover4 ? "hover" : ""}`}
        style={{
          display: "flex",
          justifyContent: hover4 ? "flex-start" : "center",
          alignItems: "center",
        }}
      >
        {hover4 === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "55px",
            }}
          >
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "36px",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.53",
                letterSpacing: "-1.08px",
                textAlign: "left",
                color: "#fff",
              }}
            ></text>
            <text
              style={{
                fontFamily: "Pretendard",
                fontSize: "20px",
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.75",
                letterSpacing: "-0.6px",
                textAlign: "left",
                color: "#fff",
              }}
            >
              우리는 창조자이면서 동시에 조력자가 되어야한다.
            </text>
            {/* <img
              src="./orangArrowIcon.png"
              alt=""
              style={{ width: "60px", height: "60px" }}
            ></img> */}
          </div>
        ) : (
          <text
            style={{
              fontFamily: "Pretendard",
              fontSize: "22px",
              fontWeight: "normal",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "1.36",
              letterSpacing: "-0.66px",
              textAlign: "left",
              color: "#fff",
            }}
          ></text>
        )}
      </div>
    </div>
  ) : (
    <div>
      <div
        className="min-image-container1"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "36px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.53",
            letterSpacing: "-1.08px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        ></text>
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.75",
            letterSpacing: "-0.6px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        >
          본능이 악이라면 이성은 천사인가?
        </text>
        {/* <img
          src="./orangArrowIcon.png"
          alt=""
          style={{ width: "60px", height: "60px", marginLeft: "50px" }}
        ></img> */}
      </div>
      <div
        className="min-image-container2"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "36px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.53",
            letterSpacing: "-1.08px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        ></text>
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.75",
            letterSpacing: "-0.6px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        >
          부처를 만나면 부처를 죽이고 조사를 만나면 조사를 죽여라.
        </text>
        {/* <img
          src="./orangArrowIcon.png"
          alt=""
          style={{ width: "60px", height: "60px", marginLeft: "50px" }}
        ></img> */}
      </div>
      <div
        className="min-image-container3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "36px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.53",
            letterSpacing: "-1.08px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        ></text>
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.75",
            letterSpacing: "-0.6px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        >
          나 자신까지 속여 버릴 것인가?
        </text>
        {/* <img
          src="./orangArrowIcon.png"
          alt=""
          style={{ width: "60px", height: "60px", marginLeft: "50px" }}
        ></img> */}
      </div>

      <div
        className="min-image-container4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "36px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.53",
            letterSpacing: "-1.08px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        ></text>
        <text
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.75",
            letterSpacing: "-0.6px",
            textAlign: "left",
            color: "#fff",
            marginLeft: "55px",
          }}
        >
          우리는 창조자이면서 동시에 조력자가 되어야한다.
        </text>
        {/* <img
          src="./orangArrowIcon.png"
          alt=""
          style={{ width: "60px", height: "60px", marginLeft: "50px" }}
        ></img> */}
      </div>
    </div>
  );
}
export default CardList2;
