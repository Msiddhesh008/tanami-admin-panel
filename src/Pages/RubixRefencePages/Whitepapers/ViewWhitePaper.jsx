import React from "react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { Box, Divider, Image, Tag, Text, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { useGetWhitepaperByIdQuery } from "../../Services/api.service";
import { AttachmentIcon } from "@chakra-ui/icons";
import extractFilename from "../../Components/Functions/FileNameAlter";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import pdf from "../../assets/pdfscreen.png"
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ViewWhitePaper = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetWhitepaperByIdQuery(id);
  const whitepaper = data?.data?.data;
  // console.log(whitepaper?.document);

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
      <Header title={"Whitepaper"} btnTitle={"Edit whitepaper"} link={`/whitepaper/edit/${id}`} />

      <Box display={"flex"}>
        <Box className="col-5  d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            Whitepaper Info
          </span>
          <span className="web-text-medium text-secondary">
            Select the platform for which you need to create this campaign.
          </span>

          <Divider />

          <span className="web-text-large fw-bold rubix-text-dark">
            Whitepaper Banner image
          </span>
          <span className="web-text-medium text-secondary mb-4">
            Below is the profile that will be displayed on the community page.
          </span>

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
              src={`${API_URL}/${whitepaper?.bannerImage}`}
              alt="Selected Image"
            />
          </Box>
        </Box>

        <Box className="col-7 pt-4  p-4">
          <Box>
            <Box className="web-text-large fw-bold mb-1 rubix-text-dark">
              Status
            </Box>
            {whitepaper?.status ? (
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
            <Box className="web-text-medium text-secondary">{whitepaper?.title}</Box>
          </Box>

          
          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">Document</Box>
            <Image mt={2} w={"80px"} src={pdf} />
            <Text color="teal" className="web-text-medium d-flex align-items-center mt-2 gap-2">{extractFilename(whitepaper?.document)} 
            <Box className="link pointer" as="span" rounded={"md"} p={1}><AttachmentIcon/></Box></Text>
          </Box>

          <Divider/>





        </Box>
      </Box>
    </Box>
  );
};

export default ViewWhitePaper;