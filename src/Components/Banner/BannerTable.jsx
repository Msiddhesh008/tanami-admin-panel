import React, { useRef, useState } from "react";
import {
  Box,
  Text,
  Tooltip,
  HStack,
  Input,
  Select,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import DataTable from "../DataTable/DataTable";
import Header from "../Header";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { IMAGE_URI, TABLE_PAGINATION } from "../../Constants/Paginations";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import ToastBox from "../ToastBox";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const BannerCommunity = ({
  dataArray,
  deleteApi,
  statusUpdateApi,
  title,
  addLink,
  viewLink,
  editLink,
}) => {
  // ====================================================[Hooks]===================================================================
  const toast = useToast();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  //   const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [displayRange, setDisplayRange] = useState({
  //     start: TABLE_PAGINATION?.page,
  //     end: pageSize,
  //   });

  // ====================================================[Functions]===================================================================
  const handleDelete = async (bannerId, status) => {
    if (status) {
      return toast({
        render: () => (
          <ToastBox status={"warn"} message="You cant delete active banner" />
        ),
      });
    }
    try {
      // Trigger the mutation
      setDeleteIsLoading(true);
      await deleteApi(bannerId)
        .then((response) => {
          // Handle the response here

          if (response?.data?.statusCode === 200) {
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
          // // console.error("Error creating community:", error);
          setDeleteIsLoading(false);
          setDeleteAlert(false);
        });
    } catch (error) {
      // Handle errors
      // // console.error("Error deleting community:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    if (status) {
      return toast({
        render: () => (
          <ToastBox status={"warn"} message={"Please toggle another banner."} />
        ),
      });
    } else {
      try {
        // Trigger the mutation
        await statusUpdateApi({ id })
          .then((response) => {
            if (response?.data?.statusCode === 201) {
              toast({
                render: () => <ToastBox message={response?.data?.message} />,
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
    }
  };

  // ====================================================[Table Filter]================================================================
  const filteredData = dataArray?.data?.data?.rows?.filter((item) => {
    // Filter by name (case insensitive)
    const name = item.Heading;
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = name.toLowerCase().includes(searchLower);

    const status = item.status;

    const statusMatches =
      statusFilter === "all" ||
      (statusFilter === "active" && status === true) ||
      (statusFilter === "inactive" && status === false);

    return nameMatches && statusMatches;
  });

  // ====================================================[Table Setup]================================================================
  const tableHeadRow = [
    "Banner image",
    "Heading",
    "Sub heading",
    "Button title",
    "Active",
    "Created At",
  ];

  const extractedArray = filteredData?.map((item, index) => {
    return {
      "Banner image": (
        <Image
          w={150}
          h={14}
          rounded={4}
          objectFit="cover"
          src={`${IMAGE_URI}/${item.banner_image}`}
          alt="Dan Abramov"
        />
      ),
      Heading: (
        <Tooltip
          className="rounded-2 web-text-xsmall"
          width={"fit-content"}
          placement="top"
          hasArrow
          label={item?.Heading}
          bg="blue.200"
        >
          <Box display={"flex"} alignItems={"center"} w={180}>
            <Text as={"span"} isTruncated={true}>
              {item?.Heading}
            </Text>
          </Box>
        </Tooltip>
      ),
      "Sub heading": (
        <Tooltip
          className="rounded-2 web-text-xsmall"
          width={"fit-content"}
          placement="top"
          hasArrow
          label={item?.sub_heading}
          bg="blue.200"
        >
          <Box display={"flex"} alignItems={"center"} w={180}>
            <Text as={"span"} isTruncated={true}>
              {item?.sub_heading}
            </Text>
          </Box>
        </Tooltip>
      ),
      "Button title": 
      <Tooltip
        className="rounded-2 web-text-xsmall"
        width={"fit-content"}
        placement="top"
        hasArrow
        label={item?.sub_heading}
        bg="blue.200"
      >
        <Box display={"flex"} alignItems={"center"} w={180} ><Text as={'span'} isTruncated={true}>{item?.CTO_button_title}</Text></Box></Tooltip>,
      Active: (
        <Switch
          size={"sm"}
          colorScheme="purple"
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
                <RouterLink to={`${editLink}${item.id}`}>
                  <MenuItem className="web-text-medium">Edit</MenuItem>
                </RouterLink>
                <RouterLink to={`${viewLink}${item.id}`}>
                  <MenuItem className="web-text-medium">View</MenuItem>
                </RouterLink>
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
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      paddingBottom={50}
      height={"100vh"}
    >
      <Header title={title} btnTitle={`Create banner `} link={addLink} />
      {/* ====================================================[ Top bar ]================================================================ */}

      <Box pt={4}>
        <HStack
          display={"flex"}
          justifyContent={"space-between"}
          ps={1}
          pe={1}
          pb={4}
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
          <HStack>
            <Select
              className="pointer web-text-small"
              width={"90px"}
              rounded="sm"
              size="sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>

            {/* <Select
              className="pointer web-text-small"
              width={"90px"}
              rounded="sm"
              size="sm"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option value={pageSize}>{pageSize}</option>
              <option value={20}>20 rows</option>
              <option value={30}>30 rows</option>
            </Select> */}

            {/* <HStack>
              <ChevronLeftIcon
                onClick={paginationPrev}
                className=" link rounded-3 pointer"
              />
              <Text className="web-text-medium" as={"span"}>
                {displayRange.start} - {displayRange.end} of{" "}
                {dataArray?.data?.data?.totalItems}
              </Text>
              <ChevronRightIcon
                onClick={paginationNext}
                className=" link rounded-3 pointer"
              />
            </HStack> */}
          </HStack>
        </HStack>
      </Box>

      {/* ====================================================[ Table ]================================================================ */}
      <DataTable
        emptyMessage={"We don't have any banner of this heading"}
        tableHeadRow={tableHeadRow}
        data={extractedArray}
        isLoading={dataArray?.isLoading}
      />
      {/* ====================================================[ Alert ]================================================================ */}
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId, actionStatus)}
        message={"Are you sure you want to delete member?"}
        isLoading={deleteIsLoading}
      />
    </Box>
  );
};

export default BannerCommunity;
