import { HiOutlineNewspaper } from "react-icons/hi";
import { TbBrandMedium } from "react-icons/tb";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { VscSymbolClass } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";


export const nav = [
  {
    title: "MAIN MENU",
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
        icon:RiExchangeBoxLine
      },
      {
        title: "Exchange Rate",
        path: "/view",
        icon:VscSymbolClass
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
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "View IO",
        path: "/View IO",
        icon:RiExchangeBoxLine
      },
    ],
    type: "accordion",
    Icon: TbBrandMedium,
  },
  {
    title: "Investor Management",
    submenu: [
      {
        title: "Investor Details",
        path: "/View Investor Transactions",
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "Investor Transactions",
        path: "/View IO",
        icon:RiExchangeBoxLine
      },
    ],
    type: "accordion",
    Icon: TbBrandMedium,
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
    Icon: TbBrandMedium,
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
    Icon: TbBrandMedium,
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
    Icon: TbBrandMedium,
  },
  {
    title: "MANAGE ADMIN",
    type: "title",
  },{
    title: "Admin",
    submenu: [
      {
        title: "Ban / Unban Investor",
        path: "/Pending Request",
        icon:RiMoneyDollarBoxLine
      },
      {
        title: "Acadamy",
        path: "/Acadamy",
        icon:RiExchangeBoxLine
      },
      {
        title: "Notification",
        path: "/Notification",
        icon:RiExchangeBoxLine
      },
      {
        title: "Contact Details",
        path: "/Contact Details",
        icon:RiExchangeBoxLine
      },
      {
        title: "Users",
        path: "/Users",
        icon:RiExchangeBoxLine
      },
      {
        title: "Bank Details",
        path: "/Bank Details",
        icon:RiExchangeBoxLine
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
  // {
  //   title: "SPONSER",
  //   type: "title",
  // },
  // {
  //   title: "Single Link",
  //   type: "single",
  //   path: "/",
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
