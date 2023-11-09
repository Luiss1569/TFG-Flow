import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

interface IShowToast {
  title: string;
  description: string;
}

export function useUtils() {
  const toast = useToast();

  const showToastSuccess = ({ title, description }: IShowToast) => {
    toast({
      title,
      description,
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top-right",
      icon: <UnlockIcon />,
    });
  };
  const showToastError = ({ title, description }: IShowToast) => {
    toast({
      title,
      description,
      duration: 3000,
      isClosable: true,
      status: "error",
      position: "top-right",
      icon: <LockIcon />,
    });
  };

  return {
    showToastSuccess,
    showToastError,
  };
}
