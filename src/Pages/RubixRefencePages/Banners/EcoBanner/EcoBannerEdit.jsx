import React from 'react'
import BannerEdit from '../../../Components/Banner/BannerEdit'
import { useParams } from 'react-router-dom';
import { useGetEcoBannerByIdQuery, useGetNewsBannerByIdQuery, useUpdateEcoBannerMutation, useUpdateNewsBannerMutation } from '../../../Services/api.service';

const EcoBannerEdit = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetEcoBannerByIdQuery(id);
  const [updateNewsBanner] = useUpdateEcoBannerMutation();
  return (
    <BannerEdit refetch={refetch} navigateTo="/banner/eco" isLoading={isLoading} data={data} updateBanner={updateNewsBanner} />
  )
}

export default EcoBannerEdit