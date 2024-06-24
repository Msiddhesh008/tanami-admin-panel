import React, { useEffect, useState } from "react";
import {
  useGetEventsByIdQuery,
  useUpdateEventsMutation,
} from "../../Services/api.service";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import { useNavigate, useParams } from "react-router-dom";
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
import { addEvents } from "../../Validations/Validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import Header from "../../Components/Header";
import { TiWarning } from "react-icons/ti";
import { motion } from "framer-motion";
import Loader01 from "../../Components/Loaders/Loader01";
import ToastBox from "../../Components/ToastBox";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import ChipSelector from "../../Components/ChipSelector/ChipSelector";

const convertToDateArray = (dateArray) => {
  return dateArray?.map((dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
};

const EditEvents = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetEventsByIdQuery(id);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [largeImageData, setLargeImageData] = useState(null);
  const [updateEvents] = useUpdateEventsMutation();
  const [eventsDate, setEventsDate] = useState(
    convertToDateArray(data?.data?.eventDates.map((event) => event.date))
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addEvents),
    defaultValues: {
      title: "",
      content: "",
      location: "",
      organizer_name: "",
      organizer_mobile_number: "",
      // eventDates: eventsDate,
      organizer_email: "",
      banner_image: null,
    },
  });

  useEffect(() => {
    if (data?.data) {
      setSelectedImage(
        `${API_URL}/${data?.data?.banner_image}`
      );
      setValue("title", data?.data?.title);
      setValue("content", data?.data?.content);
      setValue("location", data?.data?.location);
      setValue("organizer_name", data?.data?.organizer_name);
      setValue("organizer_mobile_number", data?.data?.organizer_mobile_number);
      setValue("organizer_email", data?.data?.organizer_email);
      setValue("content", data?.data?.content);
      // setValue("eventDates", data?.data?.eventDates);
      setValue("banner_image", data?.data?.banner_image);

      // setValue("eventDates", eventsDate);
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


  const onSubmit = (data) => {
    setIsLoadingEdit(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("location", data.location);
    formData.append("organizer_name", data.organizer_name);
    formData.append("organizer_mobile_number", data.organizer_mobile_number);
    formData.append("organizer_email", data.organizer_email);


    if (eventsDate.length === 0) {
      setIsLoadingEdit(false);
      return toast({
        render: () => (
          <ToastBox status={"warn"} message={"Please add events date"} />
        ),
      })
    }else{
        eventsDate.forEach((date, index) => {
          formData.append(`dates[${index}]`, date);
        });
      }


  

    




    if (data.banner_image[0]) {
      formData.append("banner_image", data.banner_image[0]);
    }

    // for (const [key, value] of formData.entries()) {
    //   // console.log(`${key}: ${value}`);
    // }

    // Trigger the mutationconst
    const res = updateEvents({ id: id, data: formData })
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
          reset();
          navigate("/events");
        } else if (response?.data?.statusCode === 500) {
          setIsLoadingEdit(false);
          toast({
            render: () => (
              <ToastBox status={"error"} message={response?.data?.message} />
            ),
          });
        }
      })
      .catch((error) => {
        // Handle errors
        // // console.error("Error creating community:", error?.message);
        setIsLoadingEdit(false);
        // Handle error notification if needed
      });
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
      <Header title={"Events"} />

      <Box display={"flex"}>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"}>
            <Box className="col-5 d-flex flex-column gap-2 pt-4">
              <span className="web-text-large fw-bold rubix-text-dark">
                Events Info
              </span>
              <span className="web-text-medium text-secondary">
                Select the platform for which you need to create this campaign.
              </span>

              <Divider />

              <span className="web-text-large fw-bold rubix-text-dark">
                Display image
              </span>
              <span className="web-text-medium text-secondary mb-4">
                Below is the profile that will be displayed on the events page.
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

            <Box
              className="col-7 pt-4 overflow-auto p-4"
              //   onSubmit={handleSubmit(onSubmit)}
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
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.title.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Location
                </FormLabel>
                <Input
                  {...register("location")}
                  placeholder="Name"
                  className="web-text-medium"
                  size="sm"
                  name="location"
                  type="text"
                  id="location"
                />
                {errors.location && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.location.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Content
                </FormLabel>
                <Textarea
                  {...register("content")}
                  placeholder="Name"
                  className="web-text-medium"
                  size="sm"
                  name="content"
                  type="text"
                  id="content"
                  errorBorderColor="crimson"
                  isInvalid={watch()?.content?.length > 230}
                  // maxLength={51}
                />
                <FormHelperText
                  color={watch()?.content?.length > 230 ? "red" : "gray.500"}
                  className="web-text-small"
                >
                  If content crosses 230 characters it will cause problem in
                  alignment on website.you have entered{" "}
                  {watch()?.content?.length} characters
                </FormHelperText>
                {errors.content && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.content.message}
                  </span>
                )}
              </FormControl>

              <FormControl className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Event dates
                </FormLabel>
                <ChipSelector
                  type={"date"}
                  chips={eventsDate}
                  setChips={setEventsDate}
                />
                {errors.eventDates && (
                  <span className="text-warning web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.eventDates.message}
                  </span>
                )}
              </FormControl>

              <FormControl className="mb-3">
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
                  Maximum limit of image should be 1mb to protect website from
                  slow loading.
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
          <Divider />

          <Box display={"flex"}>
            <Box className="col-5 d-flex flex-column gap-2 pt-4">
              <span className="web-text-large fw-bold rubix-text-dark">
                Orgainsation info
              </span>
              <span className="web-text-medium text-secondary mb-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                dicta exercitationem laboriosam fugit vel ipsam hic, consectetur
                eum nesciunt adipisci?
              </span>
            </Box>

            <Box className="col-7 pt-4 p-4">
              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Organisation name
                </FormLabel>
                <Input
                  {...register("organizer_name")}
                  placeholder="Name"
                  className="web-text-medium"
                  size="sm"
                  name="organizer_name"
                  type="text"
                  id="organizer_name"
                  errorBorderColor="crimson"
                  isInvalid={watch()?.organizer_name?.length > 50}
                  // maxLength={51}
                />
                <FormHelperText
                  color={
                    watch()?.organizer_name?.length > 50 ? "red" : "gray.500"
                  }
                  className="web-text-small"
                >
                  If Organisation name crosses 50 characters it will cause
                  problem in alignment on website.you have entered{" "}
                  {watch()?.organizer_name?.length} characters
                </FormHelperText>
                {errors.organizer_name && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.organizer_name.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Organisation number
                </FormLabel>
                <Input
                  {...register("organizer_mobile_number")}
                  placeholder="Name"
                  className="web-text-medium"
                  size="sm"
                  name="organizer_mobile_number"
                  type="text"
                  id="organizer_mobile_number"
                />
                {errors.organizer_mobile_number && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.organizer_mobile_number.message}
                  </span>
                )}
              </FormControl>

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Organisation email
                </FormLabel>
                <Input
                  {...register("organizer_email")}
                  placeholder="Name"
                  className="web-text-medium"
                  size="sm"
                  name="organizer_email"
                  type="text"
                  id="organizer_email"
                />
                <FormHelperText className="web-text-small">
                  Please enter valid email
                </FormHelperText>
                {errors.organizer_email && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.organizer_email.message}
                  </span>
                )}
              </FormControl>

              <Box className=" d-flex justify-content-end">
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
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditEvents;
