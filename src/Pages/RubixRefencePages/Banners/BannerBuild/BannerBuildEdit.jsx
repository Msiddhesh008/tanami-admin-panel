import React from 'react'
import BannerEdit from '../../../Components/Banner/BannerEdit'
import { useParams } from 'react-router-dom';
import { useGetBuildBannerByIdQuery, useUpdateBuildBannerMutation } from '../../../Services/api.service';

const BannerBuildEdit = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetBuildBannerByIdQuery(id);
  const [updateBuildBanner] = useUpdateBuildBannerMutation();

  return (<BannerEdit refetch={refetch} navigateTo={'/banner/build'} isLoading={isLoading} data={data} updateBanner={updateBuildBanner} />
  )
}

export default BannerBuildEdit