import React from 'react'
import BannerEdit from '../../../Components/Banner/BannerEdit'
import { useGetCommunityBannerByIdQuery, useGetHomeBannerByIdQuery, useGetLearnBannerByIdQuery, useUpdateCommunityBannerMutation, useUpdateHomeBannerMutation, useUpdateLearnBannerMutation } from '../../../Services/api.service';
import { useParams } from 'react-router-dom';

const BannerHomeEdit = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetHomeBannerByIdQuery(id);
  const [updateLearnBanner] = useUpdateHomeBannerMutation();
  // useEffect(() => {
  //   refetch();
  // }, [id, refetch]);
  return (
    <BannerEdit center={true} refetch={refetch} navigateTo="/banner/home" isLoading={isLoading} data={data} updateBanner={updateLearnBanner} />
  )
}

export default BannerHomeEdit