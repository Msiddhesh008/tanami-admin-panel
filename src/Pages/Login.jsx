import { useNavigate } from "react-router-dom";
import Input01 from "../Components/Inputs/Input01";
import logo from "../assets/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Slice/auth";
import { useContext, useEffect, useState } from "react";
import Button01 from "../Components/Buttons/Button01";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TiWarning } from "react-icons/ti";
import Loader01 from "../Components/Loaders/Loader01";
import Asset1 from "../assets/asset1.png";
import Asset2 from "../assets/asset2.png";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import Cookies from "js-cookie";
import { validationSchema } from "../Validations/Validations";
import ToastBox from "../Components/ToastBox";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { isAuthenticate, setIsAuthenticate } = useContext(GlobalStateContext);
  const toast = useToast();
  // const { isAuthenticate } = useSelector((state) => state?.auth);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [navigate, isAuthenticate]);

  const onSubmit = (value) => {
    setIsLoading(true);
    if (value.name === "Admin" && value.password === "Admin") {
      return setTimeout(() => {
        // dispatch(loginUser(true));
        setIsAuthenticate(true);
        setIsLoading(false);
        toast({
          render: () => (
            <ToastBox status={"success"} message={"Login Successfully"} />
          ),
        });

        Cookies.set("isAuthenticated", true, { expires: 7 });
        navigate("/");
      }, 2000); // 3-second delay
    } else {
      return setTimeout(() => {
        // dispatch(loginUser(true));
        setIsAuthenticate(false);
        setIsLoading(false);

        toast({
          render: () => (
            <ToastBox status={"error"} message={"Invalid credentials"} />
          ),
        });
        reset();
        navigate("/login");
      }, 2000);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor:"#0041180A"
      }}
      className="rubix-primary"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "90%",
          maxWidth: "450px",
          height: "auto",
          background: "#fff",
          borderRadius: "10px",
          padding: "1.5rem",
          // boxShadow: "0 24px 64px #26214a1a",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          zIndex: 2,
        }}
      >
        <div className="d-flex flex-column mb-4">
          <img
            style={{
              left: "8px",
              top: "8px",
              // width: "10%",
              maxWidth: "130px",
            }}
            src={logo}
            alt="img"
            className="mb-4"
          />
          <span className="fw-bold fs-2 rubix-text-dark text-start">
            Welcome back.
          </span>
          <span className="fw-500  web-text-large text-secondary text-start">
            Login to manage tanami.
          </span>
        </div>

        <FormControl className=" mb-3">
          <FormLabel className="rubix-text-dark ps-1 web-text-medium fw-bold">
            Owner name <span className="text-danger">*</span>
          </FormLabel>

          <Input
            {...register("name")}
            focusBorderColor="green.500"
            type="text"
            name="name"
            variant="filled"
            placeholder="Owner name"
            size="lg"
            className="web-text-medium"
          />
          {errors.name && (
            <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
              <TiWarning className="fw-bold fs-5 " /> {errors.name.message}
            </span>
          )}
        </FormControl>

        <FormControl className="mb-4">
          <FormLabel className="rubix-text-dark ps-1 web-text-medium fw-bold">
            Password <span className="text-danger">*</span>
          </FormLabel>

          <InputGroup size="lg">
            <Input
              {...register("password")}
              className="web-text-medium"
              focusBorderColor="green.500"
              variant="filled"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                fontSize={"xs"}
                color={"green.800"}
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
              <TiWarning className="fw-bold fs-5 " /> {errors.password.message}
            </span>
          )}
        </FormControl>

        <Button
          isLoading={isLoading}
          spinner={<Loader01 />}
          type="submit"
          className="w-100 primary-btn"
          color={"whitesmoke"}
          colorScheme="green.500"
          size="lg"
        >
          Log In
        </Button>
      </form>

      <div
        style={{
          position: "absolute",
          bottom: "0%",
          fontSize: "13px",
          color: "#919191",
          textAlign: "center",
          width: "100%",
          zIndex: 2,
        }}
      >
        Tanami v1.0.0
      </div>

      {/* <img
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          // width:100
        }}
        src={Asset1}
        alt="bg-img"
      />

      <img
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          // width:400
        }}
        src={Asset2}
        alt="bg-img"
      /> */}

      <img
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 150,
        }}
        src={Asset1}
        alt="bg-img"
      />

      {/* <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src={Asset1}
        alt="bg-img"
      /> */}
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src={Asset2}
        alt="bg-img"
      />
    </div>
  );
};

export default Login;
