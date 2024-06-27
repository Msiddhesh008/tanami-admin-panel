import {
  Badge,
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
import { OPACITY_ON_LOAD } from "../../Layout/animations";

const InvestmentCard = ({ investment }) => {
  return (
    <Card
      {...OPACITY_ON_LOAD}
      direction={{ base: "column", sm: "row" }}
      variant="outline"
      display={"flex"}
      alignItems={"center"}
      mb={"20px"}
      boxShadow={"md"}
      border={"none"}
      mt={2}
    >
      <Image
        p={"14px"}
        rounded={"24px"}
        objectFit="cover"
        w={"200px"}
        h={"140px"}
        src={investment?.banner_image}
        alt={investment?.ioName}
      />

      <Stack w={"38%"}>
        <CardBody>
          <Heading size="sm" fontWeight={"500"}>
            {investment?.ioName}
            <Badge
              colorScheme={
                investment?.status === "Available"
                  ? "teal"
                  : investment?.status === "Upcomming"
                  ? "green"
                  : "red"
              }
              ps={2}
              pe={2}
              pt={0.5}
              pb={0.5}
              fontSize={"xs"}
              ms={3}
            >
              {investment?.status === "Available"
                ? "Available"
                : investment?.status === "Upcomming"
                ? "Upcomming"
                : "Closed"}
            </Badge>
          </Heading>
          <Text fontSize="sm" mb={"4px"}>
            Sponsor: 
            <Text as={"span"} fontWeight={"600"}>
              {investment?.sponserName}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Ann return: 
            <Text as={"span"} fontWeight={"600"}>
              {investment?.annualReturn}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Ann Yield: 
            <Text as={"span"} fontWeight={"600"}>
              {investment?.annualyield}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Tenure: 
            <Text as={"span"} fontWeight={"600"}>
              {investment?.tenure}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Quaterly: 
            <Text as={"span"} fontWeight={"600"}>
              {investment?.quaterly}
            </Text>
          </Text>
        </CardBody>
      </Stack>
      <Stack borderLeft={"1px solid #ccc"}>
        <CardBody>
        <Text fontSize="sm" mb={"4px"}>
              Destributed Amount: 
            <Text as={"span"} fontWeight={"600"}>
              {investment?.destributedAmount}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Min.Invests:
            <Text as={"span"} fontWeight={"600"}>
              {investment?.minInvests}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Targ Close:
            <Text as={"span"} fontWeight={"600"}>
              {new Date(investment?.targetClose).toLocaleDateString()}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"}>
            Year: 
            <Text as={"span"} fontWeight={"600"}>
              {investment?.year}
            </Text>
          </Text>
        </CardBody>
      </Stack>
      <Stack>
        <CardBody>
          <Box
            as="span"
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
          >
            <Text fontSize={"xs"} fontWeight={500} as={"span"}>
              $ 500,000.450
            </Text>
            <Text fontSize={"xs"} fontWeight={500} as={"span"}>
              75 % Funded
            </Text>
          </Box>
          <Progress
            width={"200px"}
            value={75} // Assuming a static progress value
            rounded={"10px"}
            colorScheme={"green"}
            size={"sm"}
          />
          <Button
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
  );
};

export default InvestmentCard;
