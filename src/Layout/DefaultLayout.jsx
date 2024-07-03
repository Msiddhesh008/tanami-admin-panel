import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo2.png";
import logoDark from "../assets/logo.png";
import logoMini from "../assets/logo-min.png";
import logoMiniDark from "../assets/favicon.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slice/auth";
import Button02 from "../Components/Buttons/Button02";
import {
  TbArrowBadgeLeftFilled,
  TbListDetails,
  TbReportMoney,
  TbTransactionDollar,
} from "react-icons/tb";
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Image,
} from "@chakra-ui/react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Cookies from "js-cookie"; // Import the Cookies library
import Header from "../Components/Header";
import HeaderMain from "../Components/HeaderMain";
import { IoMdSwap } from "react-icons/io";
import {
  RiBankLine,
  RiExchangeBoxLine,
  RiFileUserLine,
  RiMoneyDollarBoxLine,
} from "react-icons/ri";
import { VscSymbolClass } from "react-icons/vsc";
import { MdNotificationsNone, MdOutlineAddChart } from "react-icons/md";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { GrManual } from "react-icons/gr";
import { LuContact } from "react-icons/lu";
import shield from "../assets/shield.png";
import SplashScreen from "../Pages/SplashScreen";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDrawerClick, setOpenDrawerClick] = useState(true);
  const {
    setIsAuthenticate,
    colorMode,
    toggleColorMode,
    setSlideFormRight,
    slideFromRight,
  } = useContext(GlobalStateContext);
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const savedIndex = localStorage.getItem("openAccordionIndex");
    if (savedIndex !== null) {
      setOpenIndex(parseInt(savedIndex));
    }
  }, []);

  const handleAccordionChange = (index) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);
    localStorage.setItem("openAccordionIndex", newIndex);
  };

  useEffect(() => {
    // Set a timer to hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000); // 3000ms = 3 seconds

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  const openDrawerOnClick = () => {
    setOpenDrawerClick(!openDrawerClick);
  };

  const logOutHandler = () => {
    // dispach(loginUser(false));
    setIsAuthenticate(false);
    Cookies.remove("isAuthenticated");
    navigate("/login");
  };

  console.log();

  // // Function to get the title based on the route
  const getTitle = () => {
    switch (true) {
      case "/":
        return "👋🏻 Hi, Admin";
      case path.startsWith("/sponser"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiMoneyDollarBoxLine className="h4 m-0" /> Sponser
          </span>
        );
      case path.startsWith("/investment-type"):
        return (
          <span className="d-flex align-items-end gap-2">
            <VscSymbolClass className="h4 m-0" /> Investment Type
          </span>
        );
      case path.startsWith("/exchange-rate"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiExchangeBoxLine className="h4 m-0 fw-normal" />
            Echange rate
          </span>
        );
      case path.startsWith("/create-io"):
        return (
          <span className="d-flex align-items-end gap-2">
            <MdOutlineAddChart className="h4 m-0 fw-normal" />
            Create IO
          </span>
        );
      case path.startsWith("/view-io"):
        return (
          <span className="d-flex align-items-end gap-2">
            <HiOutlineChartSquareBar className="h4 m-0 fw-normal" />
            View IO
          </span>
        );
      case path.startsWith("/investor-details"):
        return (
          <span className="d-flex align-items-end gap-2">
            <TbListDetails className="h4 m-0 fw-normal" />
            Investor Details
          </span>
        );
      case path.startsWith("/investor-transactions"):
        return (
          <span className="d-flex align-items-end gap-2">
            <TbTransactionDollar className="h4 m-0 fw-normal" />
            Investor Transactions
          </span>
        );
      case path.startsWith("/withdraw-request"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiMoneyDollarBoxLine className="h4 m-0 fw-normal" />
            Withdrawal pending request
          </span>
        );
      case path.startsWith("/withdraw-history"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiExchangeBoxLine className="h4 m-0 fw-normal" />
            Withdrawal request
          </span>
        );
      case path.startsWith("/investor-request"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiMoneyDollarBoxLine className="h4 m-0 fw-normal" />
            Investor pending request
          </span>
        );
      case path.startsWith("/investor-history"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiExchangeBoxLine className="h4 m-0 fw-normal" />
            Investor request
          </span>
        );
      case path.startsWith("/deletion-request"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiMoneyDollarBoxLine className="h4 m-0 fw-normal" />
            Deletion pending request
          </span>
        );
      case path.startsWith("/deletion-history"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiExchangeBoxLine className="h4 m-0 fw-normal" />
            Deletion request
          </span>
        );
      case path.startsWith("/bank-investor"):
        return (
          <span className="d-flex align-items-end gap-2">
            <TbReportMoney className="h4 m-0 fw-normal" />
            Ban / Unban Investor
          </span>
        );
      case path.startsWith("/academy"):
        return (
          <span className="d-flex align-items-end gap-2">
            <GrManual className="h4 m-0 fw-normal" />
            Academy
          </span>
        );
      case path.startsWith("/notification"):
        return (
          <span className="d-flex align-items-end gap-2">
            <MdNotificationsNone className="h4 m-0 fw-normal" />
            Notification
          </span>
        );
      case path.startsWith("/contact"):
        return (
          <span className="d-flex align-items-end gap-2">
            <LuContact className="h4 m-0 fw-normal" />
            Contact Details
          </span>
        );
      case path.startsWith("/users"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiFileUserLine className="h4 m-0 fw-normal" />
            Users
          </span>
        );
      case path.startsWith("/bank-details"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiBankLine className="h4 m-0 fw-normal" />
            Bank Details
          </span>
        );
      case path.startsWith("/deletion-request"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiMoneyDollarBoxLine className="h4 m-0 fw-normal" />
            Deletion pending request
          </span>
        );
      case path.startsWith("/deletion-history"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiExchangeBoxLine className="h4 m-0 fw-normal" />
            Deletion request
          </span>
        );
      case path.startsWith("/deletion-request"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiMoneyDollarBoxLine className="h4 m-0 fw-normal" />
            Deletion pending request
          </span>
        );
      case path.startsWith("/deletion-history"):
        return (
          <span className="d-flex align-items-end gap-2">
            <RiExchangeBoxLine className="h4 m-0 fw-normal" />
            Deletion request
          </span>
        );

      default:
        if (path.startsWith("/community/view/")) {
          return (
            <span className="d-flex align-items-center">
              <Link to={"/community/"}>
                <ArrowBackIcon className="me-2  fs-3 link p-1 rounded-1" />
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

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
      className="d-flex"
      pe={0.5}
    >
      <Box
        bottom={4}
        right={!slideFromRight ? 4 : "auto"}
        left={slideFromRight ? 4 : "auto"}
        backgroundColor={"#fff"}
        rounded={"full"}
        p={2}
        w={8}
        h={8}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"#004118"}
        fontWeight={"800"}
        cursor={"pointer"}
        position={"absolute"}
        transition={"0.5s"}
        boxShadow={"md"}
        onClick={() => setSlideFormRight(!slideFromRight)}
        _hover={{
          opacity: 1,
        }}
        zIndex={999}
      >
        <IoMdSwap />
      </Box>

      {slideFromRight ? null : (
        <aside
          className="h-100  position-relative sideBar  "
          // onMouseOver={() => setIsDrawerOpen(true)}
          // onMouseLeave={() => setIsDrawerOpen(false)}
          style={{
            width: isDrawerOpen || openDrawerClick ? 232 : 74,
            transition: "width 0.3s ease-in-out", // Smooth transition for width change
            // overflow: "hidden",
            backgroundColor: "#0041180A",
            position: "relative",
            // backgroundColor: "#002F0F",
          }}
        >
          <div
            className={`d-flex  ${
              isDrawerOpen || openDrawerClick
                ? "justify-content-start"
                : "justify-content-center"
            }  p-3 pt-3 pb-4 position-relative `}
            height={"10%"}
          >
            {isDrawerOpen || openDrawerClick ? (
              <Image
                style={{
                  width: 120,
                }}
                src={colorMode === "light" ? logo : logoDark}
                alt="Logo"
              />
            ) : (
              <Image
                style={{
                  width: 30,
                }}
                src={colorMode === "light" ? logoMini : logoMiniDark}
                alt="Logo"
              />
            )}
          </div>

          <Box
            className="ps-2 scroll-bar pe-1"
            style={{
              height: "90%",
              overflowY: "scroll",
              overflowX: "hidden",
              paddingBottom: "5rem",
            }}
          >
            <Accordion
              m={0}
              allowToggle
              defaultIndex={[0]}
              index={openIndex}
              onChange={handleAccordionChange}
            >
              {nav.map(({ title, type, Icon, submenu, path }, index) => {
                if (type === "accordion") {
                  return (
                    <AccordionItem key={index} border={"none"}>
                      <AccordionButton
                        style={{ height: "auto" }}
                        className={`${
                          isDrawerOpen || openDrawerClick
                            ? "p-2 web-text-medium ps-3 justify-content-between"
                            : "p-2 ps-1 web-text-xlarge justify-content-center"
                        } rounded-1 link d-flex align-items-center gap-2 w-100 mb-1`}
                      >
                        <Box
                          as="span"
                          display={"flex"}
                          gap={2}
                          alignItems={"center"}
                        >
                          {/* {Icon && title === "Admin" ? <Image w={15} src={shield} /> : <Icon className={`web-text-large`} />} */}
                          {Icon && (
                            <Icon
                              fontSize={title === "Admin" ? "18px" : "15px"}
                            />
                          )}
                          <Text
                            as={"span"}
                            display={
                              isDrawerOpen || openDrawerClick ? "flex" : "none"
                            }
                            alignItems="center"
                            overflow="hidden"
                            textAlign={"left"}
                          >
                            {title}
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel
                        p={0}
                        pb={1}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                      >
                        {submenu?.map(
                          (
                            { title: subMenuTitle, path: link, icon: SubIcon },
                            i
                          ) => (
                            <Box
                              key={i}
                              style={{ height: "auto", position: "relative" }}
                              className={`${
                                isDrawerOpen || openDrawerClick
                                  ? " web-text-medium ps-4"
                                  : " web-text-xlarge  justify-content-center"
                              }  d-flex align-items-center  p-0`}
                            >
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  width: 2,
                                  left: 22,
                                  height:
                                    i === submenu?.length - 1 ? "55%" : "120%",
                                  borderRadius: "0 0 10px 10px",
                                }}
                              />
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  width: 10,
                                  left: 22,
                                  height: 2,
                                }}
                              />

                              <NavLink
                                className={`${
                                  isDrawerOpen || openDrawerClick
                                    ? "p-2 ps-1 ms-2 web-text-medium "
                                    : "p-2 ps-0 ms-0 zindex-3 ms-4 web-text-xlarge justify-content-center"
                                } rounded-1 link d-flex align-items-center gap-2 w-100 `}
                                to={link}
                              >
                                {SubIcon && (
                                  <SubIcon
                                    className="web-text-large ms-2"
                                    style={{ zIndex: 111 }}
                                  />
                                )}
                                <Text
                                  as={"span"}
                                  display={
                                    isDrawerOpen || openDrawerClick
                                      ? "flex"
                                      : "none"
                                  }
                                  alignItems="center"
                                  overflow="hidden"
                                >
                                  {subMenuTitle}
                                </Text>
                              </NavLink>
                            </Box>
                          )
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                } else if (type === "title") {
                  return (
                    <Text
                      as={"span"}
                      key={index}
                      className="web-text-xxsmall fw-600  text-secondary fw-bold"
                    >
                      {title}
                    </Text>
                  );
                } else if (type === "single") {
                  return (
                    <NavLink
                      key={index}
                      style={{ height: "auto", position: "relative" }}
                      className={`${
                        isDrawerOpen || openDrawerClick
                          ? "p-2 web-text-medium"
                          : "p-2 ps-0 web-text-xlarge justify-content-start"
                      } rounded-1 link d-flex align-items-center gap-2 w-100`}
                      to={path}
                    >
                      {Icon && <Icon className="web-text-large ms-2" />}
                      <Text
                        as={"span"}
                        display={
                          isDrawerOpen || openDrawerClick ? "flex" : "none"
                        }
                        alignItems="center"
                        overflow="hidden"
                      >
                        {title}
                      </Text>
                    </NavLink>
                  );
                } else {
                  return null;
                }
              })}
            </Accordion>
          </Box>

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
              right: -19,
              bottom: 28,
              zIndex: 99,
            }}
          >
            {isDrawerOpen || openDrawerClick ? (
              <ArrowLeftIcon className="web-text-small" />
            ) : (
              <ArrowRightIcon className="web-text-small " />
            )}
          </Button>

          <Box
            id="google_translate_element"
            display="block"
            className="bg-danger"
          />
        </aside>
      )}

      <main
        className={`h-100   ${slideFromRight ? "pe-3" : "ps-3"} `}
        style={{
          width: `calc(100% - ${isDrawerOpen || openDrawerClick ? 232 : 74}px)`,
          transition: "width 0.3s ease-in-out",
        }}
      >
        {/* <header className="p-2 ps-0 pt-3 fw-400  border-bottom">
          <span className="fs-5">{getTitle()}</span>
        </header> */}

        <HeaderMain
          slideDirecttion={slideFromRight}
          logOutHandler={logOutHandler}
          icon
          title={getTitle()}
        />

        <AppContent />
      </main>

      {/* =======[ Left ]============ */}

      {slideFromRight ? (
        <aside
          className="h-100 position-relative sideBar  pe-1"
          // onMouseOver={() => setIsDrawerOpen(true)}
          // onMouseLeave={() => setIsDrawerOpen(false)}
          style={{
            width: isDrawerOpen || openDrawerClick ? 232 : 74,
            transition: "width 0.3s ease-in-out", // Smooth transition for width change
            // overflow: "hidden",
            backgroundColor: "#0041180A",
            position: "relative",
            // backgroundColor: "#002F0F",
          }}
        >
          <div
            className={`d-flex  ${
              isDrawerOpen || openDrawerClick
                ? "justify-content-end"
                : "justify-content-center"
            }  p-3 pt-3 pb-4 position-relative `}
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

          <Box
            className="ps-2 scroll-bar"
            style={{ height: "80%", overflowY: "scroll", overflowX: "hidden" }}
          >
            <Accordion m={0} allowToggle>
              {nav.map(({ title, type, Icon, submenu, path }, index) => {
                if (type === "accordion") {
                  return (
                    <AccordionItem key={index} border={"none"}>
                      <AccordionButton
                        style={{ height: "auto" }}
                        className={`${
                          isDrawerOpen || openDrawerClick
                            ? "p-2 web-text-medium ps-3 justify-content-between"
                            : "p-2 ps-1 web-text-xlarge justify-content-center"
                        } rounded-1 link d-flex align-items-center gap-2 w-100 mb-1`}
                        flexDirection={"row-reverse"}
                      >
                        <Box
                          as="span"
                          display={"flex"}
                          gap={2}
                          alignItems={"center"}
                          flexDirection={"row-reverse"}
                        >
                          {Icon && <Icon className="web-text-large" />}
                          <Text
                            as={"span"}
                            display={
                              isDrawerOpen || openDrawerClick ? "flex" : "none"
                            }
                            alignItems="center"
                            overflow="hidden"
                          >
                            {title}
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel
                        p={0}
                        pb={1}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                      >
                        {submenu?.map(
                          (
                            { title: subMenuTitle, path: link, icon: SubIcon },
                            i
                          ) => (
                            <Box
                              key={i}
                              style={{ height: "auto", position: "relative" }}
                              className={`${
                                isDrawerOpen || openDrawerClick
                                  ? " web-text-medium ps-0 pe-4"
                                  : " web-text-xlarge  justify-content-center"
                              }  d-flex align-items-center  p-0`}
                            >
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  width: 2,
                                  right: 20,
                                  height:
                                    i === submenu?.length - 1 ? "55%" : "120%",
                                  borderRadius: "0 0 10px 10px",
                                }}
                              />
                              <Box
                                backgroundColor={"gray.300"}
                                style={{
                                  position: "absolute",
                                  width: 8,
                                  right: 20,
                                  height: 2,
                                }}
                              />

                              <NavLink
                                flexDirection={"row-reverse"}
                                className={`${
                                  isDrawerOpen || openDrawerClick
                                    ? "p-2 ps-1 me-1 web-text-medium "
                                    : "p-2 ps-0 ms-0 zindex-3 ms-4 web-text-xlarge justify-content-center"
                                } rounded-1 link d-flex align-items-center gap-2 w-100 flex-direction-row-reverse`}
                                to={link}
                                style={{ flexDirection: "row-reverse" }}
                              >
                                {SubIcon && (
                                  <SubIcon
                                    className="web-text-large ms-0"
                                    style={{ zIndex: 111 }}
                                  />
                                )}
                                <Text
                                  as={"span"}
                                  display={
                                    isDrawerOpen || openDrawerClick
                                      ? "flex"
                                      : "none"
                                  }
                                  alignItems="center"
                                  overflow="hidden"
                                >
                                  {subMenuTitle}
                                </Text>
                              </NavLink>
                            </Box>
                          )
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                } else if (type === "title") {
                  return (
                    <Text
                      as={"span"}
                      key={index}
                      className="web-text-xxsmall fw-600 mt-1 text-secondary fw-bold me-2"
                      padding={0}
                      display={"flex"}
                      justifyContent={"end"}
                    >
                      {title}
                    </Text>
                  );
                } else if (type === "single") {
                  return (
                    <NavLink
                      key={index}
                      style={{
                        height: "auto",
                        position: "relative",
                        flexDirection: "row-reverse",
                      }}
                      className={`${
                        isDrawerOpen || openDrawerClick
                          ? "p-2 web-text-medium"
                          : "p-2 ps-0 web-text-xlarge justify-content-start"
                      } rounded-1 link d-flex align-items-center gap-2 w-100`}
                      to={path}
                    >
                      {Icon && <Icon className="web-text-large ms-2" />}
                      <Text
                        as={"span"}
                        display={
                          isDrawerOpen || openDrawerClick ? "flex" : "none"
                        }
                        alignItems="center"
                        overflow="hidden"
                      >
                        {title}
                      </Text>
                    </NavLink>
                  );
                } else {
                  return null;
                }
              })}
            </Accordion>
          </Box>

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
              left: -18,
              bottom: 28,
              zIndex: 99,
            }}
          >
            {isDrawerOpen || openDrawerClick ? (
              <ArrowRightIcon className="web-text-small " />
            ) : (
              <ArrowLeftIcon className="web-text-small" />
            )}
          </Button>
        </aside>
      ) : null}
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
