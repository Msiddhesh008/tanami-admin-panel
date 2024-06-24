import { Box, Text } from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";

const Contact = () => {
  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
      <Text as={"h1"}>Contact Us Page</Text>
    </Box>
  );
};

export default Contact;
