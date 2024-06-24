import { useCreateCommunityBannerMutation } from "../../../Services/api.service";
import AddBanner from "../../../Components/Banner/AddBanner";

const BannerCommunityAdd = () => {
  const [createCommunityBannerData] = useCreateCommunityBannerMutation();

  return (
    <AddBanner
      title={"Learn banner"}
      navigateLink={"/banner/banner-community"}
      createApi={createCommunityBannerData}
    />
  );
};

export default BannerCommunityAdd;
