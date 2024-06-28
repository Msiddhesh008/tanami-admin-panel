import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import GlobalStateContext from "../../Contexts/GlobalStateContext";
import { AddIcon } from "@chakra-ui/icons";

// Convert date to YYYY-MM-DD format
const formatDateValue = (date) => {
  if (!date) return "";
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const AddIOCharges = ({ setCharges, charges }) => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [chargeTitle, setChargeTitle] = useState("");
  const [chargeValue, setChargeValue] = useState(0.0);

  const handleSave = () => {
    setCharges([
      ...charges,
      {
        title: chargeTitle,
        value: chargeValue,
      },
    ]);

    setChargeTitle("");
    setChargeValue("");

    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        ref={btnRef}
        onClick={onOpen}
        // colorScheme="forestGreen"
        color={"green.500"}
        size={"xs"}
        // variant={"ghost"}
        rounded={"md"}
        ms={"auto"}
      >
        Add Charges
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"md"}>Add charges</DrawerHeader>

          <DrawerBody>
            <FormControl mb={4}>
              <FormLabel fontSize={"sm"}>Charge title</FormLabel>
              <Input
                value={chargeTitle}
                onChange={(e) => setChargeTitle(e.target.value)}
                fontSize={"sm"}
                type="text"
                size={"sm"}
                placeholder="Charge title"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontSize={"sm"}>Charge value</FormLabel>
              <Input
                value={chargeValue}
                onChange={(e) => setChargeValue(e.target.value)}
                fontSize={"sm"}
                type="number"
                size={"sm"}
                placeholder="00.00$"
              />
              <FormHelperText fontSize={"xs"}>
                Please enter value in Dollars
              </FormHelperText>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme={"green"}
              rounded={"sm"}
              size={"sm"}
              mr={3}
              onClick={() => {
                onClose();
                setChargeTitle("");
                setChargeValue("");
              }}
            >
              Cancel
            </Button>

            <Button
              colorScheme={"green"}
              rounded={"sm"}
              size={"sm"}
              onClick={handleSave}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddIOCharges;
