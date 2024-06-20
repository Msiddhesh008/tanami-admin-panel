import { useToast } from "@chakra-ui/react";

export const toaster = () => {
  const toast = useToast();

  return toast({
    title: "Loged In",
    status: "success",
    isClosable: true,
  });
}