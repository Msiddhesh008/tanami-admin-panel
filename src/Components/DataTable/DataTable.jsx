import React, { useContext } from "react";
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

import GlobalStateContext from "../../Contexts/GlobalStateContext";

const DataTable = ({
  data,
  isLoading,
  tableHeadRow,
  emptyMessage,
  totalPages,
  setMouseEntered,
  setMouseEnteredId,
}) => {
  const navigate = useNavigate();
  const { slideFromRight } = useContext(GlobalStateContext);

  const columnWidth =
    data && data[0]
      ? `${(100 / Object.keys(data[0]).length).toFixed(2)}%`
      : "auto";
  return (
    <TableContainer overflowX={"hidden"} className="h-auto mb-3 w-100">
      {data?.length === 0 ? (
        <EmptySearchList message={emptyMessage} />
      ) : (
        <Table size="sm">
          {/* <TableCaption><Pagination totalItems={totalPages} /></TableCaption> */}
          <TableCaption>Tanami v1.0</TableCaption>
          <Thead backgroundColor="gray.50">
            <Tr>
              {tableHeadRow.map((heading, index) => (
                <Th
                  textAlign={slideFromRight ? "right" : "left"}
                  key={index}
                  p={3}
                  w={"auto"}
                  color={"#004118"}
                >
                  <Skeleton isLoaded={!isLoading}
        fadeDuration={0.4} height="20px" >{heading}</Skeleton> 
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="web-text-small">
         { data?.map((item, index) => (
                  <Tr
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"; // Change the background color on hover
                      e.currentTarget.style.transition = "0.1s";
                      e.currentTarget.style.boxShadow =
                        "rgba(0, 0, 0, 0.24) 0px 1px 8px";
                      setMouseEntered(true);
                      setMouseEnteredId(item.id);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"; // Revert to default background color on hover out
                      e.currentTarget.style.transition = "0.3s";
                      e.currentTarget.style.boxShadow = "none";
                      setMouseEntered(false);
                    }}
                    transition={"0.5s all"}
                    _hover={{
                      bg: "green.50",
                      cursor: "pointer",
                    }}
                    key={index}
                  >
                    {tableHeadRow.map((heading, i) => (
                      <Td
                        textAlign={slideFromRight ? "right" : "left"}
                        color={"gray.600"}
                        key={i}
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        className="web-text-small"
                        // onClick={
                        //   i === tableHeadRow.length - 1 || i === 0
                        //     ? null
                        //     : () => navigate(`edit-sponser/${item.id}`) // Define the onClick handler for other cells
                        // }
                      >
                        <Skeleton fadeDuration={index / 12} isLoaded={!isLoading} >{item[heading]}</Skeleton>
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
