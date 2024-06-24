import { Box, Text } from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";

const DeletionRequest = () => {
  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
      <Text as={"h1"}>Pending deletion request</Text>
    </Box>
  );
};

export default DeletionRequest;
