import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCommunityBannerByIdQuery,
  useGetCommunityByIdQuery,
  useUpdateCommunityBannerMutation,
  useUpdateCommunityMutation,
} from "../../Services/api.service";
import { editCommunityBannerSchema, schemaEdit } from "../../Validations/Validations";
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
  Text,
} from "@chakra-ui/react";
import { TiWarning } from "react-icons/ti";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { motion } from "framer-motion";
import Loader01 from "../../Components/Loaders/Loader01";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import fallbackImage from "../../assets/ultp-fallback-img.webp";
import Header from "../../Components/Header";
import CommunityBannerCard from "../../Pages/Community/CommunityBannerCard";
import BannerMainCard from "./BannerMainCard";
import ToastBox from "../ToastBox";
import { IMAGE_URI } from "../../Constants/Paginations";

const BannerEdit = ({isLoading, data, updateBanner, navigateTo, refetch, center}) => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [largeImageData, setLargeImageData] = useState(null);
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(editCommunityBannerSchema),
    defaultValues: {
      heading: data?.data?.Heading,
      sub_heading: data?.data?.sub_heading,
      CTO_button_title: data?.data?.CTO_button_title,
      CTO_button_link: data?.data?.CTO_button_link,
    },
  });

  
  // Watch form values to update preview
  const formData = watch();
  
  

  useEffect(() => {
    if (data?.data) {
      setSelectedImage(
        `${IMAGE_URI}/${data?.data?.banner_image}`
      );
      setValue("heading", data?.data?.Heading);
      setValue("sub_heading", data?.data?.sub_heading);
      setValue("CTO_button_title", data?.data?.CTO_button_title);
      setValue("CTO_button_link", data?.data?.CTO_button_link);
      setValue("banner_image", data?.data?.banner_image);
      watch()
    }
  }, [data, setValue]);


  // useEffect(() => {
  //   const subscription = watch((value) => {setFormData(value)});
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const onSubmit = async (formData) => {
    setIsLoadingEdit(true);
    const form = new FormData();
    form.append("heading", formData.heading);
    form.append("sub_heading", formData.sub_heading);
    form.append("CTO_button_title", formData.CTO_button_title);
    form.append("CTO_button_link", formData.CTO_button_link);
    if (formData.banner_image[0]) {
      form.append("banner_image", formData.banner_image[0]);
    }
    if (formData?.banner_image === data?.data?.banner_image) {
      form.delete("banner_image");
    }
        // Log the FormData entries
        // for (const [key, value] of form.entries()) {
        //   // console.log(`${key}: ${value}`);
        // }
    const mutationResult = await updateBanner({ id: id, data: form })
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
          refetch()
          navigate(navigateTo);
          // setDeleteAlert(false);
        }
      })
      .catch((error) => {
        // // console.error("Error creating community:", error);
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
      w={"100%"}
      h={"100vh"}
      className="overflow-auto "
      display={"flex"}
      flexDirection={'column'}
    >
      
      <Header 
      title={"Banner's"} 
      />
      <Box display={'flex'}>
      <Box className="col-5 d-flex flex-column gap-2 pt-4">
        <span className="web-text-large fw-bold rubix-text-dark">
        Display Info
        </span>
        <span className="web-text-medium text-secondary">
          Select the platform for which you need to create this campaign.
        </span>

        <Divider />

        <span className="web-text-large fw-bold rubix-text-dark">
          Display banner
        </span>
        <span className="web-text-medium text-secondary mb-4">
          Below is the profile that will be displayed on the community page.
        </span>

  
        <Box boxSize="sm" 
          className="d-flex w-100 justify-content-center flex-column align-items-center gap-3">
            {/* <Image
              shadow={"md"}
              rounded={8}
              w={500}
              h={240}
              src={selectedImage}
              alt="Selected Image"
            /> */}


            <BannerMainCard
            imgLink={selectedImage}
            heading={formData?.heading}
            subHeading={formData?.sub_heading}
            buttonTitle={formData?.CTO_button_title}
            center={center}
            />



            {selectedImage === fallbackImage || largeImageData === null ? (
              ""
            ) : (
              <Box display={"flex"} flexDirection={"column"} w={"100%"}>
                <span className="web-text-small">{largeImageData?.name}</span>
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
        {data?.data?.status ? <Tag position={'sticky'} right={10} size={"sm"} variant="solid" colorScheme="teal">
          Active
        </Tag> : <Tag position={'sticky'} right={10} size={"sm"} variant="solid" colorScheme="red">
          Inactive
        </Tag>}

        <FormControl isRequired className="mb-3">
          <FormLabel className="web-text-large fw-bold rubix-text-dark">
            Heading
          </FormLabel>
          <Input
            {...register("heading")}
            placeholder="Heading"
            className="web-text-medium"
            size="sm"
            name="heading"
            type="text"
            id="heading"
            errorBorderColor="crimson"
            isInvalid={formData?.heading?.length > 50}
            // maxLength={51}
          />
          <FormHelperText
            color={
              formData?.heading?.length > 50
                ? "red"
                : "gray.500"
            }
            className="web-text-small"
          >
            If heading crosses 50 characters it will cause problem in alignment on website.you have entered {formData?.heading?.length} characters
          </FormHelperText>
          {errors.name && (
            <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
              <TiWarning className="fw-bold fs-5 " />{" "}
              {errors.heading.message}
            </span>
          )}
        </FormControl>

        <FormControl isRequired className="mb-3">
          <FormLabel className="web-text-large fw-bold rubix-text-dark">
            Sub heading
          </FormLabel>
          <Textarea
            {...register("sub_heading")}
            placeholder="Sub heading"
            className="web-text-medium"
            size="sm"
            id="sub_heading"
            name="sub_heading"
            errorBorderColor="crimson"
            isInvalid={formData?.sub_heading?.length > 230}
          />
          
          <FormHelperText
            color={
              formData?.sub_heading?.length > 230
                ? "red"
                : "gray.500"
            }
            className="web-text-small"
          >
            If sub heading crosses 230 characters it will cause problem in alignment on website.you have entered {formData?.sub_heading?.length} characters
          </FormHelperText>
          {errors.sub_heading && (
            <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
              <TiWarning className="fw-bold fs-5 " />{" "}
              {errors.sub_heading.message}
            </span>
          )}
        </FormControl>

        <FormControl isRequired className="mb-3">
          <FormLabel className="web-text-large fw-bold rubix-text-dark">
            CTO Button title
          </FormLabel>
          <Input
            {...register("CTO_button_title")}
            placeholder="Button title"
            className="web-text-medium"
            size="sm"
            maxLength={90}
            id="CTO_button_title"
            name="CTO_button_title"
            errorBorderColor="crimson"
            isInvalid={formData?.CTO_button_title?.length > 30}
          />
          <FormHelperText
            color={
              formData?.CTO_button_title?.length > 30
                ? "red"
                : "gray.500"
            }
            className="web-text-small"
          >
            If sub heading crosses 30 characters it will cause problem in alignment on website.you have entered {formData?.CTO_button_title?.length} characters
          </FormHelperText>

          {errors.CTO_button_title && (
            <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
              <TiWarning className="fw-bold fs-5 " />{" "}
              {errors.CTO_button_title.message}
            </span>
          )}
        </FormControl>

        <FormControl isRequired className="mb-3">
          <FormLabel className="web-text-large fw-bold rubix-text-dark">
          CTO Button link
          </FormLabel>
          <Input
            {...register("CTO_button_link")}
            placeholder="CTO_button_link link"
            className="web-text-medium"
            size="sm"
            id="CTO_button_link"
            name="CTO_button_link"
          />
          {errors.CTO_button_link && (
            <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
              <TiWarning className="fw-bold fs-5 " /> {errors.CTO_button_link.message}
            </span>
          )}
          <FormHelperText className="web-text-small">
            Please share proper linked in link here.
          </FormHelperText>
        </FormControl>

        <FormControl className="mb-3">
          <FormLabel className="web-text-large fw-bold rubix-text-dark">
            Display banner
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

        <Box className=" d-flex justify-content-end">
          <Button
            isLoading={isLoadingEdit}
            spinner={<Loader01 />}
            color={'whitesmoke'}
            backgroundColor={'purple.900'}
            _hover={{
              backgroundColor: "purple.800",
            }}
            type="submit"
            size="sm"
            rounded={'sm'}
          >
            Update banner
          </Button>
        </Box>
      </form>
      </Box>
    </Box>
  );
};

export default BannerEdit;
