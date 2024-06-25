import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const investments = [
  {
    imgSrc:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Multi Family Residence Portfolio",
    sponsor: "KKR",
    annReturn: "12.5%",
    annYield: "12.5%",
    minInvests: "$1,000",
    targClose: "24 December",
    holdingPer: "5-7 years",
    progressValue: 80,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Multi Family Residence Portfolio",
    sponsor: "KKR",
    annReturn: "12.5%",
    annYield: "12.5%",
    minInvests: "$1,000",
    targClose: "24 December",
    holdingPer: "5-7 years",
    progressValue: 80,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Multi Family Residence Portfolio",
    sponsor: "KKR",
    annReturn: "12.5%",
    annYield: "12.5%",
    minInvests: "$1,000",
    targClose: "24 December",
    holdingPer: "5-7 years",
    progressValue: 80,
  },
];

const InvestmentCard = () => {
  return (
    <Box w={"100%"}>
      <Box>
        {investments.map((investment, index) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="scroll"
            variant="outline"
            display={"flex"}
            alignItems={"center"}
            mb={'20px'}
            boxShadow={'md'}
            border={'none'}
          >
            <Image
              p={"15px"}
              rounded={"24px"}
              objectFit="cover"
              w={"200px"}
              h={"160px"}
              src={investment.imgSrc}
              alt={investment.title}
            />

            <Stack>
              <CardBody>
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
              </CardBody>
            </Stack>
            <Stack borderLeft={"1px solid #ccc"}>
              <CardBody>
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
              </CardBody>
            </Stack>
            <Stack>
              <CardBody>
              <Tooltip hasArrow placement='top-start' label={investment.progressValue} bg='white' color='#000'>
                <Progress
                  width={"200px"}
                  value={investment.progressValue}
                  rounded={"10px"}
                  colorScheme={"green"}
                  size={'sm'}
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
              </CardBody>
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default InvestmentCard;
