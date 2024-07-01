import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
// import error from "../assets/Error.svg"
import robot from "../../../assets/robot.png";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import { useNavigate, useParams } from "react-router-dom";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { useContext } from "react";
// import robot from "../assets/robot.png"
const ViewSponser = () => {
  const params = useParams();
  const navigate = useNavigate()
  const { sponser } = useContext(GlobalStateContext);
  const id = params?.id;

  const found = sponser.find((item) => item?.id.toString() === id.toString());

  const personalDetails = [
    {
      title: "Sponser Name",
      value: found?.sponserName,
    },
    {
      title: "Sponser Name (Arabic)",
      value: found?.sponserNameArabic,
    },
    {
      title: "Mobile no",
      value: found?.mobileNo,
    },
    {
      title: "Sponser address",
      value: found?.sponserAddress,
    },
  ];

  const bankDetails = [
    {
      title: "Bank Name",
      value: found?.bankName,
    },
    {
      title: "Account number",
      value: found?.accountNumber,
    },
    {
      title: "SWIFT/BIC Code",
      value: found?.swiftCode,
    },
    {
      title: "Account Email",
      value: found?.bankEmail,
    },
  ];

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
      <Heading display={'flex'} justifyContent={'space-between'} pe={4} as="h6" size="xs" mt={3}>
        Personal Details <Button colorScheme="green" size={'xs'} rounded={'sm'} onClick={() => navigate(`/sponser/edit-sponser/${id}`)} >Edit sponsers</Button>
      </Heading>
      <Box display={"flex"} gap={0}>
        <Box width={"100%"} pt={5} mb={5} display={"flex"} flexWrap={"wrap"} gap={4}>
          {personalDetails?.map(({ title, value }, index) => (
            <FormControl className="border-end" key={index} w={"49%"} mb={0}>
              <FormLabel textAlign={title === "Sponser Name (Arabic)" ? "right": "left"} color={"gray.500"} fontSize={"xs"}>
                {title}
              </FormLabel>
              <FormLabel textAlign={title === "Sponser Name (Arabic)" ? "right": "left"}  fontSize={"sm"}>{value}</FormLabel>
            </FormControl>
          ))}
        </Box>
      </Box>

      <Divider />
      <Heading as="h6" size="xs" mt={0}>
        Bank Details
      </Heading>
      <Box display={"flex"} gap={0}>
        <Box width={"100%"} pt={5} display={"flex"} flexWrap={"wrap"} gap={4}>
          {bankDetails?.map(({ title, value }, index) => (
            <FormControl  className="border-end" key={index} w={"49%"} mb={0}>
              <FormLabel color={"gray.500"} fontSize={"xs"}>
                {title}
              </FormLabel>
              <FormLabel fontSize={"sm"}>{value}</FormLabel>
            </FormControl>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewSponser;
