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
  Kbd,
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
  addNews,
  addUsecase,
} from "../../Validations/Validations";
import {
  useCreateCommunityBannerMutation,
  useCreateCommunityMutation,
  useCreateNewsMutation,
  useCreateUsecaseMutation,
  useGetCommunityQuery,
} from "../../Services/api.service";
import { useNavigate } from "react-router-dom";
import Loader01 from "../../Components/Loaders/Loader01";
import Header from "../../Components/Header";
import ReactQuill from "react-quill";
import ToastBox from "../../Components/ToastBox";

const AddUseCase = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [createUsecase] = useCreateUsecaseMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [selectedIcon, setSelectedIcon] = useState(fallbackImage);
  const [imageData, setImageData] = useState(null);
  const [chips, setChips] = useState([]);
  const [value, setValue] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconData, setIconData] = useState(null);
  const [metaDescription, setMetaDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setMetaDescription(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue: setUseCaseValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addUsecase),
  });


  // console.log(errors);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setUseCaseValue("content", value);
    // console.log(data);
    // console.log(data);

    const formData = new FormData();

    // Append simple fields
    formData.append("title", data.title);
    formData.append("meta_description", data.meta_description);
    formData.append("content", data.content);

    if (data.banner_image && data.banner_image.length > 0) {
      formData.append("banner_image", data.banner_image[0]);
    }
    
    if (data.icon && data.icon.length > 0) {
      formData.append("icon", data.icon[0]);
    }

    // console.log(data.attachment);




      // Log and append file attachments
  if (data.attachment && data.attachment.length > 0) {
    Array.from(data.attachment).forEach((file, index) => {
      formData.append("attachment", file);
    });
  }


    // Log formData entries
    // for (let [key, value] of formData.entries()) {
    //   // console.log(`${key}: ${value}`);
    // }

    try {
      // Trigger the mutation
      createUsecase(formData)
        .then((response) => {
          // Handle the response here
          // console.log("Mutation response:", response);
          // console.log("Mutation response:", response?.data?.message);

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
            setIsLoading(false)
            navigate("/usecase");
          } else if(response?.error?.status === 500){
            // console.log(response?.error?.data?.error?.message);
            setIsLoading(false);
            toast({
              render: () => (
                <ToastBox
                  status={"error"}
                  message={response?.error?.data?.error?.message}
                />
              ),
            });

          }
        })
        .catch((error) => {
          // Handle errors
          // console.error("Error creating community:", error);
          setIsLoading(false);
          // Handle error notification if needed
        });
    } catch (error) {
      // Handle errors
      // console.error("Error creating community:", error);
      setIsLoading(false);
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

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIconData(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedIcon(reader.result);
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
      <Header title={"Usecase"} />

      <Box className="d-flex">
        <Box className="col-5 d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            Usecase Image
          </span>
          <span className="web-text-medium text-secondary mb-">
            Below is the profile that will be displayed on the community page.
          </span>

          <Box className="d-flex w-100 justify-content-center flex-column align-items-center gap-3 pt-4 pb-4">
            <Image
              shadow={"md"}
              rounded={8}
              w={500}
              h={240}
              src={selectedImage}
              alt="Selected Image"
            />
            {selectedImage === fallbackImage || imageData === null ? (
              ""
            ) : (
              <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                <span className="web-text-small">{imageData?.name}</span>
                <span className="web-text-small text-secondary fst-italic">
                  {(imageData?.size / (1024 * 1024)).toFixed(2)} mb
                </span>
              </Box>
            )}
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

          <Divider mt={-2} />

          <Box className="d-flex w-100 justify-content-start flex-column align-items-center gap-3 ">
            <Image
              shadow={"md"}
              rounded={"full"}
              objectFit={"cover"}
              w={40}
              h={40}
              src={selectedIcon}
              alt="Selected Image"
            />
            {selectedIcon === fallbackImage || iconData === null ? (
              ""
            ) : (
              <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                <span className="web-text-small">{iconData?.name}</span>
                <span className="web-text-small text-secondary fst-italic">
                  {(iconData?.size / (1024 * 1024)).toFixed(2)} mb
                </span>
              </Box>
            )}
            <Button
              onClick={() => setSelectedIcon(fallbackImage)}
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
          className="col-7 pt-4 mb-3  overflow-auto p-4"
        >
          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Title
            </FormLabel>
            <Input
              {...register("title")}
              placeholder="Title"
              className="web-text-medium"
              size="sm"
              minLength={4}
                  errorBorderColor="crimson"
                  isInvalid={watch()?.title?.length > 50}
                  // maxLength={51}
                />
                <FormHelperText
                  color={watch()?.title?.length > 50 ? "red" : "gray.500"}
                  className="web-text-small"
                >
                  If name crosses 50 characters it will cause problem in
                  alignment on website.you have entered {watch()?.title?.length}{" "}
                  characters
                </FormHelperText>
            {errors.title && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.title.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Description
            </FormLabel>
            <Textarea
              {...register("meta_description")}
              onChange={handleDescriptionChange}
              placeholder="Description"
              className="web-text-medium"
              errorBorderColor="crimson"
              isInvalid={metaDescription.length > 160}
              size="sm"
            />

            <FormHelperText
              color={
                metaDescription.length > 160
                  ? "red"
                  : "green.400"
              }

              
              fontWeight={""
              }
              className="web-text-small"
            >
              If description crosses 160 characters it will cause problem in SEO
              optimisation.you have entered {metaDescription.length} characters
            </FormHelperText>

            {errors.meta_description && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.meta_description.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-5">
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

          <Divider mt={2} />

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Icon image
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
                  {...register("icon")}
                  type="file"
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity="0"
                  aria-hidden="true"
                  accept="image/*"
                  onChange={handleIconChange}
                  onDrop={handleIconChange}
                  //   onDragEnter={startAnimation}
                  //   onDragLeave={stopAnimation}
                />
              </Box>
            </Box>

            {errors.icon && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.icon.message}
              </span>
            )}
            <FormHelperText className="web-text-small">
              Maximum limit of image is 10MB.
            </FormHelperText>
          </FormControl>

          <FormControl isRequired className="mb-3 mt-5">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Content
            </FormLabel>
            <ReactQuill
              className="rounded-3"
              theme="snow"
              value={value}
              onChange={setValue}
            />
            <FormHelperText className="web-text-small">
              Please share proper linked in link here.
            </FormHelperText>
          </FormControl>

          <FormControl className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Document
            </FormLabel>
            <input
              accept=".pdf"
              type="file"
              {...register("attachment")}
              className="web-text-medium form-control rounded-1"
              size="sm"
              multiple={true}
              // onChange={(e)=> // console.log(e.target.value)}
            />
            <FormHelperText className="web-text-small">
            You can select multiple documents using <span className="text-dark">
  <Kbd size={'sm'} className="text-dark">ctrl</Kbd> + <Kbd className="text-dark">select</Kbd>
</span>.
            </FormHelperText>
            {errors.attachment && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.attachment.message}
              </span>
            )}
          </FormControl>

          <Box className=" d-flex justify-content-end mb-5">
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
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddUseCase;
