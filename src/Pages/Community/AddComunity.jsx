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
} from "@chakra-ui/react";
import React, { useState } from "react";
import fallbackImage from "../../assets/fallBackImage.png";
import { TiWarning } from "react-icons/ti";

import { motion } from "framer-motion";
import { OPACITY_ON_LOAD } from "../../Layout/animations";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addCommunitySchema } from "../../Validations/Validations";
import {
  useCreateCommunityMutation,
  useGetCommunityQuery,
} from "../../Services/api.service";
import { useNavigate } from "react-router-dom";
import Loader01 from "../../Components/Loaders/Loader01";
import Header from "../../Components/Header";
import { CloseIcon } from "@chakra-ui/icons";
import ToastBox from "../../Components/ToastBox";

const AddComunity = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const getCommunityQuery = useGetCommunityQuery();
  const [createCommunityData] = useCreateCommunityMutation(); // Invoke the hook to get the mutation function
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [imageData, setImageData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCommunitySchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("member_name", data.member_name);
      formData.append("designation", data.designation);
      formData.append("description", data.description);
      formData.append("linkedin", data.linkedin);
      if (data.profile_image[0]) {
        formData.append("profile_image", data.profile_image[0]);
      }
      // Trigger the mutation
      createCommunityData(formData)
        .then((response) => {
          // Handle the response here
          // // console.log("Mutation response:", response?.data?.statusCode);
          // // console.log("Mutation response:", response?.data?.message);

          if (response?.data?.statusCode === 200) {
            setIsLoading(false);
            toast({
              render: () => (
                <ToastBox status={"success"} message={response?.data?.message} />
              ),
            });
            reset();
            navigate("/community");
          }
        })
        .catch((error) => {
          // Handle errors
          // // console.error("Error creating community:", error);
          setIsLoading(false);
          // Handle error notification if needed
        });
    } catch (error) {
      // Handle errors
      // // console.error("Error creating community:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageData(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      {...OPACITY_ON_LOAD}
      w={"100%"}
      h={"100vh"}
      overflowY={"scroll"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Header title={"Community"} />

      <Box display={"flex"}>
        <Box className="col-5 d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            Members Info
          </span>
          <span className="web-text-medium text-secondary">
            Select the platform for which you need to create this campaign.
          </span>

          <Divider />

          <span className="web-text-large fw-bold rubix-text-dark">
            Display profile
          </span>
          <span className="web-text-medium text-secondary mb-4">
            Below is the profile that will be displayed on the community page.
          </span>

          <Box
            boxSize="sm"
            className="d-flex w-100 justify-content-center flex-column align-items-center gap-3"
          >
            <Image
              shadow={"md"}
              rounded={8}
              w={214}
              h={240}
              src={selectedImage}
              alt="Selected Image"
            />
            {selectedImage === fallbackImage || imageData === null ? (
              ""
            ) : (
              <Box w={"100%"} display={"flex"} justifyContent={'space-between'} >
                <Box display={"flex"} flexDirection={"column"}>
                  <span className="web-text-small">{imageData?.name}</span>
                  <span className="web-text-small text-secondary fst-italic">
                    {(imageData?.size / (1024 * 1024)).toFixed(2)} mb
                  </span>
                </Box>
                <Box onClick={()=> setSelectedImage(fallbackImage)}  className=" web-text-large link rounded-2 pointer p-1" as="span" >
                <CloseIcon className="web-text-small" /></Box>
              </Box>
            )}
          </Box>
        </Box>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-7 pt-4  overflow-auto p-4"
        >
          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Name
            </FormLabel>
            <Input
              {...register("member_name")}
              placeholder="Name"
              className="web-text-medium"
              size="sm"
              minLength={4}
                  errorBorderColor="crimson"
                  isInvalid={watch()?.member_name?.length > 50}
                  // maxLength={51}
                />
                <FormHelperText
                  color={watch()?.member_name?.length > 50 ? "red" : "gray.500"}
                  className="web-text-small"
                >
                  If name crosses 50 characters it will cause problem in
                  alignment on website.you have entered {watch()?.member_name?.length}{" "}
                  characters
                </FormHelperText>
            {errors.member_name && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.member_name.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Designation
            </FormLabel>
            <Input
              {...register("designation")}
              placeholder="Designation"
              className="web-text-medium"
              size="sm"
            />
            {errors.designation && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.designation.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Description
            </FormLabel>
            <Textarea
              {...register("description")}
              placeholder="Description"
              className="web-text-medium"
              size="sm"
              rows={2}
              minLength={4}
              errorBorderColor="crimson"
              isInvalid={watch()?.description?.length > 230}
              // maxLength={51}
            />
            <FormHelperText
              color={watch()?.description?.length > 230 ? "red" : "gray.500"}
              className="web-text-small"
            >
              If title crosses 230 characters it will cause problem in
              alignment on website.you have entered {watch()?.description?.length}{" "}
              characters
            </FormHelperText>
            {errors.description && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.description.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Linked In
            </FormLabel>
            <Input
              {...register("linkedin")}
              placeholder="Linkedin link"
              className="web-text-medium"
              size="sm"
            />
            <FormHelperText className="web-text-small">
              Please share proper linked in link here.
            </FormHelperText>
            {errors.linkedin && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.linkedin.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Display profile
            </FormLabel>
            {/* <ImageDropBox /> */}

            <Box
              borderColor="gray.300"
              borderStyle="dashed"
              borderWidth="2px"
              rounded="md"
              shadow="sm"
              role="group"
              transition="all 150ms ease-in-out"
              _hover={{
                shadow: "md",
              }}
              as={motion.div}
              initial="rest"
              animate="rest"
              whileHover="hover"
              height={"105px"}
              className="pointer"
            >
              <Box position="relative" height="100%" width="100%">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Stack
                    height="100%"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justify="center"
                  >
                    <span
                      className="d-flex flex-column align-items-center pointer"
                      spacing="1"
                    >
                      <Heading
                        fontSize="lg"
                        color="gray.700"
                        fontWeight="bold"
                        cursor={"pointer"}
                      >
                        Drop images here
                      </Heading>
                      <span
                        fontWeight="light"
                        className="web-text-large text-secondary text-center pointer"
                      >
                        or click to upload
                      </span>
                    </span>
                  </Stack>
                </Box>
                <Input
                  {...register("profile_image")}
                  type="file"
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity="0"
                  aria-hidden="true"
                  accept="image/*"
                  onChange={handleImageChange}
                  onDrop={handleImageChange}
                  //   onDragEnter={startAnimation}
                  //   onDragLeave={stopAnimation}
                />
              </Box>
            </Box>

            {errors.profile_image && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.profile_image.message}
              </span>
            )}
            <FormHelperText className="web-text-small">
              Maximum limit of image is 10MB.
            </FormHelperText>
          </FormControl>

          <Box className=" d-flex justify-content-end ">
            <Button
              isLoading={isLoading}
              spinner={<Loader01 />}
              color={"whitesmoke"}
              backgroundColor={"purple.900"}
              _hover={{
                backgroundColor: "purple.800",
              }}
              type="submit"
              size="sm"
              rounded={"sm"}
            >
              Create member
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddComunity;
