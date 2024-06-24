import React from 'react'
import { useGetEventsByIdQuery } from '../../Services/api.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Divider, Image, Tag, useToast } from '@chakra-ui/react';
import FullscreenLoaders from '../../Components/Loaders/FullscreenLoaders';
import { OPACITY_ON_LOAD } from '../../Layout/animations';
import Header from '../../Components/Header';
import { formatDate } from '../../Components/Functions/UTCConvertor';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ViewEvents = () => {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetEventsByIdQuery(id);
    const events = data?.data;
    if (isLoading) {
        return <FullscreenLoaders />;
      }
    return(
        <Box
          {...OPACITY_ON_LOAD}
          w={"100%"}
          h={"100vh"}
          className="overflow-auto "
          display={"flex"}
          flexDirection={"column"}
        >
          <Header 
          title={"Events"}
          btnTitle={'Edit events'}
          link={`/events/edit/${id}`} 
          />


          
      <Box display={"flex"}>
        <Box className="col-5  d-flex flex-column gap-2 pt-4">
          <span className="web-text-large fw-bold rubix-text-dark">
          Events Info
          </span>
          <span className="web-text-medium text-secondary">
            Select the platform for which you need to create this campaign.
          </span>

          <Divider />

          <span className="web-text-large fw-bold rubix-text-dark">
            Events Banner image
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
              src={`${API_URL}/${events?.banner_image}`}
              alt="Selected Image"
            />
          </Box>
        </Box>



        <Box className="col-7 pt-4  p-4">
          <Box>
            <Box className="web-text-large fw-bold mb-1 rubix-text-dark">
              Status
            </Box>
            {events?.status ? (
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
            <Box className="web-text-medium text-secondary">{events?.title}</Box>
          </Box>


          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Content
            </Box>
            <Box className="web-text-medium text-secondary">
              {events?.content}
            </Box>
          </Box>

          

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Location
            </Box>
            <Box className="web-text-medium text-secondary">
              {events?.location}
            </Box>
          </Box>


          

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Organisation name
            </Box>
            <Box className="web-text-medium text-secondary">
              {events?.organizer_name}
            </Box>
          </Box>

          
          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Organisation number
            </Box>
            <Box className="web-text-medium text-secondary">
              {events?.organizer_mobile_number}
            </Box>
          </Box>

          
          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Organisation email
            </Box>
            <Box className="web-text-medium text-secondary">
              {events?.organizer_email}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Event Dates
            </Box>
            <Box className="web-text-medium text-secondary">
              
            {events?.eventDates?.map(({ date }, index) => (
                    <span key={index} className="web-text-small me-2">
                      {formatDate(date)}
                    </span>
                  ))}
            </Box>
          </Box>



          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Created at
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(events?.createdAt)}
            </Box>
          </Box>

          <Box className="mb-3">
            <Box className="web-text-large fw-bold rubix-text-dark">
              Updated at
            </Box>
            <Box className="web-text-medium text-secondary">
              {formatDate(events?.updatedAt)}
            </Box>
          </Box>
        </Box>








        </Box>
    </Box>)
}

export default ViewEvents