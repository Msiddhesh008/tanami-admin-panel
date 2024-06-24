import React, { useState } from "react";
import {
  Box,
  Text,
  Tooltip,
  HStack,
  Input,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Portal,
  useToast,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DataTable from "../../Components/DataTable/DataTable";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { Link as RouterLink } from "react-router-dom";
import {
  useDeleteEcoBannerMutation,
  useDeleteNewsMutation,
  useDeleteUsecaseMutation,
  useGetNewsQuery,
  useGetUsecaseQuery,
  useUpdateNewsStatusMutation,
  useUpdateUsecaseStatusMutation,
} from "../../Services/api.service";
import { HiDotsVertical } from "react-icons/hi";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import Header from "../../Components/Header";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
import TabularView from "../../Components/TabularView/TabularView";
import ToastBox from "../../Components/ToastBox";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const Usecase = () => {
  // ====================================================[Hooks]===================================================================
  const toast = useToast();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  // ====================================================[Constants]===================================================================
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(TABLE_PAGINATION?.page);
  const [displayRange, setDisplayRange] = useState({
    start: TABLE_PAGINATION?.page,
    end: pageSize,
  });
  // ====================================================[RTK Hooks]===================================================================
  const useCase = useGetUsecaseQuery({ page: currentPage, size: pageSize });

  const [deleteUsecase] = useDeleteUsecaseMutation();
  const [updateUsecaseStatus] = useUpdateUsecaseStatusMutation();
  // ====================================================[Functions]===================================================================
  const handleDelete = async (id) => {
    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      await deleteUsecase(id)
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
          // console.error("Error creating community:", error);
          setDeleteIsLoading(false);
          setDeleteAlert(false);
        });
    } catch (error) {
      // Handle errors
      // console.error("Error deleting community:", error);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      // Trigger the mutation
      await updateUsecaseStatus({ id })
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
          // console.log(error);
        });
    } catch (error) {
      // Handle errors
      // console.error("Error updating community status:", error);
    }
  };
  // ====================================================[Table Filter]================================================================
  const filteredData = useCase?.data?.data?.rows?.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.title;
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = name.toLowerCase().includes(searchLower);

    // Filter by status
    const status = item.status;

    const statusMatches =
      statusFilter === "all" ||
      (statusFilter === "active" && status === true) ||
      (statusFilter === "inactive" && status === false);

    return nameMatches && statusMatches;
  });
  // ====================================================[Table Setup]================================================================
  const tableHeadRow = [
    // "Icon",
    "Title",
    "Description",
    "Updated Date",
    "Active",
    "Created At",
  ];
  const extractedArray = filteredData?.map((item, index) => {
    return {
      Title: (
        <RouterLink to={`view/${item.id}`}>
          <Box display={"flex"} alignItems={"center"} gap={4}>
            <Avatar
              w={"35px"}
              h={"35px"}
              rounded={"full"}
              src={`${API_URL}/${item?.icon}`}
            />
            <Text as={"span"}>{item?.title}</Text>
          </Box>
        </RouterLink>
      ),
      //   Title: <RouterLink to={`view/${item.id}`}>{item?.title}</RouterLink>,
      Description: (
        <Tooltip
          className="rounded-2 web-text-xsmall"
          width={"fit-content"}
          placement="top"
          hasArrow
          label={item?.meta_description}
          bg="blue.200"
        >
          <Box display={"flex"} alignItems={"center"} w={180}>
            <Text as={"span"} isTruncated={true}>
              {item?.meta_description}
            </Text>
          </Box>
        </Tooltip>
      ),
      // Content: (
      //   <Tooltip
      //     className="rounded-2 web-text-xsmall"
      //     width={"fit-content"}
      //     placement="top"
      //     hasArrow
      //     label={item?.content}
      //     bg="blue.200"
      //   >
      //     <Box display={"flex"} alignItems={"center"} w={350}>
      //       <Text as={"span"} isTruncated={true}>
      //         {item?.content}
      //       </Text>
      //     </Box>
      //   </Tooltip>
      // ),
      "Updated Date": (
        <Text as={"span"} color={"gray.600"} className=" fw-bold">
          {formatDate(item?.updatedAt)}
        </Text>
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

  const updateDisplayRange = (page) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, useCase?.data?.data?.totalItems);
    setDisplayRange({ start, end });
  };

  return (
    <>
      <TabularView
        title={"Usecase"}
        btnTitle={"Create usecase"}
        link={"/usecase/add-usecase"}
        apiData={useCase}
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
        totalPages={useCase?.data?.data?.totalPages}
        totalItems={useCase?.data?.data?.totalItems}
        noDataTitle={"usecase"}
      />
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete usecase?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Usecase;
