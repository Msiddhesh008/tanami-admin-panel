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
  other_image: yup.mixed().required("Profile image is required"),
});

const startYear = 2024;
const endYear = 2124;
const years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => startYear + i
).map((year) => ({ value: year, label: year }));

const CreateIO = () => {
  const navigate = useNavigate();
  const { sponser } = useContext(GlobalStateContext);
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
    console.log(data);
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

  return (
    <Box {...OPACITY_ON_LOAD} overflowY={"scroll"} height={"100vh"} pb={14}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h6" size="xs" mt={4}>
          Investment Object Details
        </Heading>
        <Box width={"100%"} p={5} display={"flex"} flexWrap={"wrap"} gap={4}>
          <FormField
            label="Investment object name"
            name="ioName"
            control={control}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Investment object"
            name="ioNameArabic"
            placeHolder={"الرجاء إدخال القيمة"}
            control={control}
            errors={errors}
            isRequired={true}
            arabic={true}
          />

          <FormField
            label="Destributed Amount"
            placeHolder={"$00.0"}
            helperText={"Please enter value in $"}
            name="destributedAmount"
            type="number"
            control={control}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Min Invest"
            placeHolder={"$00.00"}
            helperText={"Please enter value in $"}
            name="miniInvest"
            type="number"
            control={control}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Sponsers Name"
            control={control}
            name="sponserName"
            type="select"
            options={sponserOptions}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Year"
            control={control}
            name="year"
            type="select"
            options={years}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Annual return"
            placeHolder={"00.00%"}
            helperText={"Please enter value in percentage"}
            name="annualReturn"
            type="number"
            control={control}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Annual yeild"
            placeHolder={"00.00%"}
            helperText={"Please enter value in percentage"}
            name="annualyield"
            type="number"
            control={control}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Quaterly"
            control={control}
            name="quaterly"
            type="select"
            options={[
              {
                label: "Q1",
                value: "Q1",
              },
              {
                label: "Q2",
                value: "Q2",
              },
              {
                label: "Q3",
                value: "Q3",
              },
              {
                label: "Q4",
                value: "Q4",
              },
            ]}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Tenure"
            // helperText={"Please enter value in Dollar"}
            name="tenure"
            type="number"
            control={control}
            errors={errors}
            isRequired={true}
          />

          <FormField
            label="Target close"
            name="targetClose"
            type="date"
            control={control}
            errors={errors}
            isRequired={true}
          />
        </Box>

        <Divider />

        <Heading w={"100%"} as="h6" size="xs" mb={5}>
          Uplaod Banner Images
        </Heading>
        <Box
          width={"100%"}
          p={5}
          pt={0}
          display={"flex"}
          flexWrap={"wrap"}
          gap={4}
        >
          <FormField
            label="Banner image"
            control={control}
            name="banner_image"
            type="fileNormal"
            helperText={"You can select only one image for banner."}
            errors={errors}
            multiple={false}
            handleImageChange={handleBannerImageChange}
            isRequired={true}
            rules={{
              required: "Profile image is required",
            }}
            // register={register}  // Pass register function to FormField
          />

          <FormField
            id="otherImageInput"
            label="Other images"
            control={control}
            name="other_image"
            type="fileNormal"
            multiple={true}
            errors={errors}
            handleImageChange={handleOtherImageChange}
            isRequired={true}
            rules={{
              required: "Profile image is required",
            }}
            // register={register}  // Pass register function to FormField
          />

          {selectedBannerImageData && (
            <Box width={"49%"}>
              <Image
                rounded={"md"}
                objectFit={"cover"}
                src={selectedBannerImageData}
                alt="profile"
                width={100}
                height={100}
              />
              <Box
                w={"30%"}
                display={"flex"}
                flexDirection={"column"}
                position={"relative"}
              >
                <CloseIcon
                  onClick={() => setSelectedBannerImageData(null)}
                  className="link pointer"
                  p={1}
                  fontSize={"lg"}
                  color={"red"}
                  fontWeight={"500"}
                  rounded={"md"}
                  position={"absolute"}
                  top={1}
                  right={0}
                />
                <Text
                  as={"span"}
                  fontSize={"xs"}
                  w={"70%"}
                  fontWeight={"500"}
                  mt={1}
                  isTruncated={true}
                >
                  {bannerImageData?.name}
                </Text>
                <Text as={"span"} fontSize={"xs"} fontStyle={"italic"}>
                  {(bannerImageData?.size / (1024 * 1024)).toFixed(2)} mb
                </Text>
              </Box>
            </Box>
          )}

          {selectedOtherImageData?.length > 0 && (
            <Box width={"49.5%"} display="flex" flexWrap="wrap" gap={4}>
              {selectedOtherImageData.map((imageData, index) => (
                <Box key={index} width={"100px"}>
                  <Image
                    rounded={"md"}
                    objectFit={"cover"}
                    src={imageData}
                    alt={`profile-${index}`}
                    width={100}
                    height={100}
                  />
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    position={"relative"}
                  >
                    <CloseIcon
                      onClick={() => removeOtherImage(index)}
                      bg={"#fff"}
                      className="link pointer"
                      p={1}
                      fontSize={"lg"}
                      color={"red"}
                      fontWeight={"500"}
                      rounded={"md"}
                      position={"absolute"}
                      bottom={0}
                      right={0}
                    />
                    <Text
                      as={"span"}
                      fontSize={"xs"}
                      fontWeight={"500"}
                      mt={1}
                      isTruncated={true}
                    >
                      {otherImageData[index]?.name}
                    </Text>
                    <Text as={"span"} fontSize={"xs"} fontStyle={"italic"}>
                      {(otherImageData[index]?.size / (1024 * 1024)).toFixed(2)}{" "}
                      mb
                    </Text>
                  </Box>
                </Box>
              ))}
              {/* <Box  width={"100px"} display={'flex'} alignItems={'center'}> */}
              <AddIcon
                onClick={() =>
                  document.getElementById("otherImageInput").click()
                }
                rounded={"md"}
                width={50}
                height={50}
                mt={26}
                p={4}
                cursor={"pointer"}
                // rounded={'md'}
                className="link"
              />
              {/* </Box> */}
            </Box>
          )}
        </Box>



        
        <Divider />
        <Heading
          w={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          as="h6"
          size="xs"
          mb={5}
          pe={6}
        >
          Final calculation
          <AddIOCharges charges={charges} setCharges={setCharges} />
        </Heading>

        <Box
          w={"40%"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"start"}
          gap={1}
          p={5}
          m={1}
          rounded={"lg"}
          boxShadow={"lg"}
          color={"#fff"}
          bgGradient="linear(to-tr, #000000, #004118)"
        >
          {charges.map(({ title, value }, index) => (
            <Box as={"span"} w={"100%"} display={"flex"}>
              <Text
                fontSize={"sm"}
                fontWeight={"600"}
                as={"span"}
                w={"70%"}
                bg={""}
              >
                {title}
              </Text>
              <Text
                as={"span"}
                fontSize={"sm"}
                fontWeight={"600"}
                w={"30%"}
                bg={""}
              >
                $ {value}
              </Text>
            </Box>
          ))}

          <Box
            as={"span"}
            w={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
          >
            {totalCharge !== 0 ? (
              <Box display={"flex"}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"500"}
                  as={"span"}
                  w={"70%"}
                  bg={""}
                >
                  Total charges
                </Text>
                <Text
                  as={"span"}
                  fontSize={"sm"}
                  fontWeight={"600"}
                  w={"30%"}
                  bg={""}
                >
                  $ {totalCharge.toFixed(4)}
                </Text>
              </Box>
            ) : (
              ""
            )}


<Box display={"flex"}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"500"}
                  as={"span"}
                  w={"70%"}
                  bg={""}
                >
                  Total distributed amount
                </Text>
                <Text
                  as={"span"}
                  fontSize={"sm"}
                  fontWeight={"600"}
                  w={"30%"}
                  bg={""}
                >
                  $ {destributedAmount.toFixed(4)}
                </Text>
              </Box>
            
            <Box pt={2} borderTop={"1px solid #fff"} as="span" display={"flex"}>
              <Text
                fontSize={"sm"}
                fontWeight={"500"}
                as={"span"}
                w={"70%"}
                bg={""}
              >
                Total Net Charges
              </Text>
              <Text
                as={"span"}
                fontSize={"sm"}
                fontWeight={"600"}
                w={"30%"}
                bg={""}
              >
                $ {totalAmount.toFixed(4)}
              </Text>
            </Box>


          </Box>
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
    </Box>
  );
};

export default CreateIO;
