import { Box, Divider, Image, Tag, Text, useToast } from "@chakra-ui/react";
import React from "react";
import Header from "../../Components/Header";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import {
  useGetUsecaseByIdQuery,
} from "../../Services/api.service";
import { useNavigate, useParams } from "react-router-dom";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import { formatDate } from "../../Components/Functions/UTCConvertor";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ViewUseCase = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUsecaseByIdQuery(id);
  const usecase = data?.data;

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
      title={"Usecase"}
      btnTitle={'Edit usecase'}
      link={`/usecase/edit/${id}`} 
      />

      <Box display={"flex"}>
        <Box className="col-5  d-flex flex-column gap-2 pt-4">

            
          
          <Box
            className="d-flex h-auto mb-4  w-100 justify-content-start flex-column align-items-center"
          >
            <Box w={'100%'} display={'flex'} flexDirection={'column'} alignItems={'start'} gap={2}  >
            <div className="web-text-large fw-bold rubix-text-dark">
          Icon image
          </div>
          <div className="web-text-medium text-secondary mb-4">
            Below is the profile that will be displayed on the community page.
          </div>
            </Box>
            
            <Image
              shadow={"md"}
              rounded={"full"}
              objectFit='cover'
              w={"100px"}
              h={"100px"}
              src={`${API_URL}/${usecase?.icon}`}
              alt="Selected Image"
            />
          </Box>

          <span className="web-text-large fw-bold rubix-text-dark">
          Usecase Banner image
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
              objectFit='cover'
              w={500}
              h={240}
              src={`${API_URL}/${usecase?.bannerImage}`}
              alt="Selected Image"
            />
          </Box>





        </Box>

        <Box className="col-7 pt-4  p-4">
          <Box>
            <Box className="web-text-large fw-bold mb-1 rubix-text-dark">
              Status
            </Box>
            {usecase?.status ? (
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
            <Box className="web-text-medium text-secondary">{usecase?.title}</Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
            Usecase description
            </Box>
            <Box className="web-text-medium text-secondary">
              {usecase?.meta_description}
            </Box>
          </Box>

          <Box className="mb-3 ">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Content
            </Box>
            <Box className="web-text-medium mt-2">
              <Text
                pb={2}
                className="text-dark"
                dangerouslySetInnerHTML={{ __html: usecase?.content }}
              />
            </Box>
          </Box> 

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Created at
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(usecase?.createdAt)}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Updated at
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(usecase?.updatedAt)}
            </Box>
          </Box>
          

        </Box>
      </Box>
    </Box>
  );
};

export default ViewUseCase;
