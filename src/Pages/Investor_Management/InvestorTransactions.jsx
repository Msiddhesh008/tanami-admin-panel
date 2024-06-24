import { Box, Text } from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";

const InvestorTransactions = () => {
  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
      <Text as={"h1"}> Investor Transactions Page</Text>
    </Box>
  );
};

export default InvestorTransactions;
