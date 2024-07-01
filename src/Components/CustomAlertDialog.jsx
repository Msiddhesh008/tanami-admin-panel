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
            rounded={'sm'}
          >
            No
          </Button>
          <Button
            isLoading={isLoading}
            onClick={alertHandler}
            size={"sm"}
            rounded={'sm'}
            colorScheme="green"
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
