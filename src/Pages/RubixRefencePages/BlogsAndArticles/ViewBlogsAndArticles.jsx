import {
  Badge,
  Box,
  Button,
  Divider,
  Image,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../Services/api.service";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import Header from "../../Components/Header";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ViewBlogsAndArticles = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetBlogByIdQuery(id);
  const blog = data?.data;
  if (isLoading) {
    return <FullscreenLoaders />;
  }
  return (
    <Box
      {...OPACITY_ON_LOAD}
      h={"100vh"}
      overflowY={"scroll"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Header
      title={'Blog'}
      btnTitle={'Edit blog'}
      link={`/blogs-articles/edit/${id}`}
      />


      <Box display={"flex"}>
        <Box className="col-5  d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
            Blog Info
          </span>
          <span className="web-text-medium text-secondary">
            Select the platform for which you need to create this campaign.
          </span>

          <Divider />

          <span className="web-text-large fw-bold rubix-text-dark">
            Blog's Banner image
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
              w={500}
              h={240}
              src={`${API_URL}/${blog?.content_image_large}`}
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

        <Box className="col-7 pt-4  p-4">
          <Box className="d-flex flex-column align-items-start gap-1 mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Status
            </Box>
            {blog.active_blog ? (
              <Badge size={"sm"}  colorScheme="teal">
                Active
              </Badge>
            ) : (
              <Badge
                size={"sm"}
                variant="solid"
                colorScheme="red"
              >
                Inactive
              </Badge>
            )}
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">Title</Box>
            <Box className="web-text-medium text-secondary">{blog?.title}</Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Blog description
            </Box>
            <Box className="web-text-medium text-secondary">
              {blog?.meta_description}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Content
            </Box>
            <Box className="web-text-medium">
              <Text
                pb={2}
                className="text-dark"
                dangerouslySetInnerHTML={{ __html: blog?.content }}
              />
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Blog summary
            </Box>
            <Box className="web-text-medium text-secondary">
              {blog?.summary}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark mb-2">
              Tags
            </Box>

            <Box
              display={"flex"}
              flexWrap={"wrap"}
              gap={2}
              alignItems={"center"}
              w={"100%"}
            >
              {blog?.tags?.map(({ id, tag }) => (
            <Badge rounded={'full'} key={id} variant="solid"  size={"sm"} ps={3} pe={3} pt={0.5} pb={0.5}  backgroundColor={'#565263'}>
                  {tag}
                </Badge>

              ))}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Category
            </Box>
            <Box className="web-text-medium text-secondary">
              {blog?.category?.blog_category}
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider/>
      
      <Box display={"flex"} mb={6}>
              <Box className="col-5 d-flex flex-column gap-2 pt-">
                <span className="web-text-large fw-bold rubix-text-dark">
                  Author's display profile
                </span>
                <span className="web-text-medium text-secondary mb-4">
                  Below is the profile that will be displayed on the community page.
                </span>
      
                <Box
                  className="d-flex  w-100 justify-content-center flex-column align-items-center "
                >
                  <Image
                    shadow={"md"}
                    rounded={8}
                    w={214}
                    h={240}
                    src={`${API_URL}/${blog?.profile_image}`}
                    alt="Selected Image"
                  />
                </Box>
              </Box>
      
              <Box className="col-7 pt-0  p-4">
                <Box className="mb-3">
                  <Box className="web-text-large fw-bold rubix-text-dark">
                    Author name
                  </Box>
                  <Box className="web-text-medium text-secondary">
                    {blog?.author_name}
                  </Box>
                </Box>
      
                <Box className="mb-3">
                  <Box className="web-text-large fw-bold rubix-text-dark">
                    Author designation
                  </Box>
                  <Box className="web-text-medium text-secondary">
                    {blog?.author_designation}
                  </Box>
                </Box>
              </Box>
            </Box>
            


    </Box>
  );
};

export default ViewBlogsAndArticles;
