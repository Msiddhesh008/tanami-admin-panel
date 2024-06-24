import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { OPACITY_ON_LOAD } from "../../Layout/animations";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFaqByIdQuery,
  useUpdateFaqMutation,
} from "../../Services/api.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TiWarning } from "react-icons/ti";
import { addFaq } from "../../Validations/Validations";
import FullscreenLoaders from "../../Components/Loaders/FullscreenLoaders";
import ToastBox from "../../Components/ToastBox";
import ReactQuill from "react-quill";

const EditFaq = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetFaqByIdQuery(id);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [updateFaq] = useUpdateFaqMutation();
  const [valueQuill, setValueQuill] = useState(data?.data?.answer);

  // console.log(data);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addFaq),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      setValue("question", data?.data?.question);
      setValueQuill(data?.data?.answer || ""); // Set initial value for Quill
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    if (!valueQuill || valueQuill.trim() === "") {
      toast({
        render: () => (
          <ToastBox status={"error"} message={"Answer cannot be empty"} />
        ),
      });
      return;
    }

    setIsLoadingEdit(true);
    const updatedData = {
      ...formData,
      answer: valueQuill, // Include the value from ReactQuill
    };

    await updateFaq({ id, data: updatedData })
      .then((response) => {
        if (response?.data?.statusCode === 200) {
          setIsLoadingEdit(false);
          toast({
            render: () => (
              <ToastBox status={"success"} message={response?.data?.message} />
            ),
          });

          reset();
          navigate("/faq");
        } else {
          setIsLoadingEdit(false);
          toast({
            render: () => (
              <ToastBox status={"error"} message={"Something went wrong"} />
            ),
          });
        }
      })
      .catch((error) => {
        // console.error("Error updating FAQ:", error);
        setIsLoadingEdit(false);
      });
  };

  if (isLoading) {
    return <FullscreenLoaders />;
  }

  return (
    <Box
      {...OPACITY_ON_LOAD}
      overflowY={"scroll"}
      paddingBottom={50}
      height={"100vh"}
    >
      <Header title={"FAQ"} />

      <Box display={"flex"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-7 pt-4 mb-3 overflow-auto p-4"
        >
          <FormControl isRequired className="mb-3">
            <FormLabel className="web-text-large fw-bold rubix-text-dark">
              Title
            </FormLabel>
            <Input
              {...register("question")}
              placeholder="Question"
              className="web-text-medium"
              size="sm"
              minLength={4}
                  errorBorderColor="crimson"
                  isInvalid={watch()?.question?.length > 50}
                  // maxLength={51}
                />
                <FormHelperText
                  color={watch()?.question?.length > 50 ? "red" : "gray.500"}
                  className="web-text-small"
                >
                  If question crosses 50 characters it will cause problem in
                  alignment on website.you have entered {watch()?.question?.length}{" "}
                  characters
                </FormHelperText>
            {errors.question && (
              <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
                <TiWarning className="fw-bold fs-5 " />{" "}
                {errors.question.message}
              </span>
            )}
          </FormControl>

          <FormControl isRequired className="mb-3">
            <ReactQuill
              className="rounded-3"
              theme="snow"
              value={valueQuill}
              onChange={setValueQuill}
            />
          </FormControl>

          <Box className="d-flex justify-content-end">
            <Button
              isLoading={isLoadingEdit}
              color={"whitesmoke"}
              backgroundColor={"purple.900"}
              _hover={{
                backgroundColor: "purple.800",
              }}
              type="submit"
              size="sm"
              rounded={"sm"}
            >
              Save edit
            </Button>
          </Box>
          <Divider />
        </form>
      </Box>
    </Box>
  );
};

export default EditFaq;
