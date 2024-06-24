import React from "react";
import {
  useDeleteBuildBannerMutation,
  useDeleteLearnBannerMutation,
  useDeleteNewsBannerMutation,
  useGetBuildBannerQuery,
  useGetLearnBannerQuery,
  useGetNewsBannerQuery,
  useUpdateBuildBannerStatusMutation,
  useUpdateLearnBannerStatusMutation,
  useUpdateNewsBannerStatusMutation,
} from "../../../Services/api.service";
import BannerTable from "../../../Components/Banner/BannerTable";

const BannerNews = () => {
  const newsBanner = useGetNewsBannerQuery();
  const [deleteNewsBanner] = useDeleteNewsBannerMutation();
  const [updateNewsBuildStatus] = useUpdateNewsBannerStatusMutation();
  const { data, error, isLoading } = useUpdateNewsBannerStatusMutation();
  return (
    <BannerTable
      addLink={"/banner/news/add-banner"}
      title={"News Banner"}
      viewLink={"/banner/news/view/"}
      editLink={"/banner/news/edit/"}
      deleteApi={deleteNewsBanner}
      dataArray={newsBanner}
      statusUpdateApi={updateNewsBuildStatus}
    />
  );
};

export default BannerNews;
