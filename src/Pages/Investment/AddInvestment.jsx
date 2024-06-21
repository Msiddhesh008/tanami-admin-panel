import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Stack,
  Textarea,
  Heading,
  Button,
  useToast,
  Divider,
  Image,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import fallbackImage from "../../assets/fallBackImage.png";
import fallbackImageLarge from "../../assets/ultp-fallback-img.webp";
import { TiWarning } from "react-icons/ti";

import { motion } from "framer-motion";
import { OPACITY_ON_LOAD } from "../../Layout/animations";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { investmentSchema } from "../../Validations/Validations";
import { useCreateBlogMutation } from "../../Services/api.service";
import { useNavigate } from "react-router-dom";
import Loader01 from "../../Components/Loaders/Loader01";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ChipSelector from "../../Components/ChipSelector/ChipSelector";
import Header from "../../Components/Header";
import ToastBox from "../../Components/ToastBox";

const AddInvestment = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [createBlog] = useCreateBlogMutation(); // Invoke the hook to get the mutation function
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [selectedImageLarge, setSelectedImageLarge] =
    useState(fallbackImageLarge);
  const [largeImageData, setLargeImageData] = useState(null);
  const [smallImageData, setSmallImageData] = useState(null);
  const [chips, setChips] = useState([]);
  const [value, setValue] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [investments, setInvestments] = useState([]);
  const [status, setStatus] = useState("available");
  const [statusAr, setStatusAr] = useState("available");

  const handleDescriptionChange = (e) => {
    setMetaDescription(e.target.value);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue: setYupFormValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(investmentSchema),
  });

  const handleInputChange = (e, field) => {
    setYupFormValue(field, e.target.value);
    setYupFormValue(`${field}_ar`, e.target.value);
  };

  const handleArabicInputChange = (e, field) => {
    setYupFormValue(field, e.target.value);
    setYupFormValue(field.replace("_ar", ""), e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusAr(e.target.value);
  };

  const handleStatusArChange = (e) => {
    setStatusAr(e.target.value);
    setStatus(e.target.value);
  };

  const onSubmit = (data) => {
    const newInvestment = {
      name: data.name,
      address: data.address,
      mobile: data.mobile,
      bankDetails: data.bankDetails,
      bankAccount: data.bankAccount,
      status: data.status,
    };

    setInvestments([...investments, newInvestment]);
    reset();
    navigate("/investment");
  };

  return (
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Header title={"Add Investment"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"}>
          <Box className="col-6 pt-4 p-4">
            <Box>
              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Name
                </FormLabel>
                <Input
                  {...register("name")}
                  placeholder="Enter Name"
                  className="web-text-medium"
                  size="sm"
                  maxLength={90}
                  onChange={(e) => handleInputChange(e, "name")}
                />
                <FormHelperText className="web-text-small">
                  Maximum characters must be 100 characters.
                </FormHelperText>

                {errors.name && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.name.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Address
                </FormLabel>
                <Textarea
                  rows={2}
                  {...register("address")}
                  placeholder="Enter Address"
                  className="web-text-medium"
                  size="sm"
                  onChange={(e) => handleInputChange(e, "address")}
                />
                <FormHelperText className="web-text-small">
                  Maximum characters must be 100 characters.
                </FormHelperText>

                {errors.address && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.address.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Mobile
                </FormLabel>
                <Input
                  {...register("mobile")}
                  placeholder="Enter Mobile"
                  className="web-text-medium"
                  size="sm"
                  maxLength={90}
                  onChange={(e) => handleInputChange(e, "mobile")}
                />
                <FormHelperText className="web-text-small">
                  Maximum characters must be 100 characters.
                </FormHelperText>

                {errors.mobile && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.mobile.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Bank details
                </FormLabel>
                <Input
                  {...register("bankDetails")}
                  placeholder="Enter Bank details"
                  className="web-text-medium"
                  size="sm"
                  maxLength={90}
                  onChange={(e) => handleInputChange(e, "bankDetails")}
                />
                <FormHelperText className="web-text-small">
                  Maximum characters must be 100 characters.
                </FormHelperText>

                {errors.bankDetails && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.bankDetails.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Bank account
                </FormLabel>
                <Input
                  {...register("bankAccount")}
                  placeholder="Enter Bank account"
                  className="web-text-medium"
                  size="sm"
                  maxLength={90}
                  onChange={(e) => handleInputChange(e, "bankAccount")}
                />
                <FormHelperText className="web-text-small">
                  Maximum characters must be 100 characters.
                </FormHelperText>

                {errors.bankAccount && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.bankAccount.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired id="status" mb={3}>
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Status
                </FormLabel>
                <Select
                  name="status"
                  className="web-text-medium"
                  size="sm"
                  required
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option disabled value="select">
                    Select
                  </option>
                  <option value="available">Available</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="closed">Closed</option>
                </Select>
                {errors.status && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.status.message}
                  </span>
                )}
              </FormControl>
            </Box>
          </Box>

          {/* Arabic input */}
          <Box className="col-6 pt-4 p-4">
            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Name (Arabic)
              </FormLabel>
              <Input
                {...register("name_ar")}
                placeholder="Enter Name (Arabic)"
                className="web-text-medium"
                size="sm"
                maxLength={90}
                onChange={(e) => handleArabicInputChange(e, "name_ar")}
              />
              <FormHelperText className="web-text-small">
                Maximum characters must be 100 characters.
              </FormHelperText>

              {errors.name_ar && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.name_ar.message}
                </span>
              )}
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Address (Arabic)
              </FormLabel>
              <Textarea
                rows={2}
                {...register("address_ar")}
                placeholder="Enter Address (Arabic)"
                className="web-text-medium"
                size="sm"
                onChange={(e) => handleArabicInputChange(e, "address_ar")}
              />
              <FormHelperText className="web-text-small">
                Maximum characters must be 100 characters.
              </FormHelperText>

              {errors.address_ar && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.address_ar.message}
                </span>
              )}
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Mobile (Arabic)
              </FormLabel>
              <Input
                {...register("mobile_ar")}
                placeholder="Enter Mobile (Arabic)"
                className="web-text-medium"
                size="sm"
                maxLength={90}
                onChange={(e) => handleArabicInputChange(e, "mobile_ar")}
              />
              <FormHelperText className="web-text-small">
                Maximum characters must be 100 characters.
              </FormHelperText>

              {errors.mobile_ar && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.mobile_ar.message}
                </span>
              )}
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Bank details (Arabic)
              </FormLabel>
              <Input
                {...register("bankDetails_ar")}
                placeholder="Enter Bank details (Arabic)"
                className="web-text-medium"
                size="sm"
                maxLength={90}
                onChange={(e) => handleArabicInputChange(e, "bankDetails_ar")}
              />
              <FormHelperText className="web-text-small">
                Maximum characters must be 100 characters.
              </FormHelperText>

              {errors.bankDetails_ar && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.bankDetails_ar.message}
                </span>
              )}
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Bank account (Arabic)
              </FormLabel>
              <Input
                {...register("bankAccount_ar")}
                placeholder="Enter Bank account (Arabic)"
                className="web-text-medium"
                size="sm"
                maxLength={90}
                onChange={(e) => handleArabicInputChange(e, "bankAccount_ar")}
              />
              <FormHelperText className="web-text-small">
                Maximum characters must be 100 characters.
              </FormHelperText>

              {errors.bankAccount_ar && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.bankAccount_ar.message}
                </span>
              )}
            </FormControl>

            <FormControl isRequired id="status_ar" mb={3}>
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Status (Arabic)
              </FormLabel>
              <Select
                name="status_ar"
                className="web-text-medium"
                size="sm"
                required
                value={statusAr}
                onChange={handleStatusArChange}
              >
                <option disabled value="select">
                  Select
                </option>
                <option value="available">Available</option>
                <option value="upcoming">Upcoming</option>
                <option value="closed">Closed</option>
              </Select>
              {errors.status_ar && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.status_ar.message}
                </span>
              )}
            </FormControl>
            <Box className=" d-flex justify-content-end p-4 m-4">
              <Button
                isLoading={isLoading}
                spinner={<Loader01 />}
                color={"whitesmoke"}
                backgroundColor={"#004118"}
                _hover={{
                  backgroundColor: "#005d22",
                }}
                type="submit"
                size="sm"
                rounded={"sm"}
              >
                New Investment
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddInvestment;
