import {
  Box,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Select,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import {
  useDeleteEventsMutation,
  useGetEventsQuery,
  useUpdateEventsStatusMutation,
} from "../../Services/api.service";
import { useState } from "react";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
import Header from "../../Components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DataTable from "../../Components/DataTable/DataTable";
import { HiDotsVertical } from "react-icons/hi";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import ToastBox from "../../Components/ToastBox";
import TabularView from "../../Components/TabularView/TabularView";

const Events = () => {
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
  const events = useGetEventsQuery({ page: currentPage, size: pageSize });
  const [updateEventsStatus] = useUpdateEventsStatusMutation();
  const [deleteEvents] = useDeleteEventsMutation();

  // ====================================================[Functions]===================================================================
  const handleDelete = async (id) => {
    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      await deleteEvents(id)
        .then((response) => {
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
      // console.error("Error deleting community:", error);
    }
  };
  const handleUpdateStatus = async (id) => {
    try {
      // Trigger the mutation
      await updateEventsStatus({ id })
        .then((response) => {
          // console.log(response?.data);
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

  // ====================================================[Pagination Setup]================================================================
  const paginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateDisplayRange(currentPage - 1);
    }
  };

  const paginationNext = () => {
    const totalPages = Math.ceil(events?.data?.data?.totalItems / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      updateDisplayRange(currentPage + 1);
    }
  };

  const updateDisplayRange = (page) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, events?.data?.data?.totalItems);
    setDisplayRange({ start, end });
  };

  // ====================================================[Table Filter]================================================================
  const filteredData = events?.data?.data?.rows?.filter((item) => {
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
    "Organisation name",
    "Contact no",
    "Email",
    "Location",
    "Status",
    "Created At",
  ];

  const extractedArray = filteredData?.map((item, index) => {
    return {
      Title: <RouterLink to={`view/${item.id}`}>{item?.title}</RouterLink>,
      "Organisation name": item?.organizer_name,
      "Contact no": item?.organizer_mobile_number,
      Email: item?.organizer_email,
      Location: item?.location,

      Status: (
        <Switch
          size={"sm"}
          colorScheme="pink.500"
          onChange={() => handleUpdateStatus(item?.id)}
          isChecked={item?.status}
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

  return (
    <>

    <TabularView
        title={"Events"}
        btnTitle={"Create event"}
        link={"/events/add-events"}
        apiData={events}
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
        totalItems={events?.data?.data?.totalItems}
        totalPages={events?.data?.data?.totalPages}
        
        noDataTitle={"event's"}
      />

      {/* ====================================================[ Alert ]================================================================ */}
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete event?"}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Events;
