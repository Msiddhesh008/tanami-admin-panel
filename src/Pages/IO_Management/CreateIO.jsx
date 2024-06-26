import React, { useContext } from "react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { TiWarning } from "react-icons/ti";
import GlobalStateContext from "../../Contexts/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import FormField from "../../Components/FormField";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  sponserName: yup.string().required("Sponser name is required"),
  mobileNo: yup.string().required("Mobile no is required"),
  sponserAddress: yup.string().required("Sponser address is required"),

  bankName: yup.string().required("Bank Name is required"),
  accountNumber: yup.string().required("Account Number is required"),
  swiftCode: yup.string().required("SWIFT/BIC Code is required"),
  bankEmail: yup.string().email("Invalid email format"),

  // routingNumber: yup.string().required("Routing Number is required"),
  // iban: yup.string().required("IBAN is required"),
  // accountType: yup.string().required("Account Type is required"),
  // bankPhoneNumber: yup.string().required("Bank Phone Number is required"),
  // bankBranch: yup.string().required("Bank Branch is required"),
  // branchAddress: yup.string().required("Branch Address is required"),
  // ifscCode: yup.string().required("IFSC Code is required"),
  // accountHolderName: yup.string().required("Account Holder's Name is required"),
});



export function debounce(func, delay) {
  let debounceTimer;
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}
const CreateIO = () => {
  const navigate = useNavigate();
  const { sponser, setSponser } = useContext(GlobalStateContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = (data) => {
    setSponser([
      {
        ...data,
        status: true,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      },
      ...sponser,
    ]);
    navigate("/sponser");
  };


    // Extract options for the select input
    const sponserOptions = sponser.map(item => ({
      value: item.id,
      label: item.sponserName
    }));

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h6" size="xs" mt={4}>
          IO Details
        </Heading>
        <Box display={"flex"} gap={0}>
          <Box
            width={"50%"}
            p={5}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            <FormField
              label="IO name"
              name="IO name"
              control={control}
              errors={errors}
              isRequired={true}
            />

<FormField
  label="Select Option"
  control={control}
  name="selectOption"
  type="select"
  options={sponserOptions}
  errors={errors}
/>


            <FormField
              label="Mobile no"
              name="mobileNo"
              type="tel"
              control={control}
              errors={errors}
              isRequired={true}
            />
            <FormField
              label="Sponser address"
              name="sponserAddress"
              type="textarea"
              control={control}
              errors={errors}
              isRequired={true}
            />
          </Box>

          <Box
            width={"50%"}
            p={5}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            <FormField
              label="اسم الراعي"
              name="اسم الراعي"
              control={control}
              errors={errors}
              isRequired={true}
              arabic={true}
            />
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"flex-start"} p={4}>
          <Button
            size={"sm"}
            width={"50%"}
            rounded={"sm"}
            type="submit"
            colorScheme="green"
          >
            Submit
          </Button>
        </Box>
      </form>
      
      <Divider />
    </Box>
  );
};

export default CreateIO;
