import React, { useContext, useEffect, useState } from "react";
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
  Image,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddIcon, CloseIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { TiWarning } from "react-icons/ti";
import GlobalStateContext from "../../Contexts/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import FormField from "../../Components/FormField";
import { v4 as uuidv4 } from "uuid";
import AddIOCharges from "./AddIOCharges";
import FormInputMain from "../../Components/FormInputMain";

const schema = yup.object().shape({
  ioName: yup.string().required("Arabic name is required"),
  ioNameArabic: yup.string().required("Investment Object name is required"),
  discription: yup.string().required("Sponser name is required"),
  discriptionArabic: yup.string().required("Arabic name is required"),
  typeName: yup.string().required("Investment Object name is required"),
  typeNameArabic: yup.string().required("Sponser name is required"),
  sponserName: yup.string().required("Arabic name is required"),
  sponserNameArabic: yup
    .string()
    .required("Investment Object name is required"),
  holdingPeriod: yup.string().required("Sponser name is required"),
  holdingPeriodArabic: yup.string().required("Arabic name is required"),
  ioStartus: yup.string().required("Investment Object name is required"),
  ioStartusArabic: yup.string().required("Sponser name is required"),
  goalAmount: yup.string().required("Arabic name is required"),
  closingDate: yup.string().required("Investment Object name is required"),
  minInvestment: yup.string().required("Sponser name is required"),
  maxInvestment: yup.string().required("Arabic name is required"),
  expectedReturn: yup.string().required("Investment Object name is required"),
  originalValue: yup.string().required("Sponser name is required"),
  keyname: yup.string().required("Arabic name is required"),
  keyNameArabic: yup.string().required("Investment Object name is required"),
  keyDescription: yup.string().required("Sponser name is required"),
  keyDescriptionArabic: yup.string().required("Sponser name is required"),
  docType: yup.string().required("Sponser name is required"),

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
    iconUpload: yup.mixed().required("Profile image is required"),
    bannerImages: yup.mixed().required("Profile image is required"),
    otherImage: yup.mixed().required("Profile image is required"),
    docAttach: yup.mixed().required("Profile image is required"),
    videos: yup.mixed().required("Profile image is required"),
});

const startYear = 2024;
const endYear = 2124;
const years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => startYear + i
).map((year) => ({ value: year, label: year }));

