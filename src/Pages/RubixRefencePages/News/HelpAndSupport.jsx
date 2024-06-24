import React from "react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { Box, Text } from "@chakra-ui/react";
import Header from "../../Components/Header";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const HelpAndSupport = () => {
  return (
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      paddingBottom={50}
      height={"100vh"}
    >
      <Box pt={2}>
        <Text className="web-text-large fw-bold text-secondary">
          Follow us on social!
        </Text>
        <Box display={"flex "} alignItems={"center"} gap={2} p={2} ps={0}>
          <FaInstagram
            style={{ color: "#EB2C33" }}
            className="web-text-xlarge fw-bold "
          />{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="md"
            fontWeight="extrabold"
          >
            Instagram
          </Text>
        </Box>

        <Box display={"flex "} alignItems={"center"} gap={2} p={2} ps={0}>
          <FaFacebook
            style={{ color: "#1877F2" }}
            className="web-text-xlarge fw-bold"
          />{" "}
          <Text
            fontSize="lg"
            as={"span"}
            style={{ color: "#1877F2" }}
            className=" fw-bold"
          >
            {" "}
            facebook
          </Text>
        </Box>
      </Box>




      
      <Box pt={2}>
        <Text as={'span'} className="web-text-large fw-bold text-secondary">
        General Inquiries
        </Text>
        <Box display={"flex "} alignItems={"center"} gap={2} p={2} ps={0}>
          <Text
            as={"span"}
            fontSize="sm"
          >
            ideas@wdipl.com
          </Text>
        </Box>
      </Box>

      
      <Box display={"flex "} alignItems={"center"} mt={8} p={2} ps={0}>
          <Text
            as={"span"}
            fontSize="sm"
            className="text-secondary"
          >
            Tanami v1.0.0
          </Text>
        </Box>
    </Box>
  );
};

export default HelpAndSupport;
