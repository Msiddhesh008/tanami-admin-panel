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
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import DataTable from "../../Components/DataTable/DataTable";
import { HiDotsVertical } from "react-icons/hi";
import { Link, Link as RouterLink } from "react-router-dom";
import { AddIcon, EmailIcon } from "@chakra-ui/icons";
import Pagination from "../../Components/Pagination";
import GlobalStateContext from "../../Contexts/GlobalStateContext";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import ToastBox from "../../Components/ToastBox";
import { debounce } from "../Master/Sponser/AddSponser";

const formatDate = (date) => new Date(date).toLocaleDateString(); // Simple date formatter

const InvestorTransactions = () => {
  const toast = useToast();
  const { investorTransaction, setInvestorTransaction, slideFromRight } =
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

  // ====================================================[Table Setup]================================================================
  const tableHeadRow = [
    "Sr N/O",
    "Investor Name",
    "Sponsor",
    "Investment Amount",
    "Action",
  ];

  const handleUpdateStatus = debounce((id) => {
    setInvestorDetails((prevData) =>
      prevData.map((investorTransaction) =>
        investorTransaction.id === id ? { ...investorTransaction } : investorTransaction
      )
    );
    toast({
      render: () => <ToastBox message={"Status changed succesfully.!"} />,
    });
  }, 300);

  // ====================================================[Table Filter]================================================================
  const filteredData = investorTransaction.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.InvestorName;
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = name?.toLowerCase().includes(searchLower);

    // Filter by status
    // const status = item.status;
    // const statusLower = status ? "active" : "inactive";

    // const statusMatches =
    //   statusFilter === "all" ||
    //   (statusFilter === "active" && status === true) ||
    //   (statusFilter === "inactive" && status === false);

    return nameMatches;
  });

  const extractedArray = filteredData?.map((item) => ({
    id: item?.id,
    "Sr N/O": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        className="d-flex align-items-center fw-bold web-text-small"
      >
        {item.id}
      </Text>
    ),
    "Investor Name": (
      <Box w={"auto"} isTruncated={true}>
        <Text as={"span"} color={"teal.900"}>
          {item.InvestorName}
        </Text>
      </Box>
    ),
    Sponsor: (
      <Box w={"auto"} isTruncated={true}>
        <Text as={"span"} color={"teal.900"}>
          {item.Sponsor}
        </Text>
      </Box>
    ),
    "Investment Amount": (
      // <Switch
      //   size={"sm"}
      //   color="green"
      //   onChange={() => handleUpdateStatus(item.id)}
      //   isChecked={item.status}
      // />
      <Box w={"auto"} isTruncated={true}>
        <Text as={"span"} color={"teal.900"}>
          {item.InvestmentAmount} $
        </Text>
      </Box>
    ),

    // item?.status ? (
    //   <Badge bg={'transparent'} color={"#05c46b"}>
    //     Passed
    //   </Badge>
    // ) : (
    //   <Badge bg={'transparent'} color={"#f53b57"}>
    //     Not passes
    //   </Badge>
    // ),

    Action: (
          <Button 
          color={"green.500"} size={"xs"} variant={"ghost"}>
        Distribute
       </Button>
    ),
  }));

  const handleDelete = () => {
    const updatedInvestorTransaction = investorTransaction.filter(
      (investorTransaction) => investorTransaction.id !== actionId
    );

    setTimeout(() => {
      setInvestorTransaction(updatedInvestorTransaction);
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

            <Link to={""}>
              <Button
                leftIcon={<AddIcon />}
                colorScheme={"green"}
                rounded={"sm"}
                size={"sm"}
              >
                Add sponsers
              </Button>
            </Link>
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

export default InvestorTransactions;
