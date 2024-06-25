import React from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
  TableCaption,
  Tfoot,
} from "@chakra-ui/react";
import EmptySearchList from "../EmptySearchList";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";

const DataTable = ({ data, isLoading, tableHeadRow, emptyMessage, totalPages, viewActionId, 
  setMouseEntered,
  setMouseEnteredId, }) => {
  const navigate = useNavigate()
  const columnWidth = data && data[0] ? `${(100 / Object.keys(data[0]).length).toFixed(2)}%` : "auto";
  return (
    <TableContainer overflowX={"hidden"} className="h-auto mb-3 w-100">
      {data?.length === 0 ? (
        <EmptySearchList message={emptyMessage} />
      ) : (
        <Table   size="sm">
        {/* <TableCaption><Pagination totalItems={totalPages} /></TableCaption> */}
        <TableCaption>Tanami v1.0</TableCaption>
          <Thead   backgroundColor="gray.50">
            <Tr>
              {tableHeadRow.map((heading, index) => (
                <Th key={index} p={3} w={"auto"} color={"#004118"}>
                  {isLoading ? <Skeleton height="20px" /> : heading}
                  {/* {heading} */}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="web-text-small">
            {isLoading
              ? Array?.from({ length: 10 }).map((_, index) => (
                  <Tr key={index}>
                    {tableHeadRow.map((_, i) => (
                      <Td
                        key={i}
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        className="web-text-small"
                        w={columnWidth}
                      >
                        <Skeleton height="20px" mb={1} mt={1} />
                      </Td>
                    ))}
                  </Tr>
                ))
              : data?.map((item, index) => (
                  <Tr       
                  // onMouseEnter={(e) => {
                  //   e.currentTarget.style.backgroundColor = "transparent"; // Change the background color on hover
                  //   e.currentTarget.style.transition = "0.1s";
                  //   e.currentTarget.style.boxShadow =
                  //     "rgba(0, 0, 0, 0.24) 0px 1px 8px";
                  //   setMouseEntered(true);
                  //   setMouseEnteredId(item.id);
                  // }}
                  // onMouseLeave={(e) => {
                  //   e.currentTarget.style.backgroundColor = "transparent"; // Revert to default background color on hover out
                  //   e.currentTarget.style.transition = "0.3s";
                  //   e.currentTarget.style.boxShadow = "none";
                  //   setMouseEntered(false);
                  // }}
                  transition={'0.5s all'}
                  _hover={{
                    bg:"green.50",
                    cursor: "pointer",
                  }} key={index}>
                    {tableHeadRow.map((heading, i) => (
                      <Td

                      onClick={
                        i === tableHeadRow.length - 1 || i === 0
                          ? null
                          : () => navigate(`edit-sponser/${item.id}`) // Define the onClick handler for other cells
                      }
                        // color={"gray.600"}
                        key={i}
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        className="web-text-small"



                  
                        
                      >
                        {item[heading]}
                      </Td>
                    ))}
                  </Tr>
                ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DataTable;