const CreateIO = () => {
  const navigate = useNavigate();
  const { sponser, setSponser, investment, setInvestment } =
    useContext(GlobalStateContext);
  const [bannerImageData, setBannerImageData] = useState(null);
  const [otherImageData, setOtherImageData] = useState(null);
  const [selectedBannerImageData, setSelectedBannerImageData] = useState(null);
  const [selectedOtherImageData, setSelectedOtherImageData] = useState(null);
  const [charges, setCharges] = useState([]);
  const [totalCharge, setTotalCharge] = useState(0.0);
  const [totalAmount, setTotalAmount] = useState(0.0);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const destributedAmount = Number(watch().destributedAmount) || 0;

  useEffect(() => {
    const calculateTotalCharge = () => {
      const totalChargeValue = charges.reduce(
        (acc, { value }) => acc + Number(value),
        0
      );
      setTotalCharge(totalChargeValue);
    };

    const calculateTotalAmount = () => {
      const totalChargeValue = charges.reduce(
        (acc, { value }) => acc + Number(value),
        0
      );
      setTotalAmount(destributedAmount + totalChargeValue);
    };

    calculateTotalCharge();
    calculateTotalAmount();
  }, [charges, destributedAmount]);

  const onSubmit = (data) => {
    // setValue("banner_image", selectedBannerImageData);
    data.banner_image = selectedBannerImageData;
    const updatedData = { ...data, status: "Available" };
    console.log(selectedBannerImageData);
    setInvestment([...investment, updatedData]);
    navigate("/view-io");
    reset();
  };

  // Extract options for the select input
  const sponserOptions = sponser.map((item) => ({
    value: item.sponserName,
    label: item.sponserName,
  }));

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

  const formFields = [
    {
      label: "IO Name (English)",
      placeHolder: " ",
      name: "ioName",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "IO Name (Arabic)",
      placeHolder: " ",
      name: "ioNameArabic",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Description (English)",
      placeHolder: " ",
      name: "discription",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Description (Arabic)",
      placeHolder: " ",
      name: "discriptionArabic",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Investment Type Name (English)",
      placeHolder: " ",
      name: "typeName",
      type: "select",
      isRequired: true,
      section: "create IO",
      options: [
        {
          label: "option 1",
          value: "option 1",
        },
        {
          label: "option 2",
          value: "option 2",
        },
        {
          label: "option 3",
          value: "option 3",
        },
        {
          label: "option 4",
          value: "option 4",
        },
      ],
    },
    {
      label: "Investment Type Name (Arabic)",
      placeHolder: " ",
      name: "typeNameArabic",
      type: "select",
      isRequired: true,
      section: "create IO",
      options: [
        {
          label: "option 1",
          value: "option 1",
        },
        {
          label: "option 2",
          value: "option 2",
        },
        {
          label: "option 3",
          value: "option 3",
        },
        {
          label: "option 4",
          value: "option 4",
        },
      ],
    },
    {
      label: "Sponser Name (English)",
      placeHolder: " ",
      name: "sponserName",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Sponser Name (Arabic)",
      placeHolder: " ",
      name: "sponserNameArabic",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Holding Period (English)",
      placeHolder: " ",
      name: "holdingPeriod",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Holding Period (English)",
      placeHolder: " ",
      name: "holdingPeriodArabic",
      type: "text",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "IO Status (English)",
      placeHolder: " ",
      name: "ioStartus",
      type: "select",
      isRequired: true,
      section: "create IO",
      options: [
        {
          label: "option 1",
          value: "option 1",
        },
        {
          label: "option 2",
          value: "option 2",
        },
        {
          label: "option 3",
          value: "option 3",
        },
        {
          label: "option 4",
          value: "option 4",
        },
      ],
    },
    {
      label: "IO Status (Arabic)",
      placeHolder: " ",
      name: "ioStartusArabic",
      type: "select",
      isRequired: true,
      section: "create IO",
      options: [
        {
          label: "option 1",
          value: "option 1",
        },
        {
          label: "option 2",
          value: "option 2",
        },
        {
          label: "option 3",
          value: "option 3",
        },
        {
          label: "option 4",
          value: "option 4",
        },
      ],
    },
    {
      label: "Goal Amount (English)",
      placeHolder: " ",
      name: "goalAmount",
      type: "number",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Closing Date (English)",
      placeHolder: " ",
      name: "closingDate",
      type: "date",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Minimum Investment Amount (English)",
      placeHolder: " ",
      name: "minInvestment",
      type: "number",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Maximum Investment Amount (English)",
      placeHolder: " ",
      name: "maxInvestment",
      type: "number",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Expected Return Estimated (English)",
      placeHolder: " ",
      name: "expectedReturn",
      type: "number",
      isRequired: true,
      section: "create IO",
    },
    {
      label: "Original Valuation (English)",
      placeHolder: " ",
      name: "originalValue",
      type: "number",
      isRequired: true,
      section: "create IO",
    },

    {
      label: "Name (English)",
      placeHolder: " ",
      name: "keyname",
      type: "text",
      isRequired: true,
      section: "Key Merits",
    },
    {
      label: "Name (Arabic)",
      placeHolder: " ",
      name: "keyNameArabic",
      type: "text",
      isRequired: true,
      section: "Key Merits",
    },
    {
      label: "Description (English)",
      placeHolder: " ",
      name: "keyDescription",
      type: "textarea",
      isRequired: true,
      section: "Key Merits",
    },
    {
      label: "Description (Arabic)",
      placeHolder: " ",
      name: "keyDescriptionArabic",
      type: "textarea",
      isRequired: true,
      section: "Key Merits",
    },
    {
      label: "Icon",
      placeHolder: " ",
      name: "iconUpload",
      type: "fileNormal",
      isRequired: true,
      section: "Key Merits",
    },

    {
      label: "Banner Images ",
      placeHolder: " ",
      name: "bannerImages",
      type: "fileNormal",
      isRequired: true,
      section: "Images",
    },

    {
        label: "Other Images",
        placeHolder: " ",
        name: "otherImage",
        type: "fileNormal",
        isRequired: true,
        section: "Images",
      },
  
    {
      label: "Type",
      placeHolder: " ",
      name: "docType",
      type: "text",
      isRequired: true,
      section: "Documents",
    },
    {
      label: "Attachment",
      placeHolder: " ",
      name: "type",
      type: "docAttach",
      isRequired: true,
      section: "Documents",
    },
    {
      label: "Videos",
      placeHolder: " ",
      name: "videos",
      type: "fileNormal",
      isRequired: true,
      section: "Videos",
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
      <FormInputMain
        groupedFields={groupedFields}
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
      ></FormInputMain>
    </Box>
  );
};

export default CreateIO;
