import { Box, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
// import error from "../assets/Error.svg"
import robot from "../../../assets/robot.png";
import InvestmentCard from "../../../Components/InvestmentCard/InvestmentCard";
// import robot from "../assets/robot.png"
const InvestmentType = () => {
  return (
    <Box
      h={"100vh"}
      w={'100%'}
      p={'20px'}
      overflow="scroll"
    >
      {/* <Image src={robot} w={"171px"} /> */}
      <InvestmentCard />
    </Box>
  );
};

export default InvestmentType;
