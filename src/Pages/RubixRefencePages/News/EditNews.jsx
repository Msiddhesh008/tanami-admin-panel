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
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import Header from "../../Components/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
} from "../../Services/api.service";
import { addNews, editNews } from "../../Validations/Validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import { motion } from "framer-motion";
import Loader01 from "../../Components/Loaders/Loader01";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import { TiWarning } from "react-icons/ti";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import ToastBox from "../../Components/ToastBox";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditNews = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetNewsByIdQuery(id);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [largeImageData, setLargeImageData] = useState(null);
  const [updateNews] = useUpdateNewsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(editNews),
    defaultValues: {
      title: "",
      release_date: "",
      meta_description: "",
      content: "",
      banner_image: null,
    },
  });


  const formData = watch()


  useEffect(() => {
    if (data?.data) {
      setSelectedImage(
        `${API_URL}/${data?.data?.banner_image}`
      );
      setValue("title", data?.data?.title);
      setValue("meta_description", data?.data?.meta_description);
      setValue("release_date", data?.data?.release_date);
      setValue("content", data?.data?.content);
      setValue("banner_image", data?.data?.banner_image);
    }
  }, [data, setValue]);

  // console.log(errors);

  const onSubmit = async (data) => {
    setIsLoadingEdit(true);
    const form = new FormData();
    form.append("title", data?.title);
    form.append("meta_description", data?.meta_description);
    form.append("content", data?.content);
    form.append("release_date", data?.release_date);
    if (largeImageData !== null) {
      form.append("banner_image", largeImageData);
    }

    await updateNews({ id: id, data: form })
      .then((response) => {
        if (response?.data?.statusCode === 200) {
          setIsLoadingEdit(false);

          toast({
            render: () => (
              <ToastBox status={"success"} message={response?.data?.message} />
            ),
          });
          refetch();
          navigate("/news");
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

  return isLoading ? (
    <FullscreenLoaders />
  ) : (
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      paddingBottom={50}
      height={"100vh"}
    >
      <Header title={"News"} />

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
          {data?.data?.status ? (
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
              Meta description
            </FormLabel>
            <Textarea
              {...register("meta_description")}
              placeholder="Name"
              className="web-text-medium"
              size="sm"
              name="meta_description"
              type="text"
              id="meta_description"
              errorBorderColor="crimson"
              isInvalid={formData?.meta_description?.length > 160}
              // maxLength={51}
            />
            <FormHelperText
              color={formData?.meta_description?.length > 160 ? "red" : "green.500"}
              className="web-text-small"
            >
              If meta_description crosses 160 characters it will cause problem in
              alignment on website.you have entered {formData?.meta_description?.length}{" "}
              characters
            </FormHelperText>
            {errors.meta_description && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.meta_description.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Content
            </FormLabel>
            <Textarea
              {...register("content")}
              placeholder="Content"
              className="web-text-medium"
              size="sm"
              errorBorderColor="crimson"
              isInvalid={formData?.content?.length > 230}
              // maxLength={51}
            />
            <FormHelperText
              color={formData?.content?.length > 230 ? "red" : "gray.500"}
              className="web-text-small"
            >
              If content crosses 230 characters it will cause problem in
              alignment on website.you have entered {formData?.content?.length}{" "}
              characters
            </FormHelperText>

            {errors.content && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.content.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Release date
            </FormLabel>
            <Input
              type="date"
              {...register("release_date")}
              placeholder="Button link"
              className="web-text-medium"
              size="sm"
            />
            <FormHelperText className="web-text-small">
              {formatDate(data?.data?.release_date)}
            </FormHelperText>
            {errors.release_date && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.release_date.message}
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

            {errors.banner_image && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.banner_image.message}
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

export default EditNews;
