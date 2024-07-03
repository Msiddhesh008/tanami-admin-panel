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
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import DataTable from "../../../Components/DataTable/DataTable";
import { HiDotsVertical } from "react-icons/hi";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  EmailIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import Pagination from "../../../Components/Pagination";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import CustomAlertDialog from "../../../Components/CustomAlertDialog";
import ToastBox from "../../../Components/ToastBox";
import { debounce } from "./AddSponser";

const formatDate = (date) => new Date(date).toLocaleDateString(); // Simple date formatter

const Sponser = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const { sponser, setSponser, slideFromRight } =
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
    "Sponser name",
    "Address",
    "Mobile no",
    "Status",
    "Created At",
    "Action",
  ];

  const handleUpdateStatus = debounce((id) => {
    setSponser((prevSponser) =>
      prevSponser.map((sponsor) =>
        sponsor.id === id ? { ...sponsor, status: !sponsor.status } : sponsor
      )
    );
    toast({
      render: () => <ToastBox message={"Status changed succesfully.!"} />,
    });
  }, 300);

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
    id: item?.id,
    "Sponser name": (
      <Text
        justifyContent={slideFromRight ? "right" : "left"}
        as={"span"}
        color={"teal.900"}
        fontWeight={"500"}
        className="d-flex align-items-center web-text-small"
      >
        {item.sponserName}
      </Text>
    ),
    Address: (
      <Box w={350} isTruncated={true}>
        <Text as={"span"} color={"teal.900"} fontWeight={"500"}>
          {item.sponserAddress}
        </Text>
      </Box>
    ),
    "Mobile no": (
      <Box w={"auto"} isTruncated={true}>
        <Text as={"span"} color={"teal.900"} fontWeight={"500"}>
          {item.mobileNo}
        </Text>
      </Box>
    ),
    Status: (
      <Switch
        size={"sm"}
        colorScheme="green"
        onChange={() => handleUpdateStatus(item.id)}
        isChecked={item.status}
      />
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

    "Created At": (
      <span className="d-flex justify-content-between align-items-center">
        <Text as={"span"} color={"gray.600"} fontWeight={"500"}>
          {formatDate(item.createdAt)}
        </Text>
        {/* <Menu>
          <MenuButton className="link p-1 rounded-1">
            <HiDotsVertical className="rubix-text-dark fs-6" />
          </MenuButton>
          <Portal>
            <MenuList minWidth="80px">
              <RouterLink to={`edit-sponser/${item.id}`}>
                <MenuItem className="web-text-medium">Edit</MenuItem>
              </RouterLink>
              <RouterLink to={`view-sponser/${item.id}`}>
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
        </Menu> */}
      </span>
    ),
    Action: (
      <Box display={"flex"} justifyContent={"space-between"}>

        <Tooltip
          rounded={"sm"}
          fontSize={"xs"}
          label="View"
          bg="#fff"
          color={"green.500"}
          placement="top"
        >
          <Button
            _hover={{ color: "green.500" }}
            // transition={"0.5s all"}
          onClick={()=>{ navigate(`view-sponser/${item?.id}`)}}
            color="green.300"
            rounded={"sm"}
            size={"xs"}
          >
            <ViewIcon />
          </Button>
        </Tooltip>


        <Tooltip
          rounded={"sm"}
          fontSize={"xs"}
          label="Edit"
          bg="#fff"
          color={"blue.500"}
          placement="top"
        >
          <Button
          onClick={()=>{ navigate(`edit-sponser/${item?.id}`)}}
            _hover={{ color: "blue.500" }}
            // transition={"0.5s all"}
            color="blue.400"
            rounded={"sm"}
            size={"xs"}
          >
            <EditIcon />
          </Button>
        </Tooltip>


        <Tooltip
          rounded={"sm"}
          fontSize={"xs"}
          label="Delete"
          bg="#fff"
          color={"red.500"}
          placement="top"
        >
          <Button
            onClick={() => {
              setActionId(item?.id);
              setDeleteAlert(true);
            }}
            _hover={{ color: "red.500" }}
            // transition={"0.5s all"}
            color="red.300"
            rounded={"sm"}
            size={"xs"}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>

      </Box>
    ),

    // "Created At":
    //   mouseEntered && mouseEnteredId === item?.id ? (
    //     // false ? (
    //     <Box w={38} as="span" display={"flex"} justifyContent={"start"} gap={3}>
    //     <Box as="span" p={1} className="link" rounded={'sm'} >
    //       <EditIcon fontSize={'md'} />
    //     </Box>
    //       <Box as="span" p={1} className="link" rounded={'sm'} >
    //         <ViewIcon fontSize={'md'} />
    //       </Box>
    //       <Box as="span" p={1} className="link" rounded={'sm'} >
    //         <DeleteIcon fontSize={'md'} />
    //       </Box>
    //     </Box>
    //   ) : (
    //     <Box
    //       as="span" display={"flex"} justifyContent={"start"}
    //       p={1}
    //     >
    //       <Text  as={"span"} color={"gray.600"} fontWeight={"500"}>
    //         {formatDate(item.createdAt)}
    //       </Text>
    //     </Box>
    //   ),
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
        viewActionId={actionId}
        setViewActionId={setActionId}
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

export default Sponser;
