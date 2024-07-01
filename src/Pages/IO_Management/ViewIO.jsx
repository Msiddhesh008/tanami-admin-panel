import {
  Box,
  Image,
  Input,
  Select,
  Skeleton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
// import error from "../assets/Error.svg"
// import robot from "../../../assets/robot.png"
import { useContext, useEffect, useState } from "react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import InvestmentCard from "../../Components/InvestmentCard/InvestmentCard";
import GlobalStateContext from "../../Contexts/GlobalStateContext";
import Pagination from "../../Components/Pagination";
import EmptySearchList from "../../Components/EmptySearchList";

const ExchangeRate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { investment, setInvestment } = useContext(GlobalStateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // ====================================================[Table Filter]================================================================
  const filteredData = investment?.filter((item) => {
    // Filter by name (case insensitive)
    const name = item?.ioName;
    const searchLower = searchTerm?.toLowerCase();
    const nameMatches = name?.toLowerCase().includes(searchLower);

    // Filter by status
    const status = item.status;
    // const statusLower = status ? "active" : "inactive";

    const statusMatches =
      statusFilter === "all" ||
      (statusFilter === "Available" && status === "Available") ||
      (statusFilter === "Upcomming" && status === "Upcomming") ||
      (statusFilter === "Closed" && status === "Closed");

      return nameMatches && statusMatches;
  });

  const availableInvestments = filteredData.filter(
    (item) => item.status === "Available"
  );
  const upcomingInvestments = filteredData.filter(
    (item) => item.status === "Upcomming"
  );
  const closedInvestments = filteredData.filter(
    (item) => item.status === "Closed"
  );

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
      <Tabs position="relative" variant="unstyled" mt={2} >
        <TabList>
          {/* <Tab fontSize={"sm"}>All</Tab> */}
          {/* <Tab fontSize={"sm"}>Available</Tab>
          <Tab fontSize={"sm"}>Upcomming</Tab>
          <Tab fontSize={"sm"}>Closed</Tab> */}
        </TabList>
        {/* <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="green.500"
          borderRadius="1px"
        /> */}
        <TabPanels>
          <TabPanel>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Input
                type="search"
                width={300}
                placeholder="Search..."
                size="sm"
                rounded="sm"
                focusBorderColor="green.500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            <Box display={"flex"} gap={2} >
              <Select pb={1}
              className="pointer web-text-small"
              width={"100px"}
              rounded="sm"
              size="sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Available">Available</option>
              <option value="Upcomming">Upcomming</option>
              <option value="Closed">Closed</option>
            </Select>
              <Pagination pageCount={false} totalItems={50} />
              </Box>
            </Box>
            {filteredData?.length === 0 ? (
              <EmptySearchList message="We have no IO with this name" />
            ) : (
              filteredData?.map((investmentDetails, index) => (
                <Skeleton key={index} isLoaded={!isLoading}>
                  <InvestmentCard investment={investmentDetails} />
                </Skeleton>
              ))
            )}
          </TabPanel>

          {/* <TabPanel>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Input
                type="search"
                width={300}
                placeholder="Search..."
                size="sm"
                rounded="sm"
                focusBorderColor="green.500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Pagination pageCount={false} totalItems={50} />
            </Box>
            {availableInvestments?.length === 0 ? (
              <EmptySearchList message="We have no IO with this name" />
            ) : (
              availableInvestments?.map((investmentDetails, index) => (
                <Skeleton key={index} isLoaded={!isLoading}>
                  <InvestmentCard investment={investmentDetails} />
                </Skeleton>
              ))
            )}
          </TabPanel>

          <TabPanel>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Input
                type="search"
                width={300}
                placeholder="Search..."
                size="sm"
                rounded="sm"
                focusBorderColor="green.500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Pagination pageCount={false} totalItems={50} />
            </Box>
            {upcomingInvestments?.length === 0 ? (
              <EmptySearchList message="We have no IO with this name" />
            ) : (
              upcomingInvestments?.map((investmentDetails, index) => (
                <Skeleton key={index} isLoaded={!isLoading}>
                  <InvestmentCard investment={investmentDetails} />
                </Skeleton>
              ))
            )}
          </TabPanel>

          <TabPanel>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Input
                type="search"
                width={300}
                placeholder="Search..."
                size="sm"
                rounded="sm"
                focusBorderColor="green.500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Pagination pageCount={false} totalItems={50} />

            </Box>
            {closedInvestments?.length === 0 ? (
              <EmptySearchList message="We have no IO with this name" />
            ) : (
              closedInvestments?.map((investmentDetails, index) => (
                <Skeleton key={index} isLoaded={!isLoading}>
                  <InvestmentCard investment={investmentDetails} />
                </Skeleton>
              ))
            )}
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ExchangeRate;
