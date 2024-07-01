import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../../Components/FormField";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import AddSponser from "./AddSponser";

const EditSponser = () => {
  const params = useParams();
  const { sponser } = useContext(GlobalStateContext);
  const [foundObject, setFoundObject] = useState(null);


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddSponser),
    defaultValues: {
      sponserName: foundObject?.sponserName,
      mobileNo: foundObject?.mobileNo,
      sponserAddress: foundObject?.sponserAddress,
      bankName: foundObject?.bankName,
      accountNumber: foundObject?.accountNumber,
      swiftCode: foundObject?.swiftCode,
      bankEmail: foundObject?.bankEmail,
    },
  });

  useEffect(() => {
    console.log(sponser);
    const id = params?.id;
    console.log(id);

    // Ensure id is compared correctly
    const found = sponser.find((item) => item?.id.toString() === id.toString());
    console.log(found);
    setFoundObject(found);

    if (found) {
      reset({
        sponserName: found.sponserName,
        mobileNo: found.mobileNo,
        sponserAddress: found.sponserAddress,
        bankName: found.bankName,
        accountNumber: found.accountNumber,
        swiftCode: found.swiftCode,
        bankEmail: found.bankEmail,
      });
    }
  }, [params, sponser, reset]);

  if (!foundObject) {
    return <Box>Loading...</Box>; // or any loading indicator
  }

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
      <form>
        <Box display={"flex"} gap={0}>
          <Box width={"100%"} p={5} display={"flex"} flexWrap={"wrap"} gap={4}>
            <FormField
              label="Sponser name"
              name="sponserName"
              control={control}
              errors={errors}
              isRequired={true}
            />
            <FormField
              placeHolder={"الرجاء إدخال القيمة"}
              name="اسم الراعي"
              control={control}
              errors={errors}
              isRequired={true}
              arabic={true}
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
        </Box>

        <Divider />

        <Heading as="h6" size="xs" mt={4}>
          Bank Details
        </Heading>
        <Box display={"flex"} gap={0}>
          <Box width={"100%"} p={5} display={"flex"} flexWrap={"wrap"} gap={4}>
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
        </Box>

        <Box display={"flex"} justifyContent={"flex-end"} p={4}>
          <Button
            size={"sm"}
            width={"49.5%"}
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

export default EditSponser;
