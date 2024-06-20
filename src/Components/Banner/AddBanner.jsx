import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Heading,
  Button,
  useToast,
  Divider,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import { TiWarning } from "react-icons/ti";

import { motion } from "framer-motion";
import { OPACITY_ON_LOAD } from "../../Layout/animations";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  addCommunityBannerSchema,
  addCommunitySchema,
} from "../../Validations/Validations";
import { useNavigate } from "react-router-dom";
import Loader01 from "../../Components/Loaders/Loader01";
import Header from "../Header";
import ToastBox from "../ToastBox";
import BannerMainCard from "./BannerMainCard";

const AddBanner = ({ createApi, navigateLink, title, center }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [largeImageData, setLargeImageData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCommunityBannerSchema),
  });

  const formData = watch();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("heading", data.heading);
      formData.append("sub_heading", data.sub_heading);
      formData.append("CTO_button_link", data.CTO_button_link);
      formData.append("CTO_button_title", data.CTO_button_title);
      if (selectedImage[0]) {
        formData.append("banner_image", data.banner_image[0]);
      }
      // Trigger the mutation
      createApi(formData)
        .then((response) => {
          // Handle the response here
          // // console.log("Mutation response:", response?.data?.statusCode);
          // // console.log("Mutation response:", response?.data?.message);

          if (response?.data?.statusCode === 200) {
            setIsLoading(false);
            toast({
              render: () => (
                <ToastBox
                  status={"success"}
                  message={response?.data?.message}
                />
              ),
            });
            reset();
            navigate(navigateLink);
          } else if (response?.data?.statusCode === 500) {
            setIsLoading(false);
            toast({
              render: () => (
                <ToastBox
                  status={"success"}
                  message={response?.data?.message}
                />
              ),
            });
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
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLargeImageData(file);
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
      className="overflow-auto "
      display={"flex"}
      flexDirection={"column"}
    >
      <Header title={title} />

      <Box display={"flex"}>
        <Box className="col-5 d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            Banner info
          </span>
          <span className="web-text-medium text-secondary">
            Select the platform for which you need to create this campaign.
          </span>

          <Divider />

          <span className="web-text-large fw-bold rubix-text-dark">
            Banner image
          </span>
          <span className="web-text-medium text-secondary mb-4">
            Below is the profile that will be displayed on the community page.
          </span>

          <Box
            boxSize="sm"
            className="d-flex w-100 justify-content-center flex-column align-items-center gap-3"
          >
            <>
              {/* <Image
                shadow={"md"}
                rounded={8}
                w={500}
                h={240}
                src={selectedImage}
                alt="Selected Image"
              /> */}

              <BannerMainCard
                imgLink={selectedImage}
                heading={formData?.heading}
                subHeading={formData?.sub_heading}
                buttonTitle={formData?.CTO_button_title}
                center={center}
              />

              {selectedImage === fallbackImage || largeImageData === null ? (
                ""
              ) : (
                <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                  <span className="web-text-small">{largeImageData?.name}</span>
                  <span className="web-text-small text-secondary fst-italic">
                    {(largeImageData?.size / (1024 * 1024)).toFixed(2)} mb
                  </span>
                </Box>
              )}
            </>
            <Button
              onClick={() => setSelectedImage(fallbackImage)}
              backgroundColor="red.400"
              color={"whitesmoke"}
              transition={"0.5s"}
              _hover={{
                backgroundColor: "red.500",
              }}
              size="xs"
            >
              Remove
            </Button>
          </Box>
        </Box>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-7 pt-4  overflow-auto p-4"
        >
          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Heading
            </FormLabel>
            <Input
              {...register("heading")}
              placeholder="Heading"
              className="web-text-medium"
              size="sm"
              errorBorderColor="crimson"
              isInvalid={formData?.heading?.length > 50}
              // maxLength={51}
            />
            <FormHelperText
              color={formData?.heading?.length > 50 ? "red" : "gray.500"}
              className="web-text-small"
            >
              If heading crosses 50 characters it will cause problem in
              alignment on website.you have entered {formData?.heading?.length}{" "}
              characters
            </FormHelperText>
            {errors.name && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.heading.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Sub heading
            </FormLabel>
            <Textarea
              {...register("sub_heading")}
              placeholder="Sub heading"
              className="web-text-medium"
              size="sm"
              errorBorderColor="crimson"
              isInvalid={formData?.sub_heading?.length > 230}
            />

            <FormHelperText
              color={formData?.sub_heading?.length > 230 ? "red" : "gray.500"}
              className="web-text-small"
            >
              If sub heading crosses 230 characters it will cause problem in
              alignment on website.you have entered{" "}
              {formData?.sub_heading?.length} characters
            </FormHelperText>
            {errors.sub_heading && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.sub_heading.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Button title
            </FormLabel>
            <Input
              {...register("CTO_button_title")}
              placeholder="Button title"
              className="web-text-medium"
              size="sm"
              errorBorderColor="crimson"
              isInvalid={formData?.CTO_button_title?.length > 30}
            />
            <FormHelperText
              color={
                formData?.CTO_button_title?.length > 30 ? "red" : "gray.500"
              }
              className="web-text-small"
            >
              If Button title crosses 50 characters it will cause problem in
              alignment on website.you have entered{" "}
              {formData?.CTO_button_title?.length} characters
            </FormHelperText>

            {errors.CTO_button_title && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.CTO_button_title.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Button link
            </FormLabel>
            <Input
              {...register("CTO_button_link")}
              placeholder="Button link"
              className="web-text-medium"
              size="sm"
            />
            <FormHelperText className="web-text-small">
              Please share proper linked in link here.
            </FormHelperText>
            {errors.CTO_button_link && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.CTO_button_link.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Banner image
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
                  {...register("banner_image")}
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

            {errors.banner_image && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.banner_image.message}
              </span>
            )}
            <FormHelperText className="web-text-small">
              Maximum limit of image is 10MB.
            </FormHelperText>
          </FormControl>

          <Box className=" d-flex justify-content-end mb-0">
            <Button
              isLoading={isLoading}
              spinner={<Loader01 />}
              color={"whitesmoke"}
              backgroundColor={"purple.900"}
              _hover={{
                backgroundColor: "purple.800",
              }}
              type="submit"
              rounded={"sm"}
              size="sm"
            >
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddBanner;
