import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";
import { useGetNewsLetterEmailQuery } from "../Services/api.service";

const Header = ({ link, btnTitle, title }) => {
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
      position={"sticky"}
      top={0}
      me={0.5}
      // zIndex={999}
      className={`${
        link && btnTitle ? "" : " pt-3 pb-3 "
      } p-2  pe-2 ps-0 fw-400 border-bottom d-flex justify-content-between align-items-center`}
    >
      {/* <span className="fs-5">Community</span> */}

      <Text
        as={"span"}
        fontWeight={"bold"}
        color={"forestGreen.500"}
        className="fs-6 "
      >
        {title}
      </Text>

      {/* <Text fontWeight='bold' bgGradient='linear(to-l, #A5626D, #331E8C)' bgClip='text' as={"span"}  className="fs-6 ">
        {title}
      </Text> */}

      {btnTitle  ? btnTitle != "Export email" ? (
        <Link to={link}>
          <Button
            leftIcon={<AddIcon />}
            colorScheme={"forestGreen"}
            size="sm"
            rounded={"lg"}
          >
            {btnTitle}
          </Button>
        </Link>
      ) : (
        <Button
          leftIcon={<IoMdDownload />}
          backgroundColor={"green.900"}
          _hover={{
            backgroundColor: "green.800",
          }}
          color={"whitesmoke"}
          size="sm"
          rounded={"sm"}
          onClick={handleDownload}
        >
          {btnTitle}
        </Button>
      ):""}
    </Box>
  );
};

export default Header;
