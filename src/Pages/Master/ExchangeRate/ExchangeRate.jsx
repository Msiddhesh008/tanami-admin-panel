import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Select,
  Switch,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import DataTable from "../../../Components/DataTable/DataTable";
import { HiDotsVertical } from "react-icons/hi";
import { Link, Link as RouterLink } from "react-router-dom";
import { AddIcon, EmailIcon } from "@chakra-ui/icons";
import Pagination from "../../../Components/Pagination";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import CustomAlertDialog from "../../../Components/CustomAlertDialog";
import ToastBox from "../../../Components/ToastBox";
import { formatDate } from "../../../Components/Functions/UTCConvertor";
import EditExchangeRate from "./EditExchangeRate";

const ExchangeRate = () => {
  const toast = useToast();
  const { slideFromRight, rateExchange, setRateExchange } =
    useContext(GlobalStateContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);
  const [mouseEnteredId, setMouseEnteredId] = useState("");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // ====================================================[Table Filter]================================================================
  const filteredData = rateExchange.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.fromCurr;
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = name.toLowerCase().includes(searchLower);

    // Filter by status
    // const status = item.status;
    // const statusLower = status ? "active" : "inactive";

    // const statusMatches =
    //   statusFilter === "all" ||
    //   (statusFilter === "active" && status === true) ||
    //   (statusFilter === "inactive" && status === false);

    return nameMatches;
  });

  // ====================================================[Table Setup]================================================================
  const tableHeadRow = [
    "Sr.No",
    "From currency",
    "To currency",
    "Effective from",
    "Effective till",
    "Rate",
    "Action",
  ];

  const extractedArray = filteredData?.map((item, index) => ({
    "Sr.No": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        fontWeight={"600"}
        className="d-flex align-items-center fw- web-text-small"
      >
        {index + 1}.
      </Text>
    ),
    "From currency": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        fontWeight={"600"}
        className="d-flex align-items-center fw- web-text-small"
      >
        {item.fromCurr}
      </Text>
    ),
    "To currency": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        fontWeight={"600"}
        className="d-flex align-items-center fw- web-text-small"
      >
        {item.toCurr}
      </Text>
    ),
    "Effective from": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        fontWeight={"600"}
        className="d-flex align-items-center  web-text-small"
      >
        {formatDate(item.effectFrom)}
      </Text>
    ),
    "Effective till": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        fontWeight={"600"}
        className="d-flex align-items-center  web-text-small"
      >
        {formatDate(item.effectTill)}
      </Text>
    ),
    Rate: (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        fontWeight={"600"}
        className="d-flex align-items-center  web-text-small"
      >
        {item.rate}
      </Text>
    ),

    Action: (
      // <Button colorScheme="green" size={"xs"} variant={"ghost"}>
      //   Edit
      // </Button>

      <EditExchangeRate setIsLoading={setIsLoading} id={item.id} />
    ),
  }));

  const handleDelete = () => {
    const updatedSponsors = sponser.filter(
      (sponsor) => sponsor.id !== actionId
    );

    setTimeout(() => {
      setSponser(updatedSponsors);
      setDeleteAlert(false);
      setIsLoading(false);
    }, 100);
    setIsLoading(true);
  };

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={38}>
      <Box bg="white.500">
        <HStack
          display={"flex"}
          justifyContent={"space-between"}
          ps={1}
          pe={1}
          pb={4}
          pt={4}
          spacing="24px"
        >
          <Input
            type="search"
            width={300}
            placeholder="Search..."
            size="sm"
            rounded="sm"
            focusBorderColor="green.500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <HStack display={"flex"} alignItems={"center"}>
            <Pagination totalItems={10} />
          </HStack>
        </HStack>
      </Box>

      <DataTable
        emptyMessage={`We don't have any Sponers `}
        tableHeadRow={tableHeadRow}
        data={extractedArray}
        isLoading={isLoading}
        viewActionId={actionId}
        setViewActionId={setActionId}
        // totalPages={10}

        setMouseEnteredId={setMouseEnteredId}
        setMouseEntered={setMouseEntered}
      />

      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        message={"Are you sure you want to delete sponers?"}
        alertHandler={handleDelete}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ExchangeRate;
