import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
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
  Text,
  useToast,
} from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetNewsByIdQuery,
  useGetWhitepaperByIdQuery,
  useUpdateWhitepaperMutation,
} from "../../Services/api.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TiWarning } from "react-icons/ti";
import { addWhitePapers } from "../../Validations/Validations";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { AttachmentIcon } from "@chakra-ui/icons";
import extractFilename from "../../Components/Functions/FileNameAlter";
import Loader01 from "../../Components/Loaders/Loader01";
import { motion } from "framer-motion";
import ToastBox from "../../Components/ToastBox";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditWhitepaper = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetWhitepaperByIdQuery(id);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [largeImageData, setLargeImageData] = useState(null);
  const [updateWhitepaper] = useUpdateWhitepaperMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addWhitePapers),
    defaultValues: {
      title: "",
      image: null,
    },
  });

  useEffect(() => {
    if (data?.data?.data) {
      setSelectedImage(
        `${API_URL}/${data?.data?.data?.bannerImage}`
      );
      setValue("title", data?.data?.data?.title);
      setValue("image", data?.data?.data?.image);
      setValue("bannerImage", data?.data?.data?.bannerImage);
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
    // console.log(data);
    setIsLoadingEdit(true);
    const form = new FormData();
    form.append("title", data?.title);
    if (data.document[0]) {
      form.append("document", data.document[0]);
    }
    if (data?.image[0]) {
      form.append("image", data?.image[0]);
    }
// Log formData entries
for (let [key, value] of form.entries()) {
  // console.log(`${key}: ${value}`);
}

    await updateWhitepaper({ id: id, data: form })
      .then((response) => {
        if (response?.data?.statusCode === 201) {
          setIsLoadingEdit(false);
          toast({
            render: () => (
              <ToastBox status={"success"} message={response?.data?.message} />
            ),
          });
          navigate("/whitepaper");
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

  if (isLoading) {
    return <FullscreenLoaders />;
  }
  return (
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      paddingBottom={50}
      height={"100vh"}
    >
      <Header title={"Whitepaper"} />

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
          <span className="web-text-medium text-secondary ">
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

          <Divider />
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
                  errorBorderColor="crimson"
                  isInvalid={watch()?.title?.length > 50}
                  // maxLength={51}
                />
                <FormHelperText
                  color={watch()?.title?.length > 50 ? "red" : "gray.500"}
                  className="web-text-small"
                >
                  If title crosses 50 characters it will cause problem in
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
              Document
            </FormLabel>
            <input
              type="file"
              {...register("document")}
              className="web-text-medium form-control rounded-1"
              size="sm"
            />
            {errors.document && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.document.message}
              </span>
            )}
            <Text
              color="teal"
              className="web-text-medium d-flex mt-2 align-items-center gap-2"
            >
              {extractFilename(data?.data?.data?.document)}
              <Box className="link pointer" as="span" rounded={"md"} p={1}>
                <AttachmentIcon />
              </Box>
            </Text>
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
                  {...register("image")}
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

            {errors.image && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.image.message}
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
          <Divider />
        </form>
      </Box>
    </Box>
  );
};

export default EditWhitepaper;
