import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";
import { useGetNewsLetterEmailQuery } from "../Services/api.service";

const HeaderMain = ({ link, btnTitle, title, icon, logOutHandler }) => {
  const { data, error, isLoading } = useGetNewsLetterEmailQuery();

  const handleDownload = () => {
    if (Array.isArray(data?.data?.rows)) {
      const worksheet = XLSX.utils.json_to_sheet(data?.data?.rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "newsletter_emails.xlsx");
    } else {
      // // console.error(
      //   "Expected data to be an array but received:",
      //   data?.data?.rows
      // );
    }
  };
  return (
    <Box
      backgroundColor={"#fff"}
      // bg="white.900"
      // backdropFilter="blur(10px) hue-rotate(90deg)"
      // h={12}
      className={` pt-2 pb-2 fw-400 border-bottom d-flex justify-content-between align-items-center`}
    >
      {/* <span className="fs-5">Community</span> */}

      <Text
        as={"span"}
        fontWeight={"bold"}
        color={"forestGreen.500"}
        className="fs-6 "
      >
        {/* <icon /> */}
        {title}
      </Text>

      <Box me={4} className="d-flex justify-content-center ">
        <Popover placement="bottom">
          <Portal>
            <PopoverContent maxW="200px" className="">
              <PopoverArrow />
              <PopoverBody className="web-text-medium pointer link">
                Profile
              </PopoverBody>
              <Link to={"/help-and-support"}>
                <PopoverBody className="web-text-medium pointer ">
                  Help & Support
                </PopoverBody>
              </Link>
              <PopoverFooter
                onClick={logOutHandler}
                className="web-text-medium pointer link"
              >
                Log Out
              </PopoverFooter>
            </PopoverContent>
          </Portal>
          <PopoverTrigger>
            <Box
              // onClick={logOutHandler}
              className="d-flex pointer  align-items-center"
            >
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
              <Box
                color={"gray.800"}
                style={{
                  display: "flex",
                }}
                className=" overflow-hidden ms-3  flex-column "
              >
                <Text as={"span"} className="web-text-small">
                  Hello, developer admin
                </Text>
                <Text as={"span"} className="web-text-xsmall">
                  siddhesh@rubix.com
                </Text>
              </Box>
            </Box>
          </PopoverTrigger>
        </Popover>
      </Box>
    </Box>
  );
};

export default HeaderMain;
