import { Box, HStack, Input, Select, Text } from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { TABLE_PAGINATION } from "../../Constants/Paginations";
import { useGetVideosQuery } from "../../Services/api.service";
import { useState } from "react";
import Header from "../../Components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DataTable from "../../Components/DataTable/DataTable";

const TabularView = ({
  apiData,
  tableHeadRow,
  title,
  btnTitle,
  link,
  extractedArray,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPages,
  noDataTitle,
  totalItems,
}) => {
  const [displayRange, setDisplayRange] = useState({
    start: TABLE_PAGINATION?.page,
    end: pageSize,
  });
  // ====================================================[Pagination Setup]================================================================
  const paginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateDisplayRange(currentPage - 1);
    }
  };

  const paginationNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      updateDisplayRange(currentPage + 1);
    }
  };
  const updateDisplayRange = (page) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalItems);
    setDisplayRange({ start, end });
  };

  return (
    <Box
      overflowY={"scroll"}
      paddingBottom={50}
      height={"100vh"}
      {...OPACITY_ON_LOAD}
    >
      <Header title={title} btnTitle={btnTitle} link={link} />

      <Box bg="white.500">
        <HStack
          display={"flex"}
          justifyContent={"space-between"}
          ps={1}
          pe={1}
          pb={4}
          pt={4}
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

            <Select
              className="pointer web-text-small"
              width={"90px"}
              rounded="sm"
              size="sm"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option value={5}>{5}</option>
              <option value={10}>{10}</option>
              <option value={15}>{15}</option>
            </Select>

            <HStack>
              <ChevronLeftIcon
                onClick={paginationPrev}
                className=" link rounded-3 pointer"
              />
              <Text className="web-text-medium" as={"span"}>
                {displayRange.start} - {displayRange.end} of {totalItems}
              </Text>
              <ChevronRightIcon
                onClick={paginationNext}
                className=" link rounded-3 pointer"
              />
            </HStack>
          </HStack>
        </HStack>
      </Box>

      {/* ====================================================[ Table ]================================================================ */}
      <DataTable
        emptyMessage={`We don't have any ${noDataTitle} `}
        tableHeadRow={tableHeadRow}
        data={extractedArray}
        isLoading={apiData?.isLoading}
      />
    </Box>
  );
};

export default TabularView;
