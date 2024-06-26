import {
  Box,
  Image,
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
// import robot from "../assets/robot.png"
const ExchangeRate = () => {
  const { investment, setInvestment } = useContext(GlobalStateContext);
  const [isLoading, setIsLoading] = useState(true);

  


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);




  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"}>
      <Tabs position="relative" variant="unstyled" mt={2}>
        <TabList>
          <Tab fontSize={"sm"}>All</Tab>
          <Tab fontSize={"sm"}>Available</Tab>
          <Tab fontSize={"sm"}>Upcomming</Tab>
          <Tab fontSize={"sm"}>Closed</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="green.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            {investment?.map((investmentDetails, index) => (
                <Skeleton isLoaded={!isLoading}><InvestmentCard key={index} investment={investmentDetails} /></Skeleton>
                ))}
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ExchangeRate;
