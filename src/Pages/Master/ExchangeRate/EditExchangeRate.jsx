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
  FormLabel,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState, useEffect } from "react";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import CustomAlertDialog from "../../../Components/CustomAlertDialog";
import { FiEdit3 } from "react-icons/fi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";

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

const EditExchangeRate = ({ id, setIsLoading }) => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { rateExchange, setRateExchange } = useContext(GlobalStateContext);

  const foundObject = rateExchange.find((item) => item.id === id);

  const [effectFrom, setEffectFrom] = useState("");
  const [effectTill, setEffectTill] = useState("");
  const [rate, setRate] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (foundObject) {
      setEffectFrom(formatDateValue(foundObject.effectFrom));
      setEffectTill(formatDateValue(foundObject.effectTill));
      setRate(foundObject.rate);
    }
  }, [foundObject]);

  const handleSave = () => {
    setIsLoading(true);
    const updatedExchange = rateExchange.map((item) =>
      item.id === id
        ? {
            ...item,
            effectFrom: new Date(effectFrom),
            effectTill: new Date(effectTill),
            rate: parseFloat(rate),
          }
        : item
    );
    setTimeout(() => {
      setRateExchange(updatedExchange);
      setIsLoading(false);
      setAlert(false);
      onClose();
    }, 100);
    setIsLoading(true);
  };

  return (
    <>
        <Button
        leftIcon={<TbEdit/>}
          ref={btnRef}
          onClick={onOpen}
          // colorScheme="forestGreen"
          color={"green.500"}
          size={"xs"}
          variant={"ghost"}
          rounded={'md'}
          ms={"auto"}
        >
          Edit
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
          <DrawerHeader fontSize={"md"}>Edit rate</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} mb={5}>
              <Box w={"50%"} display={"flex"} flexDirection={"column"} gap={1}>
                <FormLabel fontSize={"sm"}>From</FormLabel>
                <Text as={"span"} fontSize={"sm"} fontWeight={"bold"}>
                  {foundObject?.fromCurr}
                </Text>
              </Box>
              <Box w={"50%"} display={"flex"} flexDirection={"column"} gap={1}>
                <FormLabel fontSize={"sm"}>To</FormLabel>
                <Text as={"span"} fontSize={"sm"} fontWeight={"bold"}>
                  {foundObject?.toCurr}
                </Text>
              </Box>
            </Box>

            <FormControl mb={4}>
              <FormLabel fontSize={"sm"}>Effective from</FormLabel>
              <Input
                value={effectFrom}
                onChange={(e) => setEffectFrom(e.target.value)}
                fontSize={"sm"}
                type="date"
                size={"sm"}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontSize={"sm"}>Effective to</FormLabel>
              <Input
                value={effectTill}
                onChange={(e) => setEffectTill(e.target.value)}
                type="date"
                size={"sm"}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontSize={"sm"}>Exchange rate</FormLabel>
              <Input
                type="number"
                placeholder="Type rate here..."
                size={"sm"}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme={"green"}
              rounded={"sm"}
              size={"sm"}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              colorScheme={"green"}
              rounded={"sm"}
              size={"sm"}
              onClick={() => setAlert(true)}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CustomAlertDialog
        isOpen={alert}
        onClose={() => setAlert(false)}
        alertHandler={handleSave}
        message={"Are you sure you want to update rates?"}
      />
    </>
  );
};

export default EditExchangeRate;
