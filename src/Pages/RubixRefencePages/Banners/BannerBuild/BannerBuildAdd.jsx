import AddBanner from "../../../Components/Banner/AddBanner";
import {
  useCreateBuildBannerMutation,
  useCreateLearnBannerMutation,
} from "../../../Services/api.service";

const BannerBuildAdd = () => {
  const [createBuildBannerData] = useCreateBuildBannerMutation();
  return (
    <AddBanner
      title={"Build banner"}
      navigateLink={"/banner/build"}
      createApi={createBuildBannerData}
    />
  );
};

export default BannerBuildAdd;
