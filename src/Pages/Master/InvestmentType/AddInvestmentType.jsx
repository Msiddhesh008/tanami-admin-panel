import React, { useContext, useState } from "react";
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
  Image,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddIcon, CloseIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { TiWarning } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { OPACITY_ON_LOAD } from "../../../Layout/animations";
import GlobalStateContext from "../../../Contexts/GlobalStateContext";
import FormField from "../../../Components/FormField";

const schema = yup.object().shape({
  ioNameArabic: yup.string().required("Arabic name is required"),
  ioName: yup.string().required("Investment Object name is required"),
  sponserName: yup.string().required("Sponser name is required"),
  destributedAmount: yup
    .number()
    .required("Distributed Amount is required")
    .positive("Must be a positive number"),
  year: yup.string().required("Year is required"),
  tenure: yup
    .number()
    .required("Tenure is required")
    .positive("Must be a positive number"),
  annualReturn: yup
    .number()
    .required("Annual Return is required")
    .positive("Must be a positive number"),
  miniInvest: yup
    .number()
    .required("Minimum Invest is required")
    .positive("Must be a positive number"),
  quaterly: yup.string().required("Quaterly is required"),
  targetClose: yup.date().required("Target close date is required"),
  annualyield: yup
    .number()
    .required("Annual Yield is required")
    .positive("Must be a positive number"),
  banner_image: yup.mixed().required("Profile image is required"),
  // .test(
  //   'fileSize',
  //   'File size is too large',
  //   value => value && value.size <= 10485760 // 10MB
  // )
  // .test(
  //   'fileType',
  //   'Unsupported file format',
  //   value => value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
  // ),
  other_image: yup.mixed().required("Profile image is required"),
  // .test(
  //   'fileSize',
  //   'File size is too large',
  //   value => value && value.size <= 10485760 // 10MB
  // )
  // .test(
  //   'fileType',
  //   'Unsupported file format',
  //   value => value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
  // ),
});

const startYear = 2024;
const endYear = 2124;
// const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
const years = Array.from({ length: 2124 - 2024 + 1 }, (_, i) => 2024 + i).map(
  (year) => ({ value: year, label: year })
);

console.log(years);

export function debounce(func, delay) {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}




const AddInvestmentType = () => {
  const navigate = useNavigate();
  const { sponser, setSponser,investment, setInvestment } = useContext(GlobalStateContext);
  const [bannerImageData, setBannerImageData] = useState(null);
  const [otherImageData, setOtherImageData] = useState(null);

  const [selectedBannerImageData, setSelectedBannerImageData] = useState(null);
  const [selectedOtherImageData, setSelectedOtherImageData] = useState(null);
  


  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   destributedAmount: 0,
    //   tenure: 0,
    //   annualReturn: 0,
    //   miniInvest: 0,
    //   annualyield: 0,
    // },
  });

  console.log(errors);

  const onSubmit = (data) => {

    // setValue("banner_image", selectedBannerImageData);
    data.banner_image = selectedBannerImageData;
    const updatedData = { ...data, status: "Available"}
    console.log(selectedBannerImageData);
    setInvestment([...investment,updatedData])
    navigate("/view-io");
    reset();
  };

  // Extract options for the select input
  const sponserOptions = sponser.map((item) => ({
    value: item.sponserName,
    label: item.sponserName,
  }));


  
const investForm = [
  {
    label: "Investment object name",
    name: "ioName",
    type: "text",
    isRequired: true,
  },
  {
    label: "Investment object",
    name: "ioNameArabic",
    placeHolder: "الرجاء إدخال القيمة",
    arabic: true,
    isRequired: true,
  },
  {
    label: "Destributed Amount",
    placeHolder: "$00.0",
    helperText: "Please enter value in $",
    name: "destributedAmount",
    type: "number",
    isRequired: true,
  },
  {
    label: "Min Invest",
    placeHolder: "$00.00",
    helperText: "Please enter value in $",
    name: "miniInvest",
    type: "number",
    isRequired: true,
  },
  {
    label: "Year",
    name: "year",
    type: "select",
    options: years,
    isRequired: true,
  },
  {
    label: "Quaterly",
    name: "quaterly",
    type: "select",
    options: [
      { label: "Q1", value: "Q1" },
      { label: "Q2", value: "Q2" },
      { label: "Q3", value: "Q3" },
      { label: "Q4", value: "Q4" },
    ],
    isRequired: true,
  },
  {
    label: "Sponsers Name",
    name: "sponserName",
    type: "select",
    isRequired: true,
  },
  {
    label: "Target close",
    name: "targetClose",
    type: "date",
    isRequired: true,
  },
  {
    label: "Tenure",
    name: "tenure",
    type: "number",
    isRequired: true,
  },
  {
    label: "Annual yeild",
    placeHolder: "00.00%",
    helperText: "Please enter value in percentage",
    name: "annualyield",
    type: "number",
    isRequired: true,
  },
  {
    label: "Annual return",
    placeHolder: "00.00%",
    helperText: "Please enter value in percentage",
    name: "annualReturn",
    type: "number",
    isRequired: true,
  },
];

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

  const readers = files.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });

  Promise.all(readers).then(results => {
    setSelectedOtherImageData([...(selectedOtherImageData || []), ...results]); // Ensure selectedOtherImageData is an array
  }).catch(error => {
    console.error("Error reading files:", error);
  });
};
// Function to remove a specific image
const removeOtherImage = (index) => {
  const newImageData = otherImageData.filter((_, i) => i !== index);
  const newSelectedImageData = selectedOtherImageData.filter((_, i) => i !== index);

  setOtherImageData(newImageData);
  setSelectedOtherImageData(newSelectedImageData);
};
  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h6" size="xs" mt={4} mb={4}>
          Investment Object Details
        </Heading>
        <Box w={'100%'} display={'flex'} flexWrap={'wrap'} gap={5} p={2}>
          {investForm.map((field, index) => (
            <FormField
              key={index}
              label={field.label}
              name={field.name}
              type={field.type}
              placeHolder={field.placeHolder}
              helperText={field.helperText} 
              options={field.options}
              control={control}
              errors={errors}
              isRequired={true}
            />
          ))}
        </Box>

        <Box display={"flex"} justifyContent={"flex-end"} p={4}>
          <Button
              size={"sm"}
              width={"50%"}
              rounded={"sm"}
              type="submit"
              colorScheme="green"
              mt={4}
            >
              Submit
            </Button>
        </Box>
      </form>

      {/* <Divider /> */}
    </Box>
  );
};

export default AddInvestmentType;
