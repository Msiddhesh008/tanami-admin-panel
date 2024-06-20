import React from "react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { Box, Divider, Image, Tag, Text, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { useGetPolicyByIdQuery } from "../../Services/api.service";
import { AttachmentIcon } from "@chakra-ui/icons";
import extractFilename from "../../Components/Functions/FileNameAlter";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import pdf from "../../assets/pdfscreen.png";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ViewPolicy = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPolicyByIdQuery(id);
  const viewPolicy = data?.data;

  // console.log(viewPolicy?.banner_image);
  // console.log(`https://rubix.betadelivery.com/${viewPolicy?.banner_image}`);

  if (isLoading) {
    return <FullscreenLoaders />;
  }

  return (
    <Box
      {...OPACITY_ON_LOAD}
      w={"100%"}
      h={"100vh"}
      className="overflow-auto "
      display={"flex"}
      flexDirection={"column"}
    >
      <Header
        title={"Privacy Policy"}
        btnTitle={"Edit Privacy Policy"}
        link={`/policy/edit/${id}`}
      />

      <Box display={"flex"}>
        <Box className="col-5  d-flex flex-column gap-2 pt-4">
          <Box
            boxSize="sm"
            className="d-flex h-auto  w-100 justify-content-start flex-column align-items-center gap-3"
          >
            <Image
              shadow={"md"}
              rounded={8}
              objectFit="cover"
              w={500}
              h={240}
              src={`${API_URL}/${viewPolicy?.banner_image}`}
              alt="Selected Image"
            />
          </Box>
        </Box>

        <Box className="col-7 pt-4  p-4">
          <Box>
            <Box className="web-text-large fw-bold mb-1 rubix-text-dark">
              Status
            </Box>
            {viewPolicy?.status ? (
              <Tag size={"sm"} borderRadius="full" colorScheme="teal">
                Active
              </Tag>
            ) : (
              <Tag size={"sm"} borderRadius="full" colorScheme="red">
                Inactive
              </Tag>
            )}
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">Title</Box>
            <Box className="web-text-medium text-secondary">
              {viewPolicy?.title}
            </Box>
          </Box>
          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Content
            </Box>
            <Box className="web-text-medium text-secondary">
              {viewPolicy?.content}
            </Box>
          </Box>

          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPolicy;
