import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import DataTable from "../../Components/DataTable/DataTable";
import Pagination from "../../Components/Pagination";
import GlobalStateContext from "../../Contexts/GlobalStateContext";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import { formatDate } from "../../Components/Functions/UTCConvertor";
// import { formatDate } from "../../Components/Functions/UTCConvertor";

const InvestorRequest = () => {
  const toast = useToast();
  const { slideFromRight, investorRequest, setInvestorRequest } =
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
  const filteredData = investorRequest.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.Distribution;
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
    "Sr No.",
    "Date",
    "Distribution Amount",
    "Charges (USD)",
    "Year",
    "Quater",
    "Amount",
  ];

  const extractedArray = filteredData?.map((item, index) => ({
    id: item?.id,
    "Sr No.": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.800"}
        className="d-flex align-items-center web-text-small"
        fontWeight={'500'}
      >
        {index + 1}.
      </Text>
    ),
    "Date": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        className="d-flex align-items-center web-text-small"
        fontWeight={'500'}
      >
        {formatDate(item.date)}
      </Text>
    ),
    "Distribution Amount": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        className="d-flex align-items-center web-text-small"
        fontWeight={'500'}
      >
        {item.Distribution}
      </Text>
    ),
    "Charges (USD)": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.800"}
        className="d-flex align-items-center web-text-small"
        fontWeight={'500'}
      >
        {item.charge}
        {/* {formatDate(item.charge)} */}
      </Text>
    ),
    Year: (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.800"}
        className="d-flex align-items-center web-text-small"
        fontWeight={'500'}
      >
        {item.year}
      </Text>
    ),
    Quater: (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        className="d-flex align-items-center web-text-small"
        fontWeight={'500'}
      >
        {item.quater}
      </Text>
    ),

    Amount: (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"gray.600"}
        className="d-flex align-items-center web-text-small"
        fontWeight={'500'}
      >
        {item.amount}
      </Text>
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

export default InvestorRequest;
