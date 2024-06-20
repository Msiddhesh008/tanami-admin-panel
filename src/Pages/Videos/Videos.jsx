import {
  Box,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Select,
  Switch,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
import {
  useDeleteVideosMutation,
  useGetVideosQuery,
  useUpdateVideosStatusMutation,
} from "../../Services/api.service";
import { useState } from "react";
import Header from "../../Components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DataTable from "../../Components/DataTable/DataTable";
import TabularView from "../../Components/TabularView/TabularView";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import ToastBox from "../../Components/ToastBox";

const Videos = () => {
  const toast = useToast();
  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const videos = useGetVideosQuery({ page: currentPage, size: pageSize });
  const [deleteVideos] = useDeleteVideosMutation();
  const [updateVideoStatus] = useUpdateVideosStatusMutation();

  const filteredData = videos?.data?.data?.data?.rows?.filter((item) => {
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
    "Title",
    "Description",
    "Duration",
    "Active",
    "Created At",
  ];

  const extractedArray = filteredData?.map((item, index) => {
    return {
      Title: (
        <Link to={`/videos/view/${item.id}`}>
          <Box display={"flex"} alignItems={"center"} w={250}>
            <Text as={"span"} isTruncated={true}>
              {item?.title}
            </Text>
          </Box>
        </Link>
      ),
      Description: (
        <Tooltip
          className="rounded-2 web-text-xsmall"
          width={"fit-content"}
          placement="top"
          hasArrow
          label={item?.description}
          bg="blue.200"
        >
          <Box display={"flex"} alignItems={"center"} w={350}>
            <Text as={"span"} isTruncated={true}>
              {item?.description}
            </Text>
          </Box>
        </Tooltip>
      ),
      Duration: (
        <Text as={"span"} isTruncated={true}>
          {item?.duration} sec
        </Text>
      ),
      Active: (
        <Switch
          size={"sm"}
          colorScheme="teal"
          onChange={() => handleUpdateStatus(item.id, item?.status)}
          isChecked={item.status}
          // disabled={item.status}
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
                <Link to={`/videos/edit/${item.id}`}>
                  <MenuItem className="web-text-medium">Edit</MenuItem>
                </Link>
                <Link to={`/videos/view/${item.id}`}>
                  <MenuItem className="web-text-medium">View</MenuItem>
                </Link>
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

  // ====================================================[Functions]===================================================================
  const handleDelete = async (communityId) => {
    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      await deleteVideos(communityId)
        .then((response) => {
          // Handle the response here
          // // console.log("Mutation response:", response?.data?.statusCode);
          // // console.log("Mutation response:", response?.data?.message);

          if (response?.data?.statusCode === 201) {
            setDeleteIsLoading(false);
            setDeleteAlert(false);
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
          // console.error("Error creating community:", error);
          setDeleteIsLoading(false);
          setDeleteAlert(false);
        });
    } catch (error) {
      // Handle errors
      // console.log("Error deleting community:", error);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      // Trigger the mutation
      await updateVideoStatus({ id })
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

  return (
    <>
      <TabularView
        title={"Videos"}
        btnTitle={"Create videos"}
        link={"/videos/add-videos"}
        apiData={videos}
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
        totalItems={videos?.data?.data?.data?.totalItems}
        totalPages={videos?.data?.data?.data?.totalPages}
        noDataTitle={"video"}
      />
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete video?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Videos;

// Event & Community Pending
