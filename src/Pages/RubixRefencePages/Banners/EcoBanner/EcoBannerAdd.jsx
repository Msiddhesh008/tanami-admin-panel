import AddBanner from "../../../Components/Banner/AddBanner";
import { useCreateEcoBannerMutation, useCreateLearnBannerMutation, useCreateNewsBannerMutation } from "../../../Services/api.service";

const EcoBannerAdd = () => {
  const [createEcoBannerData] = useCreateEcoBannerMutation();
  return (
    <AddBanner
      title={"Ecosystem banner"}
      navigateLink={"/banner/eco"}
      createApi={createEcoBannerData}
    />
  );
};

export default EcoBannerAdd;
