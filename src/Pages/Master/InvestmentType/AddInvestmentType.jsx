import React, { useContext, useState } from "react";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import {
  Box,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { TiWarning } from "react-icons/ti";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import FormField from "../../../Components/FormField";
import { v4 as uuidv4 } from "uuid";
import FormInputMain from "../../../Components/FormInputMain";

export const addInvestmentType = yup.object().shape({
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
  const [bannerImageData, setBannerImageData] = useState(null);
  const { investmentType, setInvestmentType } = useContext(GlobalStateContext);
  const [selectedBannerImageData, setSelectedBannerImageData] = useState(null);

  const [otherImageData, setOtherImageData] = useState(null);
  const [selectedOtherImageData, setSelectedOtherImageData] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addInvestmentType),
  });

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    setBannerImageData(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedBannerImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for file input
  const handleOtherImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageData = [...(otherImageData || []), ...files]; // Ensure otherImageData is an array

    setOtherImageData(newImageData);

    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((results) => {
        setSelectedOtherImageData([
          ...(selectedOtherImageData || []),
          ...results,
        ]); // Ensure selectedOtherImageData is an array
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  // Function to remove a specific image
  const removeOtherImage = (index) => {
    const newImageData = otherImageData.filter((_, i) => i !== index);
    const newSelectedImageData = selectedOtherImageData.filter(
      (_, i) => i !== index
    );

    setOtherImageData(newImageData);
    setSelectedOtherImageData(newSelectedImageData);
  };

  console.log(selectedBannerImageData);

  const formFields = [
    {
      label: "Investment name",
      name: "investmentName",
      type: "text",
      isRequired: true,
      section: "Personal Details",
    },
    {
      label: "Investment Name (Arabic)",
      name: "investmentNameArabic",
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
      label: "Investment address",
      name: "investmentAddress",
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
      type: "number",
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
      label: "Annual yeild",
      name: "annualyield",
      type: "number",
      helperText: "Please enter value in percentage",
      isRequired: true,
      section: "Investment Object Details",
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
      <FormInputMain
        groupedFields={groupedFields}
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Box>
  );
};

export default AddInvestmentType;
