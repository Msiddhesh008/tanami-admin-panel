
import DeletionHistory from "../Pages/AccountDeletion/DeletionHistory";
import DeletionRequest from "../Pages/AccountDeletion/DeletionRequest";
import Academy from "../Pages/Admin/Academy";
import BankDetails from "../Pages/Admin/BankDetails";
import BankInvestor from "../Pages/Admin/BankInvestor";
import Contact from "../Pages/Admin/Contact";
import Notification from "../Pages/Admin/Notification";
import Users from "../Pages/Admin/Users";
import Create from "../Pages/IO_Management/Create";
import View from "../Pages/IO_Management/View";
import InvestorPendingRequest from "../Pages/InvestorUpgrade/InvestorPendingRequest";
import upgradeHistory from "../Pages/InvestorUpgrade/UpgradeHistory";
import InvestorDetails from "../Pages/Investor_Management/InvestorDetails";
import InvestorTransactions from "../Pages/Investor_Management/InvestorTransactions";
import ExchangeRate from "../Pages/Master/ExchangeRate/ExchangeRate";
import InvestmentType from "../Pages/Master/InvestmentType/InvestmentType";
import AddSponser from "../Pages/Master/Sponser/AddSponser";
import Sponser from "../Pages/Master/Sponser/Sponsers";
import PendingRequest from "../Pages/WithDrawal/PendingRequest";
import ViewHistory from "../Pages/WithDrawal/ViewHistory";

export const RouteLink = [
  // =============[ Tanami ]================
  // ===============[ Management]===============
  { path: "/sponser", Component: Sponser },
  { path: "/sponser/add-sponser", Component: AddSponser },
  { path: "/exchange-rate", Component: ExchangeRate },
  { path: "/investment-type", Component: InvestmentType },

  // ===============[ IO Management]===============
  { path: "/create", Component: Create },
  { path: "/view", Component: View },

  // ===============[ Investor Management]===============
  { path: "/investor-details", Component: InvestorDetails },
  { path: "/investor-transactions", Component: InvestorTransactions },

  // ===============[ Withdrawal]===============
  { path: "/pending-request", Component: PendingRequest },
  { path: "/view-history", Component: ViewHistory },

  // ===============[ Withdrawal]===============
  { path: "/upgrade-history", Component: upgradeHistory },
  { path: "/investor-request", Component: InvestorPendingRequest },

  // ===============[ Deletion]===============
  { path: "/deletion-request", Component: DeletionRequest },
  { path: "/deletion-history", Component: DeletionHistory },

  // ===============[ Admin]===============
  { path: "/bank-investor", Component: BankInvestor },
  { path: "/academy", Component: Academy },
  { path: "/notification", Component: Notification },
  { path: "/contact", Component: Contact },
  { path: "/users", Component: Users },
  { path: "/bank-details", Component: BankDetails },
];
