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
  Badge,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DataTable from "../../Components/DataTable/DataTable";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { Link as RouterLink } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useDeleteCommunityMutation,
  useGetBlogQuery,
  useGetCommunityBannerQuery,
  useGetCommunityByIdQuery,
  useGetCommunityQuery,
  useUpdateBlogStatusMutation,
  useUpdateCommunityStatusMutation,
} from "../../Services/api.service";
import { HiDotsVertical } from "react-icons/hi";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import CustomAlertDialog from "../../Components/CustomAlertDialog";
import Header from "../../Components/Header";
import ToastBox from "../../Components/ToastBox";
import TabularView from "../../Components/TabularView/TabularView";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const Investment = ({ investments = [] }) => {
  // ====================================================[Hooks]===================================================================
  const toast = useToast();
  const [pageSize, setPageSize] = useState(TABLE_PAGINATION?.size);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  // const blog = useGetBlogQuery({ page: currentPage, size: pageSize });
  // const [deleteBlog] = useDeleteBlogMutation();
  // const [updateBlogStatus] = useUpdateBlogStatusMutation();
  // ====================================================[Functions]===================================================================

  const staticData = [
    {
      id: 1,
      name: "EcoTech Innovations",
      address: "Baharain",
      mobile: "Available",
      bank_details: "+ $ 25.500",
      bank_account: "100",
      status: "Available",
    },
    {
      id: 2,
      name: "Solaris Ventures",
      address: "Kuwait",
      mobile: "Upcoming",
      bank_details: "+ $ 20.500",
      bank_account: "50",
      status: "Upcoming",
    },
  ];

  const handleDelete = async (id) => {
    setDeleteIsLoading(true);
    // Simulate deletion
    setTimeout(() => {
      setDeleteIsLoading(false);
      setDeleteAlert(false);
      toast({
        title: "Deleted",
        description: `Item with id ${id} has been deleted.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  const handleUpdateStatus = async (id) => {
    // Simulate status update
    toast({
      title: "Updated",
      description: `Status for item with id ${id} has been updated.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredData = staticData.filter((item) => {
    const nameMatches = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatches =
      statusFilter === "all" ||
      (statusFilter === "active" && item.active_blog) ||
      (statusFilter === "inactive" && !item.active_blog);

    return nameMatches && statusMatches;
  });

  const tableHeadRow = [
    "S/N",
    "Name",
    "Address",
    "Mobile",
    "Active",
    "Bank Details",
    "Bank Account",
    "Status",
  ];

  const extractedArray = filteredData.map((item, index) => ({
    "S/N": (
      <RouterLink className="d-flex align-items-center gap-2 pointer">
        <span className="d-flex flex-column" style={{ width: "auto" }}>
          <Text
            as={"span"}
            color={"gray.600"}
            className="d-flex fw-bold align-items-center web-text-small"
          >
            {index + 1}.
          </Text>
        </span>
      </RouterLink>
    ),
    Name: (
      <Tooltip
        className="rounded-2 web-text-xsmall"
        width={"fit-content"}
        placement="top"
        hasArrow
        bg="blue.200"
      >
        <Box display={"flex"} alignItems={"center"} w={"auto"}>
          <Text as={"span"} isTruncated={true}>
            {item.name}
          </Text>
        </Box>
      </Tooltip>
    ),
    Address: (
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={1}
        alignItems={"center"}
        w={"auto"}
      >
        <Text as={"span"} isTruncated={true}>
          {item.address}
        </Text>
      </Box>
    ),
    Mobile: (
      <Box display={"flex"} alignItems={"center"} w={"auto"}>
        <Text as={"span"} isTruncated={true}>
          {item.mobile}
        </Text>
      </Box>
    ),
    Active: (
      <Switch
        size={"sm"}
        colorScheme="teal"
        onChange={() => handleUpdateStatus(item.id)}
        isChecked={item.active_blog}
      />
    ),
    "Bank Details": (
      <Box display={"flex"} alignItems={"center"} w={"auto"}>
        <Text as={"span"} isTruncated={true}>
          {item.bank_details}
        </Text>
      </Box>
    ),
    "Bank Account": (
      <Box display={"flex"} alignItems={"center"} w={"auto"}>
        <Text as={"span"} isTruncated={true}>
          {item.bank_account}
        </Text>
      </Box>
    ),
    Status: (
      <span className="d-flex justify-content-between align-items-center">
        <Text as={"span"} color={"gray.600"}>
          {item.status}
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
  }));

  return (
    <>
      <TabularView
        title={""}
        btnTitle={"Add Investment"}
        link={"/investment/add-investment"}
        apiData={{
          isLoading: false,
          data: { totalItems: investments.length, totalPages: 1 },
        }}
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
        totalItems={investments.length}
        totalPages={1}
        noDataTitle={"Investments"}
      />
      <CustomAlertDialog
        onClose={() => setDeleteAlert(false)}
        isOpen={deleteAlert}
        alertHandler={() => handleDelete(actionId)}
        message={"Are you sure you want to delete this item?"}
        isLoading={deleteIsLoading}
      />
    </>
  );

  // const handleDelete = async (communityId) => {
  //   try {
  //     // Trigger the mutation
  //     setDeleteIsLoading(true);
  //     await deleteBlog(communityId)
  //       .then((response) => {
  //         // Handle the response here
  //         // // console.log("Mutation response:", response?.data?.statusCode);
  //         // // console.log("Mutation response:", response?.data?.message);

  //         if (response?.data?.statusCode === 201) {
  //           setDeleteIsLoading(false);
  //           setDeleteAlert(false);
  //         }
  //       })
  //       .catch((error) => {
  //         // // console.error("Error creating community:", error);
  //         setDeleteIsLoading(false);
  //         setDeleteAlert(false);
  //       });
  //   } catch (error) {
  //     // Handle errors
  //     // // console.error("Error deleting community:", error);
  //   }
  // };

  // const handleUpdateStatus = async (id) => {
  //   try {
  //     // Trigger the mutation
  //     await updateBlogStatus({ id })
  //       .then((response) => {
  //         if (response?.data?.statusCode === 201) {
  //           toast({
  //             render: () => (
  //               <ToastBox
  //                 status={"success"}
  //                 message={response?.data?.message}
  //               />
  //             ),
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         // // console.log(error);
  //       });
  //   } catch (error) {
  //     // Handle errors
  //     // // console.error("Error updating community status:", error);
  //   }
  // };

  // // ====================================================[Table Filter]================================================================
  // const filteredData = blog?.data?.data?.rows?.filter((item) => {
  //   // Filter by name (case insensitive)
  //   const name = item.author_name;
  //   const searchLower = searchTerm.toLowerCase();
  //   const nameMatches = name.toLowerCase().includes(searchLower);

  //   // Filter by status
  //   const status = item.active_blog;

  //   const statusMatches =
  //     statusFilter === "all" ||
  //     (statusFilter === "active" && status === true) ||
  //     (statusFilter === "inactive" && status === false);

  //   return nameMatches && statusMatches;
  // });

  // // ====================================================[Table Setup]================================================================
  // const tableHeadRow = [
  //   "S/N",
  //   // "Discription",
  //   "InvestorName",
  //   "Country",
  //   "InvestedAmount",
  //   "USDAmount",
  // ];
  // const extractedArray = filteredData?.map((item, index) => {
  //   return {
  //     "S/N": (
  //       <RouterLink
  //         // to={`view/${item.id}`}
  //         className="d-flex align-items-center gap-2 pointer"
  //       >
  //         {/* <Avatar
  //           size="sm"
  //           name="Default"
  //           src={`${API_URL}/${item.profile_image}`}
  //         /> */}
  //         <span className="d-flex flex-column">
  //           <Text
  //             as={"span"}
  //             color={"gray.600"}
  //             className="d-flex fw-bold align-items-center web-text-small"
  //           >
  //             {/* {item?.author_name} */}
  //             1.
  //           </Text>
  //           {/* <span className="d-flex align-items-center web-text-xsmall text-secondary">
  //             {item?.author_designation}
  //           </span> */}
  //         </span>
  //       </RouterLink>
  //     ),
  //     // Discription: (
  //     //   <Tooltip
  //     //     className="rounded-2 web-text-xsmall"
  //     //     width={"fit-content"}
  //     //     placement="top"
  //     //     hasArrow
  //     //     label={item?.meta_description}
  //     //     bg="blue.200"
  //     //   >
  //     //     <Box display={"flex"} alignItems={"center"} w={200}>
  //     //       <Text as={"span"} isTruncated={true}>
  //     //         {item?.meta_description}
  //     //       </Text>
  //     //     </Box>
  //     //   </Tooltip>
  //     // ),
  //     InvestorName: (
  //       <Tooltip
  //         className="rounded-2 web-text-xsmall"
  //         width={"fit-content"}
  //         placement="top"
  //         hasArrow
  //         // label={item?.summary}
  //         bg="blue.200"
  //       >
  //         <Box display={"flex"} alignItems={"center"} w={400}>
  //           <Text as={"span"} isTruncated={true}>
  //             {/* {item?.summary} */}
  //             Faisal
  //           </Text>
  //         </Box>
  //       </Tooltip>
  //     ),
  //     Country: (
  //       <Box
  //         display={"flex"}
  //         flexWrap={"wrap"}
  //         gap={1}
  //         alignItems={"center"}
  //         w={200}
  //       >
  //         {/* {item?.tags?.map(({ id, tag }) => (
  //           <Badge
  //             rounded={"full"}
  //             key={id}
  //             variant="solid"
  //             fontWeight={"normal"}
  //             size={"sm"}
  //             ps={3}
  //             pe={3}
  //             pt={0.5}
  //             pb={0.5}
  //             backgroundColor={"#565263"}
  //           >
  //             {tag}
  //           </Badge>
  //         ))} */}
  //         <Text as={"span"} isTruncated={true}>
  //           Baharain
  //         </Text>
  //       </Box>
  //     ),
  //     InvestedAmount: (
  //       // <Switch
  //       //   size={"sm"}
  //       //   colorScheme="teal"
  //       //   onChange={() => handleUpdateStatus(item.id)}
  //       //   isChecked={item.active_blog}
  //       // />

  //       <Box display={"flex"} alignItems={"center"} w={400}>
  //         <Text as={"span"} isTruncated={true}>
  //           60000
  //         </Text>
  //       </Box>
  //     ),
  //     USDAmount: (
  //       <span className="d-flex justify-content-between align-items-center">
  //         <Text as={"span"} color={"gray.600"} className=" fw-bold">
  //           {/* {formatDate(item?.createdAt)} */}
  //           3000
  //         </Text>
  //         <Menu>
  //           <MenuButton className="link p-1 rounded-1">
  //             <HiDotsVertical className="rubix-text-dark fs-6" />
  //           </MenuButton>
  //           <Portal>
  //             <MenuList minWidth="80px">
  //               <RouterLink to={`edit/${item.id}`}>
  //                 <MenuItem className="web-text-medium">Edit</MenuItem>
  //               </RouterLink>
  //               <RouterLink to={`view/${item.id}`}>
  //                 <MenuItem className="web-text-medium">View</MenuItem>
  //               </RouterLink>
  //               <MenuItem
  //                 onClick={() => {
  //                   setActionId(item.id);
  //                   setDeleteAlert(true);
  //                 }}
  //                 className="web-text-medium"
  //               >
  //                 Delete
  //               </MenuItem>
  //             </MenuList>
  //           </Portal>
  //         </Menu>
  //       </span>
  //     ),
  //   };
  // });

  // return (
  //   <>
  //     <TabularView
  //       title={"Investments"}
  //       btnTitle={"Create"}
  //       link={"/blogs-articles/add-blog"}
  //       apiData={blog}
  //       tableHeadRow={tableHeadRow}
  //       extractedArray={extractedArray}
  //       searchTerm={searchTerm}
  //       setSearchTerm={setSearchTerm}
  //       statusFilter={statusFilter}
  //       setStatusFilter={setStatusFilter}
  //       pageSize={pageSize}
  //       setPageSize={setPageSize}
  //       currentPage={currentPage}
  //       setCurrentPage={setCurrentPage}
  //       totalItems={blog?.data?.data?.totalItems}
  //       totalPages={blog?.data?.data?.totalPages}
  //       noDataTitle={"Investments"}
  //     />
  //     <CustomAlertDialog
  //       onClose={() => setDeleteAlert(false)}
  //       isOpen={deleteAlert}
  //       alertHandler={() => handleDelete(actionId)}
  //       message={"Are you sure you want to delete blogs?"}
  //       isLoading={deleteIsLoading}
  //     />
  //   </>
  // );
};

export default Investment;
