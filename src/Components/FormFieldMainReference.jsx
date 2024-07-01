import React, { useContext, useState } from "react";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
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
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import FormField from "../../../Components/FormField";
import { v4 as uuidv4 } from "uuid";
import FormInputMain from "../../../Components/AddEditComponentMain";

export const addSponser = yup.object().shape({
  sponserName: yup.string().required("Sponser name is required"),
  sponserNameArabic: yup.string().required("Sponser name is required"),
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

const AddSponser = () => {
  const navigate = useNavigate();
  const [bannerImageData, setBannerImageData] = useState(null);
  const [selectedBannerImageData, setSelectedBannerImageData] = useState(null);

  
  const [otherImageData, setOtherImageData] = useState(null);
  const [selectedOtherImageData, setSelectedOtherImageData] = useState(null);



  const { sponser, setSponser } = useContext(GlobalStateContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSponser),
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
      label: "Banner image",
      name: "banner_image",
      id:"banner_image",
      type: "fileNormal",
      isRequired: true,
      section: "Bank Details",
      multiple:false,
      selectedImageData:selectedBannerImageData,
      setSelectedImageData:setSelectedBannerImageData,
      imageData:bannerImageData,
      handleImageChange:handleBannerImageChange
    },
    {
      label: "Multi Image",
      name: "OtherImage",
      id:"OtherImage",
      type: "fileNormal",
      isRequired: true,
      section: "Bank Details",
      multiple:true,
      selectedImageData:selectedOtherImageData,
      setSelectedImageData:setSelectedOtherImageData,
      imageData:otherImageData,
      handleImageChange:handleOtherImageChange,
      removeImage:removeOtherImage
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

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
    <FormInputMain
      groupedFields={groupedFields}
      control={control}
      errors={errors}

      onSubmit={handleSubmit(onSubmit)}

    /></Box>
  );
};

export default AddSponser;
