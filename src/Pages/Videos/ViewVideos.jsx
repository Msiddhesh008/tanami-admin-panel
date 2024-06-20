import { Box, Divider, Image, Tag, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVideosByIdQuery } from "../../Services/api.service";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import Header from "../../Components/Header";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ViewVideos = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetVideosByIdQuery(id);
  const videos = data?.data?.data;
  // console.log(videos);

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
        title={"Videos"}
        btnTitle={"Edit videos"}
        link={`/videos/edit/${id}`}
      />

      <Box display={"flex"}>
        <Box className="col-5  d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            Video Info
          </span>
          <span className="web-text-medium text-secondary">
            Select the platform for which you need to create this campaign.
          </span>

          <Divider />

          <span className="web-text-large fw-bold rubix-text-dark">
            Video thumbnail image
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
              src={`${API_URL}/${videos?.thumbnail}`}
              alt="Selected Image"
            />
          </Box>
        </Box>

        <Box className="col-7 pt-4  p-4">
          <Box>
            <Box className="web-text-large fw-bold mb-1 rubix-text-dark">
              Status
            </Box>
            {videos?.status ? (
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
              {videos?.title}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              videos description
            </Box>
            <Box className="web-text-medium text-secondary">
              {videos?.description}
            </Box>
          </Box>

          

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              videos duration
            </Box>
            <Box className="web-text-medium text-secondary">
              {videos?.duration}
            </Box>
          </Box>


          

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Video
            </Box>
            


            <Box  h={"250px"} pt={2} position={'relative'}>
            {/* <iframe
                src={`"https://www.youtube.com/embed/EUJBd2fP5TA?rel=0"`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "85%",
                  height: "100%",
                  left: 0,
                  right: 0,
                  border: "none",
                  borderRadius:4
                }}
              ></iframe> */}


<iframe
                src={videos?.embeddedCode}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "85%",
                  height: "100%",
                  left: 0,
                  right: 0,
                  border: "none",
                  borderRadius:4
                }}
              ></iframe>
            </Box>
            





          </Box>















        </Box>
      </Box>
    </Box>
  );
};

export default ViewVideos;
