import React from 'react'
import BannerEdit from '../../../Components/Banner/BannerEdit'
import { useParams } from 'react-router-dom';
import { useGetNewsBannerByIdQuery, useUpdateNewsBannerMutation } from '../../../Services/api.service';

const BannerNewsEdit = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetNewsBannerByIdQuery(id);
  const [updateNewsBanner] = useUpdateNewsBannerMutation();
  return (
    <BannerEdit navigateTo="/banner/build" isLoading={isLoading} data={data} updateBanner={updateNewsBanner} />
  )
}

export default BannerNewsEdit