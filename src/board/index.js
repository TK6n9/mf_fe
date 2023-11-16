import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"; // assuming you're using Chakra UI for the components
import moment from "moment";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
function Board() {
  const navigate = useNavigate();
  const [SortName, setSortName] = useState("정렬");
  const [sortOrder, setSortOrder] = useState("desc"); // 정렬 상태

  const [postData, setPostData] = useState();

  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleMenuItemClick = (newSortName) => {
    let sortQuery;
    switch (newSortName) {
      case "최신순":
        sortQuery = "desc";
        break;
      case "오래된순":
        sortQuery = "asc";
        break;
      // 기타 정렬 기준에 대한 case 추가 가능
      default:
        sortQuery = "desc";
    }
    setSortOrder(sortQuery);
    setSortName(newSortName);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 초기화
    fetchData(sortQuery);
  };

  const fetchData = async (sortQuery) => {
    try {
      const response = await axios.get(
        `https://3.34.127.164/posts?page=${currentPage}&pageSize=${pageSize}&sort=${sortQuery}`,
        {
          withCredentials: true,
        }
      );

      setPostData(response.data.posts);
      setTotalPages(response.data.totalPages); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
    }
  };
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    const isSelected = i === currentPage;
    paginationButtons.push(
      <button
        key={i}
        onClick={() => {
          setCurrentPage(i);
          fetchData(sortOrder); // 페이지 변경 시 `fetchData` 호출, `sortOrder` 인자 추가
        }}
        style={{
          marginLeft: "20px",
          fontSize: isSelected ? "24px" : "18px",
        }}
        disabled={i === currentPage}
      >
        {i}
      </button>
    );
  }

  const handleRowClick = (postId) => {
    navigate(`/board/${postId}`);
  };

  useEffect(() => {
    fetchData(sortOrder);
  }, [currentPage, sortOrder]);

  return (
    <>
      <Flex position="relative">
        <Image
          src={"./777.jpg"}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "15vw",
            minHeight: "300px",
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
          }}
          fontSize="xl"
          color="white"
          fontFamily={"Pretendard"}
        >
          Community
        </Text>
      </Flex>

      <Flex w={"100%"} bg="RGB(248 247 243)" justify={"center"}>
        <Flex direction={"column"} w={"80%"}>
          <Menu variant="unstyled">
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              style={{
                alignSelf: "end",
                margin: "24px 0px 24px 0px",
                background: "none",
              }}
            >
              <Text fontFamily={"Pretendard"}>{SortName}</Text>
              <ChevronDownIcon />
            </MenuButton>

            <MenuList
              variant="unstyled"
              bg="rgba(248,247,243,0.3)"
              sx={{
                // 메뉴의 크기를 조정
                minW: "100px",
                maxWidth: "200px",
                ".chakra-menu__menuitem": {
                  justifyContent: "center",
                  fontSize: "sm",
                },
              }}
            >
              <MenuItem
                bg="rgba(248,247,243,0.3)"
                variant="unstyled"
                onClick={() => handleMenuItemClick("최신순")}
                fontFamily={"Pretendard"}
              >
                최신순
              </MenuItem>
              <MenuItem
                bg="rgba(248,247,243,0.3)"
                variant="unstyled"
                onClick={() => handleMenuItemClick("오래된순")}
                fontFamily={"Pretendard"}
              >
                오래된순
              </MenuItem>
              <MenuItem
                bg="rgba(248,247,243,0.3)"
                variant="unstyled"
                onClick={() => handleMenuItemClick("좋아요 많은순")}
                fontFamily={"Pretendard"}
              >
                좋아요 많은순
              </MenuItem>
              <MenuItem
                bg="rgba(248,247,243,0.3)"
                variant="unstyled"
                onClick={() => handleMenuItemClick("댓글많은순")}
                fontFamily={"Pretendard"}
              >
                댓글많은순
              </MenuItem>
            </MenuList>
          </Menu>

          <TableContainer>
            <Table size="sm" variant="unstyled">
              <Thead>
                <Tr>
                  <Th fontFamily={"Pretendard"}> 글번호</Th>
                  <Th fontFamily={"Pretendard"}>제목</Th>
                  <Th fontFamily={"Pretendard"}>작성자</Th>
                  <Th fontFamily={"Pretendard"}>생성시간</Th>
                  <Th fontFamily={"Pretendard"}>좋아요</Th>
                </Tr>
              </Thead>
              <Tbody>
                {postData?.map((item, index) => {
                  return (
                    <Tr
                      key={item.id}
                      onClick={() => handleRowClick(item.id)}
                      borderBottom="1px solid rgba(6, 57, 55 , 0.3)"
                      style={{ cursor: "pointer" }}
                    >
                      <Td fontFamily={"Pretendard"}>{item.id}</Td>
                      <Td fontFamily={"Pretendard"}>{item.title}</Td>
                      <Td fontFamily={"Pretendard"}>{item.User.userName}</Td>
                      <Td fontFamily={"Pretendard"}>
                        {moment(item.createdAt).format("YY/MM/DD")}
                      </Td>
                      <Td fontFamily={"Pretendard"}>{item.like}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>

          <Box
            as="button"
            px="24px"
            py="7px"
            border="1px"
            borderRadius="100px"
            bg="RGB(24 56 66)"
            onClick={() => {
              navigate("/write-post");
            }}
            color="white"
            m={"24px 0px 24px 0px"}
            style={{
              width: "100px",
              alignSelf: "end",
            }}
          >
            <Text fontFamily={"Pretendard"}>글쓰기</Text>
          </Box>
          <div style={{ fontFamily: "Pretendard" }}>{paginationButtons}</div>
        </Flex>
      </Flex>
    </>
  );
}

export default Board;
