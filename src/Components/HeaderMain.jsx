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
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";
import { useGetNewsLetterEmailQuery } from "../Services/api.service";
import profile from "../assets/proavatar.webp";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const HeaderMain = ({
  link,
  btnTitle,
  title,
  icon,
  logOutHandler,
  slideDirecttion,
}) => {
  const { colorMode, toggleColorMode } = useContext(GlobalStateContext);

  console.log(colorMode);

  return (
    <Box
      className={` pt-2 pb-2   fw-400 border-bottom d-flex ${
        slideDirecttion ? "flex-row-reverse ps-2" : ""
      }  justify-content-between align-items-center`}
    >
      <Text
        as={"span"}
        fontWeight={"500"}
        // color={"forestGreen.500"}
        className="fs-6 "
      >
        {/* <icon /> */}
        {title}
      </Text>

      
      <Box me={4} gap={2} className="d-flex justify-content-center ">
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
                boxSize={37}
                name="Dan Abrahmov"
                src={profile}
              />
              <Box
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

        {/* <Box onClick={() => toggleColorMode()} as="span" p={2} rounded={'lg'} className="link pointer">
          {colorMode === "light"?  <MdOutlineDarkMode /> :<MdOutlineLightMode />}
        </Box> */}
      </Box>
    </Box>
  );
};

export default HeaderMain;
