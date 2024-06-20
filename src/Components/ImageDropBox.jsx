import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { motion, useAnimation } from "framer-motion";

const ImageDropBox = () => {
  return (
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "md",
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover"
          height={"105px"}
          className="pointer"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
              >
                <span className="d-flex flex-column align-items-center" spacing="1">
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    Drop images here
                  </Heading>
                  <span fontWeight="light" className="web-text-large text-secondary text-center">or click to upload</span>
                </span>
              </Stack>
            </Box>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
            //   onDragEnter={startAnimation}
            //   onDragLeave={stopAnimation}
            />
          </Box>
        </Box>
  );
};

export default ImageDropBox;
