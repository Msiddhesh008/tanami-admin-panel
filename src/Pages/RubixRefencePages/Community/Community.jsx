import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Link,
  Tag,
  Text,
  WrapItem,
  Tooltip,
  Divider,
  Stack,
  HStack,
  Input,
  Button,
  Select,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Portal,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import DataTable from "../../Components/DataTable/DataTable";
import CommunityBanner from "../../Components/CommunityBanner";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { v4 as uuidv4 } from "uuid";
import { Link as RouterLink } from "react-router-dom";
import {
  useDeleteCommunityMutation,
  useGetCommunityBannerQuery,
  useGetCommunityByIdQuery,
  useGetCommunityQuery,
  useUpdateCommunityStatusMutation,
} from "../../Services/api.service";
import { HiDotsVertical } from "react-icons/hi";
import TimeCalculator from "../../Components/Functions/TimeCalculator";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import WebButton from "../../Components/WebButton";
import CommunityCardDisplay from "./CommunityCardDisplay";
import CommunityBannerCard from "./CommunityBannerCard";
import Header from "../../Components/Header";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
import ToastBox from "../../Components/ToastBox";
import TabularView from "../../../Components/TabularView/TabularView";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const Community = () => {
  // ====================================================[Hooks]===================================================================
  const cancelRef = useRef();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(1);

  const [displayRange, setDisplayRange] = useState({
    start: TABLE_PAGINATION?.page,
    end: pageSize,
  });

  const community = useGetCommunityQuery({ page: currentPage, size: pageSize });

  const [deleteCommunity] = useDeleteCommunityMutation();
  const [updateCommunityStatus] = useUpdateCommunityStatusMutation();

  // ====================================================[Functions]===================================================================
  const handleDelete = async (communityId) => {
    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      await deleteCommunity(communityId)
        .then((response) => {
          // Handle the response here
          // // console.log("Mutation response:", response?.data?.statusCode);
          // // console.log("Mutation response:", response?.data?.message);

          if (response?.data?.statusCode === 201) {
            setDeleteIsLoading(false);
            setDeleteAlert(false);
          }
        })
        .catch((error) => {
          // // console.error("Error creating community:", error);
          setDeleteIsLoading(false);
          setDeleteAlert(false);
        });
    } catch (error) {
      // Handle errors
      // // console.error("Error deleting community:", error);
    }
  };
  const handleUpdateStatus = async (id) => {
    try {
      // Trigger the mutation
      await updateCommunityStatus({ id })
        .then((response) => {
          if (response?.data?.statusCode === 201) {
            toast({
              render: () => (
                <ToastBox
                  status={"success"}
                  message={response?.data?.message}
                />
              ),
            });
          }
        })
        .catch((error) => {
          // // console.log(error);
        });
    } catch (error) {
      // Handle errors
      // // console.error("Error updating community status:", error);
    }
  };

  // ====================================================[Table Filter]================================================================
  const filteredData = community?.data?.data?.rows?.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.member_name;
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = name.toLowerCase().includes(searchLower);

    // Filter by status
    const status = item.status;
    const statusLower = status ? "active" : "inactive";

    const statusMatches =
      statusFilter === "all" ||
      (statusFilter === "active" && status === true) ||
      (statusFilter === "inactive" && status === false);

    return nameMatches && statusMatches;
  });

  // ====================================================[Table Setup]================================================================
  const tableHeadRow = [
    "Name",
    "Description",
    "Linked In",
    "Active",
    "Created At",
  ];
  const extractedArray = filteredData?.map((item, index) => {
    return {
      Name: (
        <RouterLink
          to={`view/${item.id}`}
          className="d-flex align-items-center gap-2 pointer"
        >
          <Avatar
            size="sm"
            name="KC Reddy"
            src={`${API_URL}/${item.profile_image}`}
          />
          <span className="d-flex flex-column">
            <Text
              as={"span"}
              color={"teal.700"}
              className="d-flex fw-bold align-items-center web-text-small"
            >
              {item?.member_name}
            </Text>
            <span className="d-flex align-items-center web-text-xsmall text-secondary">
              {item?.designation}
            </span>
          </span>
        </RouterLink>
      ),
      Description: (
        <Box w={350} isTruncated={true}>
        <Text as={"span"} color={"teal.900"}>
          {item?.description}
        </Text>
        </Box>
      ),
      "Linked In": (
        <Link href={item?.linkedin} isExternal>
          <Tooltip
            className="rounded-2 web-text-xsmall"
            width={"fit-content"}
            placement="top"
            hasArrow
            label={item?.linkedin}
            bg="blue.200"
          >
            <Tag
              variant="solid"
              size={"sm"}
              borderRadius={2}
              colorScheme="linkedin"
            >
              Linked In
            </Tag>
          </Tooltip>
        </Link>
      ),
      Active: (
        <Switch
          size={"sm"}
          colorScheme="teal"
          onChange={() => handleUpdateStatus(item.id)}
          isChecked={item.status}
        />
      ),
      "Created At": (
        <span className="d-flex justify-content-between align-items-center">
          <Text as={"span"} color={"gray.600"} className=" fw-bold">
            {formatDate(item?.createdAt)}
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
                    setActionId(item.id);
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
    };
  });

  // ====================================================[Pagination Setup]================================================================
  const paginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateDisplayRange(currentPage - 1);
    }
  };

  const paginationNext = () => {
    const totalPages = Math.ceil(community?.data?.data?.totalItems / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      updateDisplayRange(currentPage + 1);
    }
  };
  const updateDisplayRange = (page) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(
      start + pageSize - 1,
      community?.data?.data?.totalItems
    );
    setDisplayRange({ start, end });
  };

  return (
    <>
      <TabularView
        title={"Community"}
        btnTitle={"Create member"}
        link={"/community/add-community"}
        apiData={community}
        tableHeadRow={tableHeadRow}
        extractedArray={extractedArray}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={community?.data?.data?.totalItems}
        totalPages={community?.data?.data?.totalPages}
        noDataTitle={"community's"}
      />

      {/* ====================================================[ Alert ]================================================================ */}
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete community?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Community;
