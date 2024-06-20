import { Box, Divider, Image, Tag, useToast } from "@chakra-ui/react";
import React from "react";
import Header from "../../Components/Header";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import {
  useGetNewsByIdQuery,
  useGetNewsQuery,
} from "../../Services/api.service";
import { useNavigate, useParams } from "react-router-dom";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { formatDate } from "../../Components/Functions/UTCConvertor";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ViewNews = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetNewsByIdQuery(id);
  // const { data, error, isLoading } = useGetNewsQuery();
  const news = data?.data;

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
      <Header title={"News"} btnTitle={"Edit news"} link={`/news/edit/${id}`} />

      <Box display={"flex"}>
        <Box className="col-5  d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            News Info
          </span>
          <span className="web-text-medium text-secondary">
            Select the platform for which you need to create this campaign.
          </span>

          <Divider />

          <span className="web-text-large fw-bold rubix-text-dark">
            News Banner image
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
              src={`${API_URL}/${news?.banner_image}`}
              alt="Selected Image"
            />
          </Box>
        </Box>

        <Box className="col-7 pt-4  p-4">
          <Box>
            <Box className="web-text-large fw-bold mb-1 rubix-text-dark">
              Status
            </Box>
            {news?.status ? (
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
            <Box className="web-text-medium text-secondary">{news?.title}</Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Meta description
            </Box>
            <Box className="web-text-medium text-secondary">
              {news?.meta_description}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Content
            </Box>
            <Box className="web-text-medium text-secondary">
              {news?.content}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Created at
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(news?.createdAt)}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Updated at
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(news?.updatedAt)}
            </Box>
          </Box>
          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Release date
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(news?.release_date)}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewNews;
