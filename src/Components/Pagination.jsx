import React, { useState } from 'react';
import { Select, HStack, Text, Box, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ totalItems, itemsPerPageOptions = [ 10, 15] }) => {
  const [pageSize, setPageSize] = useState(itemsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page whenever page size changes
  };

  const paginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const displayRange = {
    start: (currentPage - 1) * pageSize + 1,
    end: Math.min(currentPage * pageSize, totalItems),
  };

  return (
    <HStack d="flex" justifyContent="flex-end" alignItems="center" >
      {/* <Text className='web-text-small'>Tanami v0.1</Text> */}

      <HStack>
      <Select
        className="pointer web-text-small"
        width={"90px"}
        rounded="sm"
        size="sm"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        {itemsPerPageOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </Select>
        <IconButton
          size={'sm'}
          rounded="sm" 
          icon={<ChevronLeftIcon />}
          onClick={paginationPrev}
          className="link pointer"
          isDisabled={currentPage === 1}
        />
        <Text className="web-text-medium" as={"span"}>
          {displayRange.start} - {displayRange.end} of {totalItems}
        </Text>
        <IconButton
          icon={<ChevronRightIcon />}
          size={'sm'}
          rounded="sm" 
          onClick={paginationNext}
          className="link pointer"
          isDisabled={currentPage === totalPages}
        />
      </HStack>
    </HStack>
  );
};

export default Pagination;