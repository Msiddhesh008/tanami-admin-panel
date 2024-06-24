
import Investment from "../Pages/Investment/Investment";
import ExchangeRate from "../Pages/Master/ExchangeRate/ExchangeRate";
import AddSponser from "../Pages/Master/Sponser/AddSponser";
import Sponser from "../Pages/Master/Sponser/Sponsers";

export const RouteLink = [
  // =============[ Tanami ]================
  { path: "/sponser", Component: Sponser },
  { path: "/sponser/add-sponser", Component: AddSponser },



  
  { path: "/exchange-rate", Component: ExchangeRate },
];
