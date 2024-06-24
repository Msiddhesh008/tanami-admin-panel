import {
  Box,
  Button,
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
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
import {
  useDeleteEmailMutation,
  useGetNewsLetterEmailQuery,
  useGetNewsLetterQuery,
} from "../../Services/api.service";
import { useState } from "react";
import TabularView from "../../Components/TabularView/TabularView";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import ToastBox from "../../Components/ToastBox";
import extractFilename from "../../Components/Functions/FileNameAlter";
import { DeleteIcon } from "@chakra-ui/icons";

const NewsLetter = () => {
  const toast = useToast();
  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const { data } = useGetNewsLetterQuery({ page: currentPage, size: pageSize });
  // // console.log(useGetNewsletterQuery);
  const email = data?.data?.rows;
  // console.log(email);

  const [deleteEmail] = useDeleteEmailMutation();
  // const [updateFaqStatus] = useUpdateFaqStatusMutation();

  const handleDelete = async (communityId, status) => {
    if (status) {
      return toast({
        render: () => (
          <ToastBox
            status={"warn"}
            message={"Can't delete Email. Status is true."}
          />
        ),
      });
    }

    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      const response = await deleteEmail(communityId);

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

  // ====================================================[Table Setup]================================================================
  const tableHeadRow = [
    "Title",
    // "Content",
    "Created At",
    "Actions",
  ];

  const extractedArray = email?.map((item, index) => {
    return {
      Title: (
        <Tooltip
          className="rounded-2 web-text-xsmall"
          width={"fit-content"}
          placement="top"
          hasArrow
          label={item?.email}
          bg="blue.200"
        >
          <Box display={"flex"} alignItems={"center"} w={200}>
            <Text as={"span"} isTruncated={true}>
              {item?.email}
            </Text>
          </Box>
        </Tooltip>
      ),
      "Created At": (
        <Box
          w={200}
          className="d-flex justify-content-between align-items-center"
        >
          <Text as={"span"} color={"gray.600"} className=" fw-bold">
            {formatDate(item?.createdAt)}
          </Text>
          {/* <Menu>
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
          </Menu> */}
        </Box>
      ),
      Actions: (
        <Box w={200}>
          <Button
            size={"xs"}
            colorScheme="red"
            variant="ghost"
            // onClick={() => {
            //   setDeleteAlert(true);
            // }}
            onClick={() => {
              setActionId(item.id);
              setDeleteAlert(true);
              setActionStatus(item.status);
            }}
          >
            <DeleteIcon me={2} /> Delete
          </Button>
        </Box>
      ),
    };
  });

  // ====================================================[Functions]===================================================================

  return (
    <>
      <TabularView
        title={"News Letter"}
        btnTitle={"Export email"}
        link={"/faq/add-faq"}
        apiData={email}
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
        totalPages={email?.data?.data?.totalPages}
        totalItems={email?.data?.data?.totalItems}
        noDataTitle={"NewsLetter"}
      />
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete Email?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default NewsLetter;
