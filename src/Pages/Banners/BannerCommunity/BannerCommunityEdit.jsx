import { useParams } from "react-router-dom";
import {
  useGetCommunityBannerByIdQuery,
  useUpdateCommunityBannerMutation,
} from "../../../Services/api.service";
import BannerEdit from "../../../Components/Banner/BannerEdit";

const BannerComunityEditPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetCommunityBannerByIdQuery(id);
  const [updateCommunityBanner] = useUpdateCommunityBannerMutation();


  return <BannerEdit refetch={refetch} navigateTo={'/banner/banner-community'} isLoading={isLoading} data={data} updateBanner={updateCommunityBanner} />
};

export default BannerComunityEditPage;
