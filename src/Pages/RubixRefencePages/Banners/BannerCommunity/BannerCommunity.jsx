import React from "react";
import {
  useDeleteCommunityBannerMutation,
  useGetCommunityBannerQuery,
  useUpdateCommunityBannerStatusMutation,
} from "../../../Services/api.service";
import BannerTable from "../../../Components/Banner/BannerTable";

const BannerCommunity = () => {
  const communityBanner = useGetCommunityBannerQuery();
  const [deleteCommunityBanner] = useDeleteCommunityBannerMutation();
  const [updateCommunityBannerStatus] =
    useUpdateCommunityBannerStatusMutation();
    


  return (
    <BannerTable
      title={'Community banner'}
      addLink={"/banner/banner-community/add-banner"}
      viewLink={"/banner/banner-community/view/"}
      editLink={"/banner/banner-community/edit/"}
      deleteApi={deleteCommunityBanner}
      dataArray={communityBanner}
      statusUpdateApi={updateCommunityBannerStatus}
    />
  );
};

export default BannerCommunity;
