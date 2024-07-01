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
        w={"180px"}
        h={"160px"}
        src={investment?.banner_image}
        alt={investment?.ioName}
      />

      <Stack w={"22%"}>
        <CardBody p={"18px 12px 18px 0px"}>
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
              fontWeight={'600'}
            >
              {investment?.status === "Available"
                ? "Available"
                : investment?.status === "Upcomming"
                ? "Upcomming"
                : "Closed"}
            </Badge>
          </Heading>
          <Text
            fontSize="sm"
            mb={"4px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            Sponsor:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.sponserName}
            </Text>
          </Text>
          <Text
            fontSize="sm"
            mb={"4px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            Ann return:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.annualReturn}
            </Text>
          </Text>
          <Text
            fontSize="sm"
            mb={"4px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            Ann Yield:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.annualyield}
            </Text>
          </Text>
        </CardBody>
      </Stack>
      <Stack w={"22%"} borderLeft={"1px solid #ccc"}>
        <CardBody p={"38px 12px 7px 12px"}>
          <Text fontSize="sm" mb={"4px"} display={'flex'} justifyContent={'space-between'}>
            Tenure:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.tenure}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"} display={'flex'} justifyContent={'space-between'}>
            Quaterly:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.quaterly}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"} display={'flex'} justifyContent={'space-between'}>
            Destributed Amount:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.destributedAmount}
            </Text>
          </Text>
        </CardBody>
      </Stack>
      <Stack w={"22%"} borderLeft={"1px solid #ccc"}>
        <CardBody p={"38px 12px 7px 12px"}>
          <Text fontSize="sm" mb={"4px"} display={'flex'} justifyContent={'space-between'}>
            Min.Invests:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.miniInvest}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"} display={'flex'} justifyContent={'space-between'}>
            Targ Close:
            <Text as={"span"} fontWeight={"500"}>
              {new Date(investment?.targetClose).toLocaleDateString()}
            </Text>
          </Text>
          <Text fontSize="sm" mb={"4px"} display={'flex'} justifyContent={'space-between'}>
            Year:
            <Text as={"span"} fontWeight={"500"}>
              {investment?.year}
            </Text>
          </Text>
        </CardBody>
      </Stack>
      <Stack w={"20%"} borderLeft={"1px solid #ccc"}>
        <CardBody padding={'25px 12px 7px 12px'}>
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
            width={"100%"}
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
