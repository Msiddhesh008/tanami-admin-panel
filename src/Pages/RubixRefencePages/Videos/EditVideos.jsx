import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Tag,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetVideosByIdQuery,
  useUpdateVideosMutation,
} from "../../Services/api.service";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import Header from "../../Components/Header";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { addVideos } from "../../Validations/Validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader01 from "../../Components/Loaders/Loader01";
import { motion } from "framer-motion";
import { TiWarning } from "react-icons/ti";
import ToastBox from "../../Components/ToastBox";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditVideos = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetVideosByIdQuery(id);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [largeImageData, setLargeImageData] = useState(null);
  const [updateVideos] = useUpdateVideosMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addVideos),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      embeddedCode: "",
      thumbnail: null,
    },
  });

  const formData = watch()

  useEffect(() => {
    if (data?.data?.data) {
      setSelectedImage(
        `${API_URL}/${data?.data?.data?.thumbnail}`
      );
      setValue("title", data?.data?.data?.title);
      setValue("description", data?.data?.data?.description);
      setValue("duration", data?.data?.data?.duration);
      setValue("embeddedCode", data?.data?.data?.embeddedCode);
      setValue("thumbnail", data?.data?.data?.thumbnail);
    }
  }, [data, setValue]);

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

  const onSubmit = async (data) => {
    setIsLoadingEdit(true);
    const form = new FormData();
    form.append("title", data?.title);
    form.append("description", data?.description);
    form.append("duration", data?.duration);
    form.append("embeddedCode", data?.embeddedCode);
    if (largeImageData !== null) {
      form.append("thumbnail", largeImageData);
    }
    await updateVideos({ id: id, data: form })
      .then((response) => {
        // Handle the response here
        // // console.log("Mutation response:", response?.data?.statusCode);
        // // console.log("Mutation response:", response?.data?.message);

        if (response?.data?.statusCode === 201) {
          setIsLoadingEdit(false);

          toast({
            render: () => (
              <ToastBox status={"success"} message={response?.data?.message} />
            ),
          });
          navigate("/videos");
          // setDeleteAlert(false);
        }
      })
      .catch((error) => {
        // console.error("Error creating community:", error);
        setIsLoadingEdit(false);
        // setDeleteIsLoading(false);
        // setDeleteAlert(false);
      });
    reset();
  };

  return isLoading ? (
    <FullscreenLoaders />
  ) : (
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      paddingBottom={50}
      height={"100vh"}
    >
      <Header title={"Videos"} />

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
              w={"100%"}
              h={240}
              src={selectedImage}
              alt="Selected Image"
            />
            {selectedImage === fallbackImage || largeImageData === null ? (
              ""
            ) : (
              <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                <span className="web-text-small">
                  {largeImageData && largeImageData?.name}
                </span>
                <span className="web-text-small text-secondary fst-italic">
                  {largeImageData &&
                    (largeImageData?.size / (1024 * 1024)).toFixed(2)}{" "}
                  mb
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
        </Box>

        <form
          className="col-7 pt-4 overflow-auto p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box className="web-text-large fw-bold mb-2 rubix-text-dark">
            Status
          </Box>
          {data?.data?.data?.status ? (
            <Tag
              position={"sticky"}
              right={10}
              size={"sm"}
              variant="solid"
              colorScheme="teal"
            >
              Active
            </Tag>
          ) : (
            <Tag
              position={"sticky"}
              right={10}
              size={"sm"}
              variant="solid"
              colorScheme="red"
            >
              Inactive
            </Tag>
          )}

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Title
            </FormLabel>
            <Input
              {...register("title")}
              placeholder="Name"
              className="web-text-medium"
              size="sm"
              name="title"
              type="text"
              id="title"
              errorBorderColor="crimson"
              isInvalid={formData?.title?.length > 50}
              // maxLength={51}
            />
            <FormHelperText
              color={formData?.title?.length > 50 ? "red" : "gray.500"}
              className="web-text-small"
            >
              If title crosses 50 characters it will cause problem in
              alignment on website.you have entered {formData?.title?.length}{" "}
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
              {...register("description")}
              placeholder="Name"
              className="web-text-medium"
              size="sm"
              name="description"
              type="text"
              id="description"
              errorBorderColor="crimson"
              isInvalid={formData?.description?.length > 230}
              // maxLength={51}
            />
            <FormHelperText
              color={formData?.description?.length > 230 ? "red" : "gray.500"}
              className="web-text-small"
            >
              If description crosses 230 characters it will cause problem in
              alignment on website.you have entered {formData?.description?.length}{" "}
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
              Duration
            </FormLabel>
            <Input
              {...register("duration")}
              placeholder="Content"
              className="web-text-medium"
              size="sm"
              maxLength={90}
            />
            <FormHelperText className="web-text-small">
              Please enter duration Hrs:Min:Sec format.
            </FormHelperText>

            {errors.duration && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.duration.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Embedded link
            </FormLabel>
            <Input
              {...register("embeddedCode")}
              placeholder="https://youtube.com/EUJB..."
              className="web-text-medium"
              size="sm"
              maxLength={90}
            />
            <FormHelperText className="web-text-small">
              Please enter the embedded youtube Url.
            </FormHelperText>

            {errors.embeddedCode && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.embeddedCode.message}
              </span>
            )}
          </FormControl>

          <FormControl className="mb-3">
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
                  {...register("thumbnail")}
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

            {errors.thumbnail && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.thumbnail.message}
              </span>
            )}
            <FormHelperText className="web-text-small">
              Maximum limit of image should be 1mb to protect website from slow
              loading.
            </FormHelperText>
          </FormControl>

          <Box className=" d-flex justify-content-end ">
            <Button
              isLoading={isLoadingEdit}
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
              Save edit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditVideos;
