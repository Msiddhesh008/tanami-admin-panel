import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { addSponser } from "./AddSponser";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import FormInputMain from "../../../Components/FormInputMain";

const EditSponser = () => {
  const params = useParams();
  const { sponser } = useContext(GlobalStateContext);
  const [foundObject, setFoundObject] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSponser),
  });

  useEffect(() => {
    console.log(sponser);
    const id = params?.id;
    console.log(id);

    // Ensure id is compared correctly
    const found = sponser.find((item) => item?.id.toString() === id.toString());
    console.log(found?.swiftCode);
    setFoundObject(found);

    if (found) {
      reset({
        sponserName: found.sponserName,
        sponserNameArabic: found.sponserNameArabic,
        mobileNo: found.mobileNo,
        sponserAddress: found.sponserAddress,
        bankName: found.bankName,
        swiftCode: found.swiftCode,
        accountNumber: found.accountNumber,
        bankEmail: found.bankEmail,
      });
    }
  }, [params, sponser, reset]);





  if (!foundObject) {
    return <Box>Loading...</Box>; // or any loading indicator
  }

  const formFields = [
    {
      label: "Sponser name",
      name: "sponserName",
      type: "text",
      isRequired: true,
      section: "Personal Details",
    },
    {
      label: "Sponser Name (Arabic)",
      name: "sponserNameArabic",
      type: "text",
      isRequired: true,
      arabic: true,
      section: "Personal Details",
    },
    {
      label: "Mobile no",
      name: "mobileNo",
      type: "number",
      isRequired: true,
      section: "Personal Details",
    },
    {
      label: "Sponser address",
      name: "sponserAddress",
      type: "text",
      isRequired: true,
      section: "Personal Details",
    },
    {
      label: "Bank name",
      name: "bankName",
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
    {
      label: "Account Name",
      name: "accountNumber",
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
    {
      label: "SWIFT/BIC Code",
      name: "swiftCode",
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
    {
      label: "Account Email",
      name: "bankEmail",
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
    {
      label: "Account Email",
      name: "bankEmail",
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
  ];

  const groupedFields = formFields.reduce((groups, field) => {
    const { section } = field;
    if (!groups[section]) {
      groups[section] = [];
    }
    groups[section].push(field);
    return groups;
  }, {});

  const onSubmit = (data) => {
console.log(data);
  }

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
    <FormInputMain
      groupedFields={groupedFields}
      control={control}
      errors={errors}

      onSubmit={handleSubmit(onSubmit)}
    />
    </Box>
  );
};

export default EditSponser;
