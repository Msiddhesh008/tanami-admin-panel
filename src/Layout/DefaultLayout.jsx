import React, { useContext, useState } from "react";
import logo from "../assets/logo2.png";
import logoMini from "../assets/logo-min.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slice/auth";
import Button02 from "../Components/Buttons/Button02";
import { TbArrowBadgeLeftFilled } from "react-icons/tb";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RouteLink } from "../Routes/Routes";
import NotFound from "../Pages/NotFound";
import { nav } from "../Routes/Nav";
import {
  Avatar,
  Box,
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  WrapItem,
  Popover,
  Tag,
} from "@chakra-ui/react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Cookies from "js-cookie"; // Import the Cookies library
import Header from "../Components/Header";
import HeaderMain from "../Components/HeaderMain";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDrawerClick, setOpenDrawerClick] = useState(true);
  const { setIsAuthenticate } = useContext(GlobalStateContext);

  const openDrawerOnClick = () => {
    setOpenDrawerClick(!openDrawerClick);
  };

  const logOutHandler = () => {
    // dispach(loginUser(false));
    setIsAuthenticate(false);
    Cookies.remove("isAuthenticated");
    navigate("/login");
  };

  // // Function to get the title based on the route
  const getTitle = () => {
    switch (path) {
      case "/":
        return "👋🏻 Hi, Admin";
        case "/investment":
          return "Investment";
      case "/blogs-articles":
        return "Blogs and Articles";
      case "/videos":
        return "Videos";
      case "/news":
        return "News";
      case "/events":
        return "Events";
      case "/whitepaper":
        return "Whitepaper";
      case "/community/":
        return "Community";
      case "/community":
        return "Community";
      case "/community/view/":
        return "Community";
      case "/community/add-comunity":
        return (
          <Text color={"teal.800"} className="d-flex align-items-center">
            <Link to={"/community/"}>
              <ArrowBackIcon className="me-2 fs-3 link p-1 rounded-1" />
            </Link>
            Community
          </Text>
        );
      default:
        if (path.startsWith("/community/view/")) {
          return (
            <span className="d-flex align-items-center">
              <Link to={"/community/"}>
                <ArrowBackIcon className="me-2 fs-3 link p-1 rounded-1" />
              </Link>
              Community
            </span>
          );
        } else if (path.startsWith("/community/edit/")) {
          return (
            <span className="d-flex align-items-center">
              <Link to={"/community/"}>
                <ArrowBackIcon className="me-2 fs-3 link p-1 rounded-1" />
              </Link>
              Community
            </span>
          );
        }
        return "Tanami";
    }
  };


  

  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",

        // backgroundColor:"#101015"
        // backgroundColor:"#000000"
      }}
      className="d-flex"
      pe={0.5}
      
    >
      <aside
        className="h-100 position-relative sideBar  pe-1"
        // onMouseOver={() => setIsDrawerOpen(true)}
        // onMouseLeave={() => setIsDrawerOpen(false)}
        style={{
          width: isDrawerOpen || openDrawerClick ? 225 : 70,
          transition: "width 0.3s ease-in-out", // Smooth transition for width change
          overflow: "hidden", // Hide overflow to prevent content overflow during transition
          backgroundColor:"#0041180A",
          // backgroundColor: "#002F0F",
        }}
      >
        <div
          className={`d-flex  ${isDrawerOpen || openDrawerClick ? "justify-content-start" : "justify-content-center"}  p-3 pt-3 pb-4 position-relative `}
          height={"10%"}
        >
          {isDrawerOpen || openDrawerClick ? (
            <img
              style={{
                width: 120,
              }}
              src={logo}
              alt="Logo"
            />
          ) : (
            <img
              style={{
                width: 30,
              }}
              src={logoMini}
              alt="Logo"
            />
          )}
        </div>

        <div
          className="ps-2  scroll-bar "
          style={{ height: "80%", overflowY: "scroll", overflowX:"hidden" }}
        >
          {nav.map(({ title, path, Icon }, index) => (
            <Box
              // color={"whitesmoke"}
              color={"gray.600"}
              key={index}
              className=" mb-1 w-100 d-flex  "
            >
              {path ? (
                <NavLink
                  style={{
                    height: "auto",
                  }}
                  className={`${
                    isDrawerOpen || openDrawerClick
                      ? "p-1 web-text-medium ps-3"
                      : "p-2 ps-1 web-text-xlarge justify-content-center"
                  }  rounded-1  link  d-flex align-items-center gap-2 w-100   `}
                  to={path}
                >
                  <span
                    style={{
                      display:
                        isDrawerOpen || openDrawerClick ? "flex" : "flex",
                      alignItems: "center",
                      paddingBottom: 0,
                    }}
                  >
                    <Icon className="web-text-large" />
                  </span>
                  <span
                    style={{
                      display:
                        isDrawerOpen || openDrawerClick ? "flex" : "none",
                      alignItems: "center",
                      padding: 3,
                      overflow: "hidden",
                    }}
                  >
                    {title}
                  </span>
                </NavLink>
              ) : (
                <span className="web-text-xxsmall fw-600 mt-1 text-secondary fw-bold">
                  {title}
                </span>
              )}
            </Box>
          ))}
        </div>

        {/* <section
          className="d-flex justify-content-center border-top  p-2 "
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
          }}
        >
          <Popover placement="top">
            <Portal>
              <PopoverContent maxW="220px" className="ms-2">
                <PopoverArrow />
                <PopoverBody className="web-text-medium pointer link">
                  Profile
                </PopoverBody>
                <Link to={"/help-and-support"}>
                  <PopoverBody className="web-text-medium pointer ">
                    Help & Support
                  </PopoverBody>
                </Link>
                <PopoverFooter
                  onClick={logOutHandler}
                  className="web-text-medium pointer link"
                >
                  Log Out
                </PopoverFooter>
              </PopoverContent>
            </Portal>
            <PopoverTrigger>
              <Box
                // onClick={logOutHandler}
                className="d-flex pointer  align-items-center"
              >
                <Avatar
                  size="xs"
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />
                <Box
                  color={"whitesmoke"}
                  style={{
                    opacity: isDrawerOpen || openDrawerClick ? 1 : 0,
                    display: isDrawerOpen || openDrawerClick ? "flex" : "none",
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  className=" overflow-hidden ms-3  flex-column "
                >
                  <Text as={"span"} className="web-text-small">
                    Hello, developer admin
                  </Text>
                  <Text as={"span"} className="web-text-xsmall">
                    siddhesh@rubix.com
                  </Text>
                </Box>
              </Box>
            </PopoverTrigger>
          </Popover>
        </section> */}
      </aside>

      <main
        className={`h-100   ${path === "/" ? "ps-0" : "ps-3" }  `}
        style={{
          width: `calc(100% - ${isDrawerOpen || openDrawerClick ? 225 : 70}px)`,
          transition: "width 0.3s ease-in-out",
          position: "relative",
          // boxShadow:
          //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <Button
          colorScheme={"forestGreen"}
          rounded={"lg"}
          // onMouseOver={() => setIsDrawerOpen(true)}
          // onMouseLeave={() => setIsDrawerOpen(false)}
          onClick={openDrawerOnClick}
          style={{
            width: 18,
            height: 26,
            position: "absolute",
            left: -28,
            bottom: 80,
            zIndex: 6,
          }}
        >
          {isDrawerOpen || openDrawerClick ? (
            <ArrowLeftIcon className="web-text-small" />
          ) : (
            <ArrowRightIcon className="web-text-small " />
          )}
        </Button>

        {/* <header className="p-2 ps-0 pt-3 fw-400  border-bottom">
          <span className="fs-5">{getTitle()}</span>
        </header> */}

        <HeaderMain logOutHandler={logOutHandler} icon title={getTitle()}/>

        <AppContent />
      </main>
    </Box>
  );
};

export default DashboardLayout;

const AppContent = () => {
  return (
    <Routes>
      {RouteLink.map(({ path, Component }, index) => (
        <Route key={index} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
