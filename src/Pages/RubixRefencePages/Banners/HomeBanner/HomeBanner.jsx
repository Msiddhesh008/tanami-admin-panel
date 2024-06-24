import React from "react";
import {
  useDeleteBuildBannerMutation,
  useDeleteHomeBannerMutation,
  useDeleteLearnBannerMutation,
  useDeleteNewsBannerMutation,
  useGetBuildBannerQuery,
  useGetHomeBannerQuery,
  useGetLearnBannerQuery,
  useGetNewsBannerQuery,
  useUpdateBuildBannerStatusMutation,
  useUpdateHomeBannerStatusMutation,
  useUpdateLearnBannerStatusMutation,
  useUpdateNewsBannerStatusMutation,
} from "../../../Services/api.service";
import BannerTable from "../../../Components/Banner/BannerTable";

const HomeBanner = () => {
  const homeBanner = useGetHomeBannerQuery();


  const [deleteHomeBanner] = useDeleteHomeBannerMutation();

  const [updateHomeBuildStatus] = useUpdateHomeBannerStatusMutation();
  const { data, error, isLoading } = useUpdateNewsBannerStatusMutation();
  return (
    <BannerTable
      addLink={"/banner/home/add-banner"}
      title={"Home Banner"}
      viewLink={"/banner/home/view/"}
      editLink={"/banner/home/edit/"}
      deleteApi={deleteHomeBanner}
      dataArray={homeBanner}
      statusUpdateApi={updateHomeBuildStatus}
    />
  );
};

export default HomeBanner;
