import React from "react";
import { useParams } from "react-router-dom";
import { useGetBuildBannerByIdQuery } from "../../Services/api.service";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { formatDate } from "../../Components/Functions/UTCConvertor";
import Header from "../../Components/Header";
import {
  Box,
  Button,
  Divider,
  Image,
  StackDivider,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import BannerMainCard from "./BannerMainCard";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const BannerView = ({data, isLoading, editLink, center}) => {
  const banner = data?.data;

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
        link={`${editLink}/${banner.id}`}
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
            {/* <Image
              shadow={"md"}
              rounded={8}
              w={500}
              h={240}
              src={`${API_URL}/${banner?.banner_image}`}
              alt="Selected Image"
            /> */}

            <BannerMainCard 
            imgLink={`${API_URL}/${banner?.banner_image}`}
            heading={banner?.Heading}
            subHeading={banner?.sub_heading}
            buttonTitle={banner?.CTO_button_title}
            center={center}
            />






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
              Heading
            </Box>
            <Box className="web-text-medium text-secondary">
              {banner?.Heading}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Sub heading
            </Box>
            <Box className="web-text-medium text-secondary">
              {banner?.sub_heading}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Button title
            </Box>
            <Box className="web-text-medium text-secondary">
              {banner?.CTO_button_title}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Button link
            </Box>
            <Box className="web-text-medium text-secondary">
              {banner?.CTO_button_link}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Created At
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(banner?.createdAt)}
            </Box>
          </Box>

          <Box  className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Updated At
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(banner?.updatedAt)}
            </Box>
          </Box>

          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default BannerView;
