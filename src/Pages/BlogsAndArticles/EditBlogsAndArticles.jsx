import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Textarea,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../Services/api.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { addBlogSchema, editBlogSchema } from "../../Validations/Validations";
import fallbackImage from "../../assets/fallBackImage.png";
import fallbackImageLarge from "../../assets/ultp-fallback-img.webp";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { TiWarning } from "react-icons/ti";
import ReactQuill from "react-quill";
import ChipSelector from "../../Components/ChipSelector/ChipSelector";
import { motion } from "framer-motion";
import Loader01 from "../../Components/Loaders/Loader01";
import Header from "../../Components/Header";
import ToastBox from "../../Components/ToastBox";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditBlogsAndArticles = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [updateBlog] = useUpdateBlogMutation();
  const { data, error, isLoading, refetch } = useGetBlogByIdQuery(id);
  const blog = data?.data;
  const [isLoading01, setIsLoading01] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [selectedImageLarge, setSelectedImageLarge] =
    useState(fallbackImageLarge);
  const [largeImageData, setLargeImageData] = useState(null);
  const [smallImageData, setSmallImageData] = useState(null);
  const [chips, setChips] = useState();


  const [valueQuill, setValueQuill] = useState(blog?.content);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editBlogSchema),
    defaultValues: {
      author_name: "",
      author_designation: "",
      meta_description: "",
      title: "",
      category: "",
      summary: "",
      content: "",
      profile_image: "",
      content_image_large: "",
      tags: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      setSelectedImage(`${API_URL}/${blog?.profile_image}`);
      setSelectedImageLarge(
        `${API_URL}/${blog?.content_image_large}`
      );
      setValue("author_name", blog?.author_name);
      setValue("author_designation", blog?.author_designation);
      setValue("meta_description", blog?.meta_description);
      setValue("title", blog?.title);
      setValue("category", blog?.category?.blog_category);
      setValue("summary", blog?.summary);
      setValue("content", blog?.content);
      setValue("tags", blog?.tags);
      setValueQuill(blog?.content);
      setChips(blog?.tags?.map((tagObject) => tagObject.tag));
    }
  }, [data, blog, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("author_name", data.author_name);
    formData.append("author_designation", data.author_designation);
    formData.append("meta_description", data.meta_description);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("summary", data.summary);
    formData.append("content", valueQuill); // Add the content to formData
    if (data.profile_image[0]) {
      formData.append("profile_image", data.profile_image[0]);
    }
    if (data.content_image_large[0]) {
      formData.append("content_image_large", data.content_image_large[0]);
    }
    if (chips.length === 0) {
      return toast({
        title: "Please add tags",
        status: "error",
        isClosable: true,
      });
    } else {
      // formData.append("tags", chips);
      chips.forEach((tag, i) => {
        formData.append(`tags[${i}]`, tag); // Append each tag as an array element
      });
    }

    try {
      setIsLoading01(true);
      updateBlog({ id: id, data: formData })
        .then((response) => {
          // Handle the response here
          // // console.log("Mutation response:", response?.data?.statusCode);
          // // console.log("Mutation response:", response?.data?.message);
          if (response?.data?.statusCode === 201) {
            setIsLoading01(false);
            toast({
              render: () => (
                <ToastBox
                  status={"success"}
                  message={response?.data?.message}
                />
              ),
            });
            reset();
            refetch();
            navigate("/blogs-articles");
          } else if (response?.error?.status === 500) {
            setIsLoading01(false);
            toast({
              render: () => (
                <ToastBox
                  status={"success"}
                  message={response?.error?.status?.error?.message}
                />
              ),
            });
          } else {
            setIsLoading01(false);
            toast({
              render: () => (
                <ToastBox status={"error"} message={"File size too large"} />
              ),
            });
          }
        })
        .catch((error) => {
          // Handle errors
          // // console.error("Error creating community:", error);
          setIsLoading01(false);
          // Handle error notification if needed
        });
    } catch (error) {
      // Handle errors
      // // console.error("Error creating community:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSmallImageData(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChangeLarge = (e) => {
    const file = e.target.files[0];
    setLargeImageData(file);
    // console.log(largeImageData);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageLarge(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <FullscreenLoaders />;
  }
  return (
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      w={"100%"}
      h={"100vh"}
      className="overflow-auto "
      display={"flex"}
      flexDirection={"column"}
    >
      <Header title={"Blog"} />
      <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"}>
          <Box className="col-5 d-flex flex-column justify-content-between gap-2 pt-4">
            <Box flexDirection={"column"} display={"flex"}>
              <span className="web-text-large fw-bold rubix-text-dark">
                Blog Info
              </span>

              <span className="web-text-medium text-secondary">
                Select the platform for which you need to create this campaign.
              </span>
            </Box>

            <Box flexDirection={"column"} display={"flex"}>
              <Divider />

              <span className="web-text-large fw-bold rubix-text-dark">
                Blog's Banner image
              </span>
              <span className="web-text-medium text-secondary mb-4">
                Below is the profile that will be displayed on the community
                page.
              </span>

              <Box
                boxSize="sm"
                className="d-flex w-100 p-2 justify-content-center flex-column align-items-center gap-3"
              >
               
                    <Image
                      shadow={"md"}
                      rounded={8}
                      w={500}
                      h={240}
                      src={selectedImageLarge}
                      alt="Selected Image"
                    />
                    {selectedImageLarge === fallbackImageLarge ? (
                      ""
                    ) : (
                      largeImageData && <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                        <span className="web-text-small">
                          {largeImageData?.name}
                        </span>
                        <span className="web-text-small text-secondary fst-italic">
                          {(largeImageData?.size / (1024 * 1024)).toFixed(2)} mb
                        </span>
                      </Box>
                    )}

                <Button
                  onClick={() => setSelectedImageLarge(fallbackImageLarge)}
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
          </Box>

          <Box className="col-7 pt-4 p-4">
            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Blog title
              </FormLabel>
              <Input
                {...register("title")}
                placeholder="Blog title"
                className="web-text-medium"
                size="sm"
                maxLength={90}
              />
              <FormHelperText className="web-text-small">
                Maximum characters must be 100 characters.
              </FormHelperText>

              {errors.title && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " /> {errors.title.message}
                </span>
              )}
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Blog description
              </FormLabel>

              <Textarea
                rows={4}
                {...register("meta_description")}
                placeholder="Blog description"
                className="web-text-medium"
                size="sm"
              />
              <FormHelperText className="web-text-small">
                Please share proper linked in link here.
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
                Blog content
              </FormLabel>
              {/* <Textarea
                  rows={4}
                  {...register("content")}
                  placeholder="content link"
                  className="web-text-medium"
                  size="sm"
                /> */}
              <ReactQuill
                className="rounded-3"
                theme="snow"
                value={valueQuill}
                onChange={setValueQuill}
              />
              <FormHelperText className="web-text-small">
                Please share proper linked in link here.
              </FormHelperText>
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Blog summary
              </FormLabel>
              <Textarea
                rows={2}
                {...register("summary")}
                placeholder="Summary"
                className="web-text-medium"
                size="sm"
              />
              <FormHelperText className="web-text-small">
                Please share proper linked in link here.
              </FormHelperText>
              {errors.summary && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.summary.message}
                </span>
              )}
            </FormControl>

            <FormControl className="mb-3" isRequired >
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Tags
              </FormLabel>
              <ChipSelector chips={chips} setChips={setChips} />
              
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Category
              </FormLabel>
              <Input
                {...register("category")}
                placeholder="Category"
                className="web-text-medium"
                size="sm"
                maxLength={90}
              />
              <FormHelperText className="web-text-small">
                Maximum characters must be 100 characters.
              </FormHelperText>

              {errors.category && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.category.message}
                </span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Blog banner
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
                h={105}
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
                    {...register("content_image_large")}
                    type="file"
                    height="100%"
                    width="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    aria-hidden="true"
                    accept="image/*"
                    onChange={handleImageChangeLarge}
                    onDrop={handleImageChangeLarge}
                    //   onDragEnter={startAnimation}
                    //   onDragLeave={stopAnimation}
                  />
                </Box>
              </Box>

              {errors.content_image_large && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.content_image_large.message}
                </span>
              )}
              <FormHelperText className="web-text-small">
                Maximum limit of image is 10MB.
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>

        <Divider />

        <Box display={"flex"}>
          <Box className="col-5 d-flex flex-column gap-2 pt-4">
            {/* <span className="web-text-large fw-bold rubix-text-dark">
                Author's Info
              </span>
              <span className="web-text-medium text-secondary">
                Select the platform for which you need to create this campaign.
              </span>
  
              <Divider /> */}

            <span className="web-text-large fw-bold rubix-text-dark">
              Author's display profile
            </span>
            <span className="web-text-medium text-secondary mb-0">
              Below is the profile that will be displayed on the community page.
            </span>
            <Box
              boxSize="sm"
              className="d-flex flex-column align-items-center gap-3 justify-content-center"
            >
              <Image
                shadow={"md"}
                rounded={8}
                w={214}
                h={240}
                src={selectedImage}
                alt="Selected Image"
              />
              {selectedImage === fallbackImage ? (
                ""
              ) : (
                smallImageData && <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                  <span className="web-text-small">{smallImageData?.name}</span>
                  <span className="web-text-small text-secondary fst-italic">
                    {(smallImageData?.size / (1024 * 1024)).toFixed(2)} mb
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

          <Box className="col-7 pt-4 p-4">
            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Author name
              </FormLabel>
              <Input
                {...register("author_name")}
                placeholder="Name"
                className="web-text-medium"
                size="sm"
              />
              {errors.name && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.author_name.message}
                </span>
              )}
            </FormControl>

            <FormControl isRequired className="mb-3">
              <FormLabel className="web-text-large fw-bold rubix-text-dark">
                Author designation
              </FormLabel>
              <Input
                {...register("author_designation")}
                placeholder="Author designation"
                className="web-text-medium"
                size="sm"
              />
              {errors.author_designation && (
                <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                  <TiWarning className="fw-bold fs-5 " />{" "}
                  {errors.author_designation.message}
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
                height={105}
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

            <Box className=" d-flex justify-content-end">
              <Button
                isLoading={isLoading01}
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
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EditBlogsAndArticles;
