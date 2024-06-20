/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Text, SimpleGrid, Card, Image, Box, Flex } from "@chakra-ui/react";
// import map from "../../assets/images/map-pin.png";
import linkedin from "../../assets/linkedin.png";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const CommCard = ({ id, imageUrl, name, jobTitle, description, linkdin }) => {
  return (
    <Box
      // height={"100vh"}
      
      background={"#101015"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
    >
      <Text display={"flex"}>
        <Text
          position="relative"
          overflow="hidden"
          _hover={{
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, #f8697a8c  0%, #8d54f86e  86%)",
              borderRadius: "5px",
            },
          }}
        >
          <Image src={`${API_URL}/${imageUrl}`} />
        </Text>
        <Text
          position={"relative"}
          marginLeft={"10px"}
          _before={{
            content: "''",
            position: "absolute",
            bottom: 0,
            left: "15px",
            height: "84%",
            width: "100%",
            borderLeft: "1px solid #ffffff70",
          }}
        >
          <Link to={linkdin}>
            <img
              src={linkedin}
              style={{ minWidth: "34px", height: "34px", marginBottom: "10px" }}
            />
          </Link>
          {/* <img src={games} style={{ minWidth: "34px", height: "34px" }} /> */}
        </Text>
      </Text>
      {/* <Text
        color={"#fff"}
        fontSize={"16px"}
        marginTop={"12px"}
        maxWidth={"460px"}
        display={"flex"}
      >
        <img src={map} style={{ marginRight: "10px" }} /> {location}
      </Text> */}
      <Text
        color={"#fff"}
        fontSize={"16px"}
        maxWidth={"460px"}
      >
        {name}
      </Text>
      <Text fontSize={"12px"} color={"#DEDEDE"} margin={"2px 0px"}>
        {jobTitle}
      </Text>
      <Text fontSize={"11px"} color={"#DEDEDE"} margin={"3px 0px"}>
        {description}
      </Text>
    </Box>
  );
};

export default CommCard;
