import { Box, FormControl, FormLabel, Image, Text } from "@chakra-ui/react"
// import error from "../assets/Error.svg"
import robot from "../../../assets/robot.png"
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import { useParams } from "react-router-dom";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { useContext } from "react";
// import robot from "../assets/robot.png"
const ViewSponser = () => {
  const params = useParams();
  const { sponser } = useContext(GlobalStateContext);
  const id = params?.id;
    
  const found = sponser.find((item) => item?.id.toString() === id.toString());


  return (
    
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
    <Box display={"flex"} gap={0}>
      <Box width={"100%"} p={5} display={"flex"} flexWrap={"wrap"} gap={4}>

        <FormControl w={'49%'} mb={3} >
          <FormLabel color={'gray.500'} fontSize={"sm"}>Sponser name</FormLabel>
          <FormLabel  fontSize={"sm"}>{found?.sponserName}</FormLabel>
        </FormControl>
        
        <FormControl w={'49%'} mb={3} >
          <FormLabel color={'gray.500'} fontSize={"sm"}>Sponser name ( Arabic )</FormLabel>
          <FormLabel  fontSize={"sm"}>{found?.sponserName}</FormLabel>
        </FormControl>

        
        <FormControl w={'49%'} mb={3} >
          <FormLabel color={'gray.500'} fontSize={"sm"}>Moobile no</FormLabel>
          <FormLabel  fontSize={"md"}>{found?.mobileNo}</FormLabel>
        </FormControl>
        
        
        </Box>
        </Box>
      
    </Box>
  )
}

export default ViewSponser