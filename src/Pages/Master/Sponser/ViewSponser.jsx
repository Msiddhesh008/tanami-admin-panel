import { Box } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { useContext, useEffect, useState } from "react";
import FormInputView from "../../../Components/FormInputView";
import { useForm } from "react-hook-form"; // assuming react-hook-form is used
import { OPACITY_ON_LOAD } from "../../../Layout/animations";

const ViewSponser = () => {
  const params = useParams();
  const { sponser } = useContext(GlobalStateContext);
  const { reset } = useForm(); // assuming react-hook-form

  const id = params?.id;
  const foundObject = sponser.find(
    (item) => item?.id.toString() === id.toString()
  );

  if (!foundObject) {
    return <Box>Loading...</Box>;
  }

  const formFields = [
    {
      label: "Sponser name",
      value: foundObject.sponserName,
      type: "text",
      isRequired: true,
      section: "Personal Details",
    },
    {
      label: "Sponser Name (Arabic)",
      value: foundObject.sponserName,
      type: "text",
      isRequired: true,
      arabic: true,
      section: "Personal Details",
    },
    {
      label: "Mobile no",
      value: foundObject.mobileNo,
      type: "number",
      isRequired: true,
      section: "Personal Details",
    },
    {
      label: "Sponser address",
      value: foundObject.sponserAddress,
      type: "text",
      isRequired: true,
      section: "Personal Details",
    },
    {
      label: "Bank name",
      value: foundObject.bankName,
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
    {
      label: "Account Name",
      value: foundObject.accountNumber,
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
    {
      label: "SWIFT/BIC Code",
      value: foundObject.swiftCode,
      type: "text",
      isRequired: true,
      section: "Bank Details",
    },
    {
      label: "Account Email",
      value: foundObject.bankEmail,
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

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
      <FormInputView groupedFields={groupedFields} />
    </Box>
  );
};

export default ViewSponser;
