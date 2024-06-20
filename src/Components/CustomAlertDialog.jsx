import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";

const CustomAlertDialog = ({ isOpen, onOpen, onClose, alertHandler, isLoading, message }) => {
  // const cancelRef = useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      // leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent w={400}>
        <AlertDialogCloseButton className="web-text-xsmall link" />
        <AlertDialogBody className="text-center web-text-large fw-bold" pt={8}>
          {message}
        </AlertDialogBody>
        <AlertDialogFooter display={"flex"} justifyContent={"center"}>
          <Button
            size={"sm"}
            // ref={cancelRef}
            onClick={onClose}
          >
            No
          </Button>
          <Button
            backgroundColor={"#ff6b6b"}
            isLoading={isLoading}
            onClick={alertHandler}
            size={"sm"}
            colorScheme="red"
            ml={3}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
