import {
  Box,
  Button,
  Card,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FADE_IN_SCALE_UP, OPACITY_ON_LOAD } from "../../Layout/animations";

const InvestmentCard = ({ investment }) => {
  return (
    <Box
    {...OPACITY_ON_LOAD}
    m={1}
      // direction={{ base: "column", sm: "row" }}
      // overflow="scroll"
      variant="outline"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={4}
      boxShadow={"md"}
      rounded={"md"}
      border={"none"}
      w={'90%'}
      mb={4}
    >
      <Image
        // p={"15px"}
        rounded={"md"}
        objectFit="cover"
        w={"200px"}
        h={"120px"}
        src={investment.imgSrc}
        alt={investment.title}
      />

      <Stack as={"span"}>
        <Box>
          <Heading size="sm" fontWeight={"500"}>
            {investment.title}
          </Heading>
          <Text fontSize="sm" mb={"4px"}>
            Sponsor:{" "}
            <Text as={"span"} fontWeight={"600"}>
              {investment.sponsor}
            </Text>{" "}
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Ann return:{" "}
            <Text as={"span"} fontWeight={"600"}>
              {investment.annReturn}
            </Text>{" "}
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Ann Yield:{" "}
            <Text as={"span"} fontWeight={"600"}>
              {investment.annYield}
            </Text>{" "}
          </Text>
        </Box>
      </Stack>
      <Stack as={"span"} borderLeft={"1px solid #ccc"} p={4}>
        <Box>
          <Text fontSize="sm" mb={"4px"}>
            Min.Invests:{" "}
            <Text as={"span"} fontWeight={"600"}>
              {investment.minInvests}
            </Text>{" "}
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Targ Close:{" "}
            <Text as={"span"} fontWeight={"600"}>
              {investment.targClose}
            </Text>{" "}
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Holding per:{" "}
            <Text as={"span"} fontWeight={"600"}>
              {investment.holdingPer}
            </Text>{" "}
          </Text>
        </Box>
      </Stack>
      <Stack as={"span"}>
        <Box>
          <Tooltip
            hasArrow
            placement="top-start"
            label={investment.progressValue}
            bg="white"
            color="#000"
          >
            <Progress
              width={"200px"}
              value={investment.progressValue}
              rounded={"10px"}
              colorScheme={"green"}
              size={"sm"}
            />
          </Tooltip>
          <Button
            // variant='ghost'
            w={"100%"}
            colorScheme={"gray"}
            rounded={"sm"}
            size={"sm"}
            mt={"20px"}
          >
            View
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default InvestmentCard;
