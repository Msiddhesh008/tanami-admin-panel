import { OPACITY_ON_LOAD } from "../../Layout/animations";
import Header from "../../Components/Header";
import {
  AspectRatio,
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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addEvents } from "../../Validations/Validations";
import { TiWarning } from "react-icons/ti";
import Loader01 from "../../Components/Loaders/Loader01";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCreateEventsMutation } from "../../Services/api.service";
import ToastBox from "../../Components/ToastBox";

const AddEvents = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [createEvents] = useCreateEventsMutation(); // Invoke the hook to get the mutation function
  const [selectedImage, setSelectedImage] = useState(fallbackImage);
  const [largeImageData, setLargeImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [eventDatesInput, setEventsDatesInputs] = useState([]);


  // Function to handle adding new date inputs
  const addDateInput = () => {
    setEventsDatesInputs([...eventDatesInput, ""]);
  };

  // Function to handle the change in date inputs
  const handleDateChange = (index, event) => {
    const newDates = [...eventDatesInput];
    newDates[index] = event.target.value;
    setEventsDatesInputs(newDates);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEvents),
  });


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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("location", data.location);
    formData.append("organizer_name", data.organizer_name);
    formData.append("organizer_mobile_number", data.organizer_mobile_number);
    formData.append("organizer_email", data.organizer_email);

    if (eventDatesInput.length === 0 || eventDatesInput[0]==="") {
      setIsLoading(false);
      return toast({
        render: () => (
          <ToastBox status={"warn"} message={"Please add events date"} />
        ),
      });
    } else {
      eventDatesInput.forEach((date, index) => {
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
    const res = createEvents(formData)
      .then((response) => {
        // Handle the response here
        // // console.log("Mutation response:", response?.data?.statusCode);
        // // console.log("Mutation response:", response?.data?.message);

        if (response?.data?.statusCode === 201) {
          setIsLoading(false);
          toast({
            title: response?.data?.message,
            status: "success",
            isClosable: true,
          });
          reset();
          navigate("/events");
        } else if (response?.data?.statusCode === 500) {
          setIsLoading(false);
          toast({
            title: response?.data?.message,
            status: "error", // Change status to error
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        // Handle errors
        // // console.error("Error creating community:", error?.message);
        setIsLoading(false);
        // Handle error notification if needed
      });

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
      <Header title={"Events"} />


      {/* <Box width="100%" maxWidth="1200px" mx="auto" my={4}>
      <AspectRatio ratio={16 / 6}>
        <iframe
          title="naruto"
          src="https://rubix.betadelivery.com/events"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          allowFullScreen
        />
      </AspectRatio>
    </Box> */}

      <Box className="d-flex">
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"}>
            <Box className="col-5 d-flex flex-column gap-2 pt-4">
              <Box h={340} gap={4} display={'flex'} flexDirection={'column'}>
              <span className="web-text-large fw-bold rubix-text-dark">
                Banner info
              </span>
              <span className="web-text-medium text-secondary">
                Select the platform for which you need to create this campaign.
              </span>


              </Box>


              <Divider />

              <span className="web-text-large fw-bold rubix-text-dark">
                Banner image
              </span>
              <span className="web-text-medium text-secondary mb-4">
                Below is the profile that will be displayed on the community
                page.
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
                {selectedImage === fallbackImage || largeImageData === null ? (
                  ""
                ) : (
                  <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                    <span className="web-text-small">
                      {largeImageData?.name}
                    </span>
                    <span className="web-text-small text-secondary fst-italic">
                      {(largeImageData?.size / (1024 * 1024)).toFixed(2)} mb
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

            <Box className="col-7 pt-4 mb-3  overflow-auto p-4">
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
                {errors.name && (
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
                  placeholder="Location"
                  className="web-text-medium"
                  size="sm"
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

              <FormControl isRequired className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Organisation email
                </FormLabel>
                <Input
                  type="email"
                  {...register("organizer_email")}
                  placeholder="Organisation email"
                  className="web-text-medium"
                  size="sm"
                />
                {errors.organizer_email && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.organizer_email.message}
                  </span>
                )}
              </FormControl>

              <FormControl className="mb-3">
                <FormLabel className="web-text-large fw-bold rubix-text-dark">
                  Event dates
                </FormLabel>
                {eventDatesInput.map((date, index) => (
                  <Input
                    key={index}
                    type="date"
                    value={date}
                    onChange={(event) => handleDateChange(index, event)}
                    className="web-text-medium"
                    size="sm"
                  />
                ))}
                <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
                  <Button
                    size={"xs"}
                    rounded={"sm"}
                    type="button"
                    onClick={addDateInput}
                  >
                    Add Date
                  </Button>
                </Box>
                {/* <FormHelperText className="web-text-small">
                  {data?.data?.eventDates?.map(({ date }, index) => (
                    <span className="web-text-small me-2">
                      {formatDate(date)}
                    </span>
                  ))}
                </FormHelperText> */}
                {errors.eventDates && (
                  <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                    <TiWarning className="fw-bold fs-5 " />{" "}
                    {errors.eventDates.message}
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

              <Box className=" d-flex justify-content-end mb-5">
                <Button
                  isLoading={isLoading}
                  spinner={<Loader01 />}
                  color={"whitesmoke"}
                  backgroundColor={"purple.700"}
                  _hover={{
                    backgroundColor: "purple.800",
                  }}
                  rounded={"sm"}
                  type="submit"
                  size="sm"
                >
                  Create event
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddEvents;
