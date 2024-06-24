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

const formatDate = (date) => new Date(date).toLocaleDateString(); // Simple date formatter

const Sponser = () => {
  const { sponser, setSponser } = useContext(GlobalStateContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(false);

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
    "Sponser name",
    "Address",
    "Mobile no",
    "Status",
    "Created At",
  ];

  const handleUpdateStatus = (id) => {
    console.log(`Status updated for id: ${id}`);
    // Add your status update logic here
  };

  // ====================================================[Table Filter]================================================================
  const filteredData = sponser.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.sponserName;
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

  const extractedArray = filteredData?.map((item) => ({
    "Sponser name": (
      <Text
        as={"span"}
        color={"gray.600"}
        className="d-flex align-items-center fw-bold web-text-small"
      >
        {item.sponserName}
      </Text>
    ),
    Address: (
      <Box w={350} isTruncated={true}>
        <Text as={"span"} color={"teal.900"}>
          {item.sponserAddress}
        </Text>
      </Box>
    ),
    "Mobile no": (
      <Box w={"auto"} isTruncated={true}>
        <Text as={"span"} color={"teal.900"}>
          {item.mobileNo}
        </Text>
      </Box>
    ),
    Status:
      // <Switch
      //   size={"sm"}
      //   colorScheme="teal"
      //   onChange={() => handleUpdateStatus(item.id)}
      //   isChecked={item.status}
      // />

      item?.status ? (
        <Badge variant={"outline"} colorScheme="green">
          Passed
        </Badge>
      ) : (
        <Badge variant={"outline"} colorScheme="red">
          Not passes
        </Badge>
      ),
    "Created At": (
      <span className="d-flex justify-content-between align-items-center">
        <Text as={"span"} color={"gray.600"} className=" fw-bold">
          {formatDate(item.createdAt)}
        </Text>
        <Menu>
          <MenuButton className="link p-1 rounded-1">
            <HiDotsVertical className="rubix-text-dark fs-6" />
          </MenuButton>
          <Portal>
            <MenuList minWidth="80px">
              <RouterLink to={`edit/${item.id}`}>
                <MenuItem className="web-text-medium">Edit</MenuItem>
              </RouterLink>
              <RouterLink to={`view/${item.id}`}>
                <MenuItem className="web-text-medium">View</MenuItem>
              </RouterLink>
              <MenuItem
                onClick={() => {
                  setActionId(item?.id);
                  setDeleteAlert(true);
                }}
                className="web-text-medium"
              >
                Delete
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </span>
    ),
  }));

  const handleDelete = () => {
    const updatedSponsors = sponser.filter((sponsor) => sponsor.id !== actionId);

    setTimeout(() => {
      setSponser(updatedSponsors);
      setDeleteAlert(false);
      setIsLoading(false);
    }, 100);
    setIsLoading(true);
  };

  


  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <HStack display={"flex"} alignItems={"center"}>
            <Pagination totalItems={10} />

            <Link to={"/sponser/add-sponser"}>
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
        // totalPages={10}
      />

      <CustomAlertDialog
      onClose={()=> setDeleteAlert(false)}
        isOpen={deleteAlert}
        message={"Are you sure you want to delete sponers?"}
        alertHandler={handleDelete}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Sponser;
