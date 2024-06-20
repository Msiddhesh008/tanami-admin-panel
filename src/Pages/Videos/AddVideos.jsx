import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, Heading, Image, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import Header from "../../Components/Header";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNews, addVideos } from "../../Validations/Validations";
import { TiWarning } from "react-icons/ti";
import { motion } from "framer-motion";
import Loader01 from "../../Components/Loaders/Loader01";
import { useCreateVideosMutation } from "../../Services/api.service";
import ToastBox from "../../Components/ToastBox";

const AddVideos = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [createVideos] = useCreateVideosMutation();
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
    resolver: yupResolver(addVideos),
  });
  
  const formData = watch();


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


  
  const onSubmit = async (data) => {
    // const date = new Date(data?.release_date).toUTCString();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("duration", data.duration);
      formData.append("embeddedCode", data.embeddedCode);
      if (data.thumbnail[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      for (const [key, value] of formData.entries()) {
        // console.log(`${key}: ${value}`);
      }
      // Trigger the mutation
      createVideos(formData)
        .then((response) => {
          if (response?.data?.statusCode === 201) {
            setIsLoading(false);
            toast({
              render: () => (
                <ToastBox status={"success"} message={response?.data?.message} />
              ),
            });
            reset();
            navigate("/videos");
          } else if (response?.data?.statusCode === 500) {
            setIsLoading(false);
            toast({
              render: () => (
                <ToastBox status={"success"} message={response?.data?.message} />
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
    // console.log(data);
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
      <Header title={"Videos"} />

      <Box className="d-flex">
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
              placeholder="Description"
              className="web-text-medium"
              size="sm"
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
                <TiWarning className="fw-bold fs-5 " /> {errors.description.message}
              </span>
            )}
          </FormControl>

          
          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Duration
            </FormLabel>
            <Input
              {...register("duration")}
              placeholder="Duration"
              className="web-text-medium"
              size="sm"
              type="text"
            />
            <FormHelperText className="web-text-small">
              Please enter duration Hrs:Min:Sec format.
            </FormHelperText>
            {errors.duration && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.duration.message}
              </span>
            )}
          </FormControl>

          
          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Video link
            </FormLabel>
            <Input
              {...register("embeddedCode")}
              placeholder="https://www.youtube.com/embed/..."
              className="web-text-medium"
              size="sm"
              maxLength={90}
            />
            <FormHelperText className="web-text-small">
            Please enter the embedded youtube Url.
            </FormHelperText>
            {errors.embeddedCode && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " /> {errors.embeddedCode.message}
              </span>
            )}
          </FormControl>

          

          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Thumbnail image
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

          
          <Box className=" d-flex justify-content-end mb-5">
            <Button
              isLoading={isLoading}
              spinner={<Loader01 />}
              color={"whitesmoke"}
              backgroundColor={"purple.900"}
              _hover={{
                backgroundColor: "purple.800",
              }}
              rounded={'sm'}
              type="submit"
              size="sm"
            >
              Create video
            </Button>
          </Box>

          </form>
      </Box>
    </Box>
  );
};

export default AddVideos;
