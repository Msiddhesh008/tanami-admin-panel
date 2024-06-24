import { HiOutlineNewspaper } from "react-icons/hi";
import { TbBrandMedium, TbReportMoney } from "react-icons/tb";
import { RiBankLine, RiFileUserLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { VscSymbolClass } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";

import { MdOutlineAddChart } from "react-icons/md";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";
import { TbTransactionDollar } from "react-icons/tb";
import { TbCalendarDollar } from "react-icons/tb";
import { TbDeviceDesktopDollar } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdBrowserUpdated } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { SiAcademia } from "react-icons/si";
import { LuContact } from "react-icons/lu";

export const nav = [
  {
    title: "MASTER MENU",
    type: "title",
  },
  {
    title: "Master",
    submenu: [
      {
        title: "Sponser Master",
        path: "/sponser",
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "Investment Type",
        path: "/investment-type",
        icon: VscSymbolClass
      },
      {
        title: "Exchange Rate",
        path: "/view",
        icon:RiExchangeBoxLine
      },
    ],
    type: "accordion",
    Icon: TbBrandMedium,
  },
  {
    title: "IO Management",
    submenu: [
      {
        title: "Create IO",
        path: "/Create IO",
        icon:MdOutlineAddChart
      },
      {
        title: "View IO",
        path: "/View IO",
        icon:HiOutlineChartSquareBar
      },
    ],
    type: "accordion",
    Icon: TbDeviceDesktopDollar,
  },
  {
    title: "Investor Management",
    submenu: [
      {
        title: "Investor Details",
        path: "/View Investor Transactions",
        icon:TbListDetails
      },
      {
        title: "Investor Transactions",
        path: "/View IO",
        icon:TbTransactionDollar
      },
    ],
    type: "accordion",
    Icon: TbCalendarDollar,
  },
  {
    title: "INVESTORS REQUEST",
    type: "title",
  }, {
    title: "Withdrawal",
    submenu: [
      {
        title: "Pending Request",
        path: "/Pending Request",
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "View History",
        path: "/View History",
        icon:RiExchangeBoxLine
      }
    ],
    type: "accordion",
    Icon: BiMoneyWithdraw,
  },
  {
    title: "Investor Upgradation",
    submenu: [
      {
        title: "Pending Request",
        path: "/Pending Request",
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "View History",
        path: "/View History",
        icon:RiExchangeBoxLine
      }
    ],
    type: "accordion",
    Icon: MdBrowserUpdated,
  },
  {
    title: "Account Deletion",
    submenu: [
      {
        title: "Pending Request",
        path: "/Pending Request",
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "View History",
        path: "/View History",
        icon:RiExchangeBoxLine
      }
    ],
    type: "accordion",
    Icon: AiOutlineUserDelete,
  },
  {
    title: "MANAGE ADMIN",
    type: "title",
  },{
    title: "Admin",
    submenu: [
      {
        title: "Bank / Urban Investor",
        path: "/Pending Request",
        icon:TbReportMoney
      },
      {
        title: "Academy",
        path: "/Academy",
        icon:SiAcademia
      },
      {
        title: "Notification",
        path: "/Notification",
        icon:MdNotificationsNone
      },
      {
        title: "Contact Details",
        path: "/Contact Details",
        icon:LuContact
      },
      {
        title: "Users",
        path: "/Users",
        icon:RiFileUserLine
      },
      {
        title: "Bank Details",
        path: "/Bank Details",
        icon:RiBankLine
      }
    ],
    type: "accordion",
    Icon: TbBrandMedium,
  },
  // {
  //   title: "Single Link",
  //   type: "single",
  //   path: "/logout",
  //   Icon: HiOutlineNewspaper,
  // },
];



export const nestedNav = [
  {
    title: "MAIN MENU",
    type: "accordion",
    accArray: [
      {
        title: "Master",
        submenu: [
          {
            title: "Sponser",
            path: "/sponser",
            icon:RiMoneyDollarBoxLine
          },
          {
            title: "Exchange rate",
            path: "/exchange-rate",
            icon:RiExchangeBoxLine
          },
          {
            title: "Asset classes",
            path: "/view",
            icon:VscSymbolClass
          },
        ],
        type: "accordion",
        Icon: TbBrandMedium,
      },
      {
        title: "User",
        submenu: [
          {
            title: "Sponser",
            path: "/loop",
            icon:TbBrandMedium
          },
          {
            title: "Class",
            path: "/class",
            icon:TbBrandMedium
          },
          {
            title: "View",
            path: "/view",
            icon:TbBrandMedium
          },
        ],
        type: "accordion",
        Icon: HiOutlineNewspaper,
      },
    ]
  },
  ,
  {
    title: "User",
    submenu: [
      {
        title: "Sponser",
        path: "/loop",
        icon:TbBrandMedium
      },
      {
        title: "Class",
        path: "/class",
        icon:TbBrandMedium
      },
      {
        title: "View",
        path: "/view",
        icon:TbBrandMedium
      },
    ],
    type: "accordion",
    Icon: FiUsers,
  },
  {
    title: "SPONSER",
    type: "title",
  },
  {
    title: "Single Link",
    type: "single",
    path: "/",
    Icon: HiOutlineNewspaper,
  },
];
