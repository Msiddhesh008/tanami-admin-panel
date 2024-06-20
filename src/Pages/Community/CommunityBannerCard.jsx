import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import WebButton from "../../Components/WebButton";
import { formatDate } from "../../Components/Functions/UTCConvertor";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const CommunityBannerCard = ({
  bgImage,
  subHeading,
  heading,
  ctoBtnTitle,
  createdAt,
  status,
}) => {
  return (
    <Card
      color={"teal.900"}
      w={"100%"}
      h={"100%"}
      size={"md"}
      // boxShadow="md"
      // overflow={"hidden"}
      position={"relative"}
      // rounded={"lg"}
      boxShadow={
        " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      }
      
      borderRadius={8.5}
    >
      <CardBody
        position={"absolute"}
        h={"100%"}
        w={"100%"}
        bottom={0}
        // border={"1px solid #9B4651"}
        borderRadius={'sm'}
        overflow={"hidden"}
        bgImage={`${API_URL}/${bgImage}`}
        bgSize="cover"
        bgPosition="center"
        // backgroundColor={status ? "#ffe5ea": '#ffffff'}
        backdropFilter="blur(1px)"
      >
        {status ? (
          <Badge
            position={"absolute"}
            top={2}
            right={-2}
            pe={3}
            colorScheme="green"
            variant='solid'
          >
            Active
          </Badge>
        ) : (
          <Badge
            position={"absolute"}
            top={2}
            right={-2}
            pe={3}
            colorScheme="red"
            variant='solid'
          >
            Inactive
          </Badge>
        )}

        <Box
          mb={0}
          display={"flex"}
          justifyContent={"space-between"}
          h={"100%"}
          w={"100%"}
        >
          <Box
            w={40}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
          >
            <Tooltip
              className="rounded-2 web-text-xsmall"
              width={"fit-content"}
              placement="top"
              hasArrow
              label={heading}
              bg="blue.200"
            >
              <Box
                display={"flex"}
                className="web-text-large fw-bold"
                alignItems={"center"}
                w={"100%"}
              >
                <Text color={"#DE858E"} as={"span"} isTruncated={true}>
                  {heading}
                </Text>
              </Box>
            </Tooltip>

            <Box
              display={"flex"}
              className="web-text-large fw-bold"
              alignItems={"center"}
              w={180}
            >
              <Tooltip
                className="rounded-2 web-text-xsmall"
                width={"fit-content"}
                placement="top"
                hasArrow
                label={subHeading}
                bg="blue.200"
              >
                <Text
                  className="web-text-medium"
                  as={"span"}
                  isTruncated={true}
                  color={'whitesmoke'}
                >
                  {subHeading}
                </Text>
              </Tooltip>
            </Box>
            <Button
              fontWeight={"normal"}
              className="web-text-xsmall"
              ps={3}
              pe={3}
              pt={1}
              pb={1}
              mt={2}
              color={"#ffffff"}
              _hover={{
                bgGradient:"linear(to-r, #1E114B, purple)"
              }}
              // bg={'#1E114B'}
              // bgGradient="linear(to-r, #1E114B, purple)"
              variant={"outline"}
              // colorScheme="purple"
              rounded={"sm"}
              size={"xs"}
              // border={'1px soild #fff'}
              
            >
              {ctoBtnTitle}
            </Button>
          </Box>

          {/* <Box display={"flex"} alignItems={"center"}>
            <Image
              boxShadow={"inner"}
              rounded={"md"}
              w={130}
              h={"75px"}
              src={`${API_URL}/${bgImage}`}
            />
          </Box> */}
        </Box>
      </CardBody>
      <span
        className="web-text-xsmall text-secondary fw-bold"
        style={{
          position: "absolute",
          bottom: 4,
          right: 10,
          opacity: 1,
        }}
      >
        {formatDate(createdAt)}
      </span>
    </Card>
  );
};

export default CommunityBannerCard;
