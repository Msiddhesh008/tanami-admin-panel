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
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqStatusMutation,
} from "../../Services/api.service";
import { useState } from "react";
import TabularView from "../../Components/TabularView/TabularView";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import ToastBox from "../../Components/ToastBox";
import extractFilename from "../../Components/Functions/FileNameAlter";

const Faq = () => {
  const toast = useToast();
  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const faqPage = useCreateFaqMutation();

  const faq = useGetFaqQuery({ page: currentPage, size: pageSize });


  const [deleteFaq] = useDeleteFaqMutation();
  const [updateFaqStatus] = useUpdateFaqStatusMutation();

  const filteredData = faq?.data?.data?.rows?.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.question;
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
        <Link to={`/faq/view/${item.id}`}>
          <Tooltip
            className="rounded-2 web-text-xsmall"
            width={"fit-content"}
            placement="top"
            hasArrow
            label={item?.question}
            bg="blue.200"
          >
            <Box display={"flex"} alignItems={"center"} w={200}>
              <Text as={"span"} isTruncated={true}>
                {item?.question}
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
                <Link to={`/faq/edit/${item.id}`}>
                  <MenuItem className="web-text-medium">Edit</MenuItem>
                </Link>
                <Link to={`/faq/view/${item.id}`}>
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
            message={"Can't delete Partner. Status is true."}
          />
        ),
      });
    }

    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      const response = await deleteFaq(communityId);

      // Handle the response here
      // console.log("Mutation response:", response?.data?.statusCode);
      // console.log("Mutation response:", response?.data?.message);

      if (response?.data?.statusCode === 200) {
        toast({
          render: () => (
            <ToastBox status={"success"} message={response?.data?.message} />
          ),
        });
      } else {
        toast({
          render: () => (
            <ToastBox
              status={"error"}
              message={"Failed to delete partner. Please try again."}
            />
          ),
        });
      }
    } catch (error) {
      // console.error("Error deleting community:", error);
      toast({
        render: () => (
          <ToastBox
            status={"error"}
            message={"Error deleting partner. Please try again."}
          />
        ),
      });
    } finally {
      // Ensure the loading state is reset and alert is closed
      setDeleteIsLoading(false);
      setDeleteAlert(false);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      await updateFaqStatus({ id })
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
        title={"FAQ"}
        btnTitle={"Create Faq"}
        link={"/faq/add-faq"}
        apiData={faq}
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
        totalPages={faq?.data?.data?.totalPages}
        totalItems={faq?.data?.data?.totalItems}
        noDataTitle={"FAQ's"}
      />
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete Faq?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Faq;
