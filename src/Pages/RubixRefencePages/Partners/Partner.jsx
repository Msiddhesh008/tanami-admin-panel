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
  useCreatePartnersMutation,
  useDeletePartnersMutation,
  useGetPartnersQuery,
  useUpdatePartnersStatusMutation,
} from "../../Services/api.service";
import { useState } from "react";
import TabularView from "../../Components/TabularView/TabularView";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import ToastBox from "../../Components/ToastBox";
import extractFilename from "../../Components/Functions/FileNameAlter";

const Partner = () => {
  const toast = useToast();
  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const partnersPage = useCreatePartnersMutation({
    page: currentPage,
    size: pageSize,
  });

  const partners = useGetPartnersQuery({
    page: currentPage,
    size: pageSize,
  });

  const [deletePartners] = useDeletePartnersMutation();
  const [updatePartnerStatus] = useUpdatePartnersStatusMutation();

  // console.log(partners?.data?.data?.rows);

  const filteredData = partners?.data?.data?.rows?.filter((item) => {
    // // console.log(item.description);
    // Filter by name (case insensitive)
    const name = item.description;
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
        <Link to={`/partners/view/${item.id}`}>
          <Tooltip
            className="rounded-2 web-text-xsmall"
            width={"fit-content"}
            placement="top"
            hasArrow
            label={item?.description}
            bg="blue.200"
          >
            <Box display={"flex"} alignItems={"center"} w={200}>
              <Text as={"span"} isTruncated={true}>
                {extractFilename(item?.description)}
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
                <Link to={`/partners/edit/${item.id}`}>
                  <MenuItem className="web-text-medium">Edit</MenuItem>
                </Link>
                <Link to={`/partners/view/${item.id}`}>
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
      const response = await deletePartners(communityId);

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
      await updatePartnerStatus({ id })
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
        title={"Partners Card"}
        btnTitle={"Create Partner card"}
        link={"/partners/add-partners"}
        apiData={partners}
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
        totalPages={partners?.data?.data?.totalPages}
        totalItems={partners?.data?.data?.totalItems}
        noDataTitle={"partners"}
      />
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete Partners?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Partner;
