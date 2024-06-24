import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCommunityByIdQuery,
  useUpdateCommunityMutation,
} from "../../Services/api.service";
import { addCommunitySchema, schemaEdit } from "../../Validations/Validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Textarea,
  Button,
  Skeleton,
  useToast,
  Switch,
  Tag,
} from "@chakra-ui/react";
import { TiWarning } from "react-icons/ti";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { motion } from "framer-motion";
import Loader01 from "../../Components/Loaders/Loader01";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import fallbackImage from "../../assets/fallBackImage.png";
import Header from "../../Components/Header";
import ToastBox from "../../Components/ToastBox";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ComunityEditPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCommunityByIdQuery(id);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [updateCommunity] = useUpdateCommunityMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addCommunitySchema),
    defaultValues: {
      member_name: "",
      designation: "",
      description: "",
      linkedin: "",
      profile_image: null,
    },
  });

  useEffect(() => {
    if (data?.data) {
      setSelectedImage(
        `${API_URL}/${data?.data?.profile_image}`
      );
      setValue("member_name", data?.data?.member_name);
      setValue("designation", data?.data?.designation);
      setValue("description", data?.data?.description);
      setValue("linkedin", data?.data?.linkedin);
      setValue("profile_image", data?.data?.profile_image);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    setIsLoadingEdit(true);
    const form = new FormData();
    form.append("member_name", formData.member_name);
    form.append("designation", formData.designation);
    form.append("description", formData.description);
    form.append("linkedin", formData.linkedin);
    if (formData.profile_image[0]) {
      form.append("profile_image", formData.profile_image[0]);
    }
    if (formData?.profile_image === data?.data?.profile_image) {
      form.delete("profile_image");
    }
    await updateCommunity({ id: id, data: form })
      .then((response) => {
        // Handle the response here
        // // console.log("Mutation response:", response?.data?.statusCode);
        // // console.log("Mutation response:", response?.data?.message);

        if (response?.data?.statusCode === 200) {
          setIsLoadingEdit(false);

          toast({
            render: () => (
              <ToastBox status={"success"} message={response?.data?.message} />
            ),
          });
          navigate("/community");
          // setDeleteAlert(false);
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
        // // console.error("Error creating community:", error);
        setIsLoadingEdit(false);
        // setDeleteIsLoading(false);
        // setDeleteAlert(false);
      });

    // Log the FormData entries
    // for (const [key, value] of form.entries()) {
    //   // console.log(`${key}: ${value}`);
    // }

    reset();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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
          {/* <Switch
          size={"sm"}
          colorScheme="teal"
          onChange={() => handleUpdateStatus(item.id)}
          isChecked={data?.data?.status}
        /> */}
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
              Name
            </FormLabel>
            <Input
              {...register("member_name")}
              placeholder="Name"
              className="web-text-medium"
              size="sm"
              name="member_name"
              type="text"
              id="member_name"
              minLength={4}
              errorBorderColor="crimson"
              isInvalid={watch()?.member_name?.length > 50}
              // maxLength={51}
            />
            <FormHelperText
              color={watch()?.member_name?.length > 50 ? "red" : "gray.500"}
              className="web-text-small"
            >
              If name crosses 50 characters it will cause problem in alignment
              on website.you have entered {watch()?.member_name?.length}{" "}
              characters
            </FormHelperText>
            {errors.name && (
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
              id="designation"
              name="designation"
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
                  If Description crosses 230 characters it will cause problem in
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
              id="linkedin"
              name="linkedin"
            />
            {errors.linkedin && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.linkedin.message}
              </span>
            )}
            <FormHelperText className="web-text-small">
              Please share proper linked in link here.
            </FormHelperText>
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

export default ComunityEditPage;
