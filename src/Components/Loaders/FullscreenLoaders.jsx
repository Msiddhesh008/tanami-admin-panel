import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const FullscreenLoaders = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"90%"}
    >
      <Spinner color='teal.700'  />
    </Box>
  );
};

export default FullscreenLoaders;
