import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetCommunityByIdQuery,
} from "../../Services/api.service";
import BannerView from "../../Components/Banner/BannerView";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { Box, Divider, Image, Tag } from "@chakra-ui/react";
import Header from "../../Components/Header";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { formatDate } from "../../Components/Functions/UTCConvertor";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ComunityViewPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCommunityByIdQuery(id);


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
      flexDirection={"column"}
    >
      <Header
        title={"Banner's"}
        btnTitle={"Edit banner"}
        link={`/community/edit/${id}`}
      />
      <Box display={"flex"}>
        <Box className="col-5 d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            Banners Info
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

          <Box
            boxSize="sm"
            className="d-flex w-100 justify-content-center flex-column align-items-center gap-3"
          >
            <Image
              shadow={"md"}
              rounded={8}
              w={214}
              h={240}
              src={`${API_URL}/${data?.data?.profile_image}`}
              alt="Selected Image"
            />
            {/* <Button
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
                </Button> */}
          </Box>
        </Box>

        <Box className="col-7 pt-4 overflow-auto p-4">
          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark mb-1">
              Status
            </Box>
            {data?.data?.status ? (
              <Tag size={"sm"} variant="solid" colorScheme="teal">
                Active
              </Tag>
            ) : (
              <Tag size={"sm"} variant="solid" colorScheme="red">
                Inactive
              </Tag>
            )}
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Author name
            </Box>
            <Box className="web-text-medium text-secondary">
              {data?.data?.member_name}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Designation
            </Box>
            <Box className="web-text-medium text-secondary">
              {data?.data?.designation}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Description
            </Box>
            <Box className="web-text-medium text-secondary">
              {data?.data?.description}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Linked In
            </Box>
            <Box className="web-text-medium text-secondary">
              {data?.data?.linkedin}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Created At
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(data?.data?.createdAt)}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Updated At
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(data?.data?.updatedAt)}
            </Box>
          </Box>

          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default ComunityViewPage;
