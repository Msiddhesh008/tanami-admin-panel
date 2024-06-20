import React from "react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Skeleton, TableCaption, Tfoot } from "@chakra-ui/react";
import EmptySearchList from "../EmptySearchList";

const DataTable = ({ data, isLoading, tableHeadRow, emptyMessage }) => {
  const columnWidth = data && data[0] ? `${(100 / Object.keys(data[0]).length).toFixed(2)}%` : "auto";
  return (
    <TableContainer overflowX={"hidden"} className="h-auto mb-3 w-100">
      {data?.length === 0 ? (
        <EmptySearchList message={emptyMessage} />
      ) : (
        <Table   size="sm">
        <TableCaption>Rubix v1.0.0</TableCaption>
          <Thead   backgroundColor="purple.50">
            <Tr>
              {tableHeadRow.map((heading, index) => (
                <Th key={index} p={3} w={columnWidth}>
                  {isLoading ? <Skeleton height="20px" /> : heading}
                  {/* {heading} */}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="web-text-small">
            {isLoading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <Tr key={index}>
                    {tableHeadRow.map((_, i) => (
                      <Td key={i} style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="web-text-small" w={columnWidth}>
                        <Skeleton height="20px" mb={1} mt={1} />
                      </Td>
                    ))}
                  </Tr>
                ))
              : data?.map((item, index) => (
                  <Tr key={index}>
                    {tableHeadRow.map((heading, i) => (
                      <Td color={"gray.600"} key={i} style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="web-text-small" >
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
