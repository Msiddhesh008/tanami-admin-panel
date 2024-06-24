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
  useGetPolicyByIdQuery,
  useUpdatePolicyMutation,
} from "../../Services/api.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TiWarning } from "react-icons/ti";
import { addPolicy } from "../../Validations/Validations";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { AttachmentIcon } from "@chakra-ui/icons";
import extractFilename from "../../Components/Functions/FileNameAlter";
import Loader01 from "../../Components/Loaders/Loader01";
import { motion } from "framer-motion";
import ToastBox from "../../Components/ToastBox";
import ReactQuill from "react-quill";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditPolicy = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPolicyByIdQuery(id);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [largeImageData, setLargeImageData] = useState(null);
  const [updatePolicy] = useUpdatePolicyMutation();
  const [valueQuill, setValueQuill] = useState(data?.data?.content);

  // console.log(valueQuill);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addPolicy),
    defaultValues: {
      title: "",
      content: "",
      banner_image: null,
    },
  });

  const policyContent = data?.data;
  // // console.log(termContent);

  useEffect(() => {
    if (data?.data) {
      setSelectedImage(
        `${API_URL}/${data?.data?.banner_image}`
      );
      setValue("title", data?.data?.title);
      setValue("content", data?.data?.content);
      setValue("banner_image", data?.data?.banner_image);
      setValueQuill(data?.data?.content);
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
    form.append("content", valueQuill);
    if (data?.banner_image[0]) {
      form.append("banner_image", data?.image[0]);
    }

    // Log formData entries
    for (let [key, value] of form.entries()) {
      // console.log(`${key}: ${value}`);
    }

    await updatePolicy({ id: id, data: form })
      .then((response) => {
        // // console.log(response?.error?.data?.error?.message);
        if (response?.data?.statusCode === 200) {
          setIsLoadingEdit(false);
          toast({
            render: () => (
              <ToastBox status={"success"} message={response?.data?.message} />
            ),
          });

          reset();
          navigate("/policy");
          // setDeleteAlert(false);
        } else {
          setIsLoadingEdit(false);
          toast({
            render: () => (
              <ToastBox status={"error"} message={"Something went wrong"} />
            ),
          });
        }
      })
      .catch((error) => {
        // console.error("Error creating community:", error);
        setIsLoadingEdit(false);
        // setDeleteIsLoading(false);
        // setDeleteAlert(false);
      });
  };

  // console.log(errors);
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
      <Header title={"Privacy & Policy"} />

      <Box display={"flex"}>
        <Box className="col-5 d-flex flex-column gap-2 pt-4">
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
            />
            {errors.title && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.title.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <ReactQuill
              className="rounded-3"
              theme="snow"
              value={valueQuill}
              onChange={setValueQuill}
            />
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

export default EditPolicy;
