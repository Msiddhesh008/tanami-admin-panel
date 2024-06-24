import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Switch,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
import {
  useCreatePolicyMutation,
  useDeletePolicyMutation,
  useGetPolicyQuery,
  useUpdatePolicyStatusMutation,
} from "../../Services/api.service";
import { useState } from "react";
import TabularView from "../../Components/TabularView/TabularView";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import ToastBox from "../../Components/ToastBox";
import extractFilename from "../../Components/Functions/FileNameAlter";

const Policy = () => {
  const toast = useToast();
  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const policyPage = useCreatePolicyMutation({
    page: currentPage,
    size: pageSize,
  });

  const policy = useGetPolicyQuery({
    page: currentPage,
    size: pageSize,
  });

  const [deletePolicy] = useDeletePolicyMutation();
  const [updatePolicyStatus] = useUpdatePolicyStatusMutation();

  const filteredData = policy?.data?.data?.rows?.filter((item) => {
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
    // "Content",
    "Active",
    "Created At",
  ];

  const extractedArray = filteredData?.map((item, index) => {
    return {
      Title: (
        <Link to={`/policy/view/${item.id}`}>
          <Tooltip
            className="rounded-2 web-text-xsmall"
            width={"fit-content"}
            placement="top"
            hasArrow
            label={item?.title}
            bg="blue.200"
          >
            <Box display={"flex"} alignItems={"center"} w={200}>
              <Text as={"span"} isTruncated={true}>
                {extractFilename(item?.title)}
              </Text>
            </Box>
          </Tooltip>
        </Link>
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
                <Link to={`/policy/edit/${item.id}`}>
                  <MenuItem className="web-text-medium">Edit</MenuItem>
                </Link>
                <Link to={`/policy/view/${item.id}`}>
                  <MenuItem className="web-text-medium">View</MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    setActionId(item.id);
                    setDeleteAlert(true);
                    setActionStatus(item.status);
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
  const handleDelete = async (communityId, status) => {
    if (status) {
      return toast({
        render: () => (
          <ToastBox
            status={"warn"}
            message={"Can't delete Policy. Status is true."}
          />
        ),
      });
    }

    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      await deletePolicy(communityId)
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
      await updatePolicyStatus({ id })
        .then((response) => {
          // console.log(response?.data);
          if (response?.data?.statusCode === 201) {
            toast({
              render: () => (
                <ToastBox
                  status={"success"}
                  message={"Please toggle another banner."}
                />
              ),
            });

            // whitePaper?.refetch()
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
        title={"Privacy Policy"}
        btnTitle={"Create Policy"}
        link={"/policy/add-policy"}
        apiData={policy}
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
        totalPages={policy?.data?.data?.totalPages}
        totalItems={policy?.data?.data?.totalItems}
        noDataTitle={"policy"}
      />
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete Policy?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Policy;
