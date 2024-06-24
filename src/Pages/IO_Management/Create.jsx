import { Box, Text } from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";


const Create = () => {
  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
      <Text as={"h1"}> IO management Create</Text>
    </Box>
  );
};

export default Create;
