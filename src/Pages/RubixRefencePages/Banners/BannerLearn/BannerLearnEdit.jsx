import React from 'react'
import BannerEdit from '../../../Components/Banner/BannerEdit'
import { useGetCommunityBannerByIdQuery, useGetLearnBannerByIdQuery, useUpdateCommunityBannerMutation, useUpdateLearnBannerMutation } from '../../../Services/api.service';
import { useParams } from 'react-router-dom';

const BannerLearnEdit = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch} = useGetLearnBannerByIdQuery(id);
  const [updateLearnBanner] = useUpdateLearnBannerMutation();
  return (
    <BannerEdit refetch={refetch} navigateTo="/banner/learn" isLoading={isLoading} data={data} updateBanner={updateLearnBanner} />
  )
}

export default BannerLearnEdit