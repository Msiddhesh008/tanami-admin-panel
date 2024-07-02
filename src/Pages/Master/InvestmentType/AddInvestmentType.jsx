import React, { useContext } from "react";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import { Box, Divider, Heading, Button, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { TiWarning } from "react-icons/ti";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import FormField from "../../../Components/FormField";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  investmentName: yup.string().required("Investment name is required"),
  // investmentNameArabic: yup.string().required("Investment name is required"),
  // mobileNo: yup.string().required("Mobile no is required"),
  description: yup.string().required("Description is required"),
  // descriptionArabic: yup.string().required("Description address is required"),

  // bankName: yup.string().required("Bank Name is required"),
  // accountNumber: yup.string().required("Account Number is required"),
  // swiftCode: yup.string().required("SWIFT/BIC Code is required"),
  // bankEmail: yup.string().email("Invalid email format"),

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
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

const AddInvestmentType = () => {
  const navigate = useNavigate();
  const { investmentType, setInvestmentType } = useContext(GlobalStateContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = (data) => {
    setInvestmentType([
      {
        ...data,
        status: true,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      },
      ...investmentType,
    ]);
    navigate("/investment-type");
  };

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h6" size="xs" mt={4}>
          Personal Details
        </Heading>
        <Box display={"flex"} gap={0}>
          <Box width={"100%"} p={5} display={"flex"} flexWrap={"wrap"} gap={4}>
            <FormField
              height={"2.5rem"}
              label="Investment Name (English)"
              name="investmentName"
              control={control}
              errors={errors}
              isRequired={true}
            />
            <FormField
              height={"2.5rem"}
              label="Investment Name (Arabic)"
              // placeHolder={"الرجاء إدخال القيمة"}
              placeHolder={"Investment Name (Arabic)"}
              name="investmentNameArabic"
              control={control}
              errors={errors}
              isRequired={true}
              arabic={true}
            />
            <FormField
              label="Description (English)"
              name="description"
              type="textarea"
              control={control}
              errors={errors}
              isRequired={true}
            />
            <FormField
              label="Description (Arabic)"
              name="descriptionArabic"
              type="textarea"
              control={control}
              errors={errors}
              isRequired={true}
              arabic={true}
            />
          </Box>
        </Box>

        {/* <Heading as="h6" size="xs" mt={4}>
          Bank Details
        </Heading>
        <Box display={"flex"} gap={0}>
          {Array(1).fill(
            <Box
              width={"100%"}
              p={5}
              display={"flex"}
              flexWrap={"wrap"}
              gap={4}
            >
              <FormField
                label="Bank Name"
                name="bankName"
                control={control}
                errors={errors}
                isRequired={true}
              />
              <FormField
                label="Account Number"
                name="accountNumber"
                control={control}
                errors={errors}
                isRequired={true}
              />
              <FormField
                label="SWIFT/BIC Code"
                name="swiftCode"
                control={control}
                errors={errors}
                isRequired={true}
              />
              <FormField
                label="Bank Email (optional)"
                name="bankEmail"
                control={control}
                errors={errors}
              />
            </Box>
          )}
        </Box> */}

        <Box display={"flex"} justifyContent={"flex-end"} p={5}>
          <Button
            padding={"0 3rem"}
            borderRadius={"5px"}
            size={"sm"}
            width={"auto"}
            rounded={"sm"}
            type="submit"
            colorScheme="green"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddInvestmentType;
