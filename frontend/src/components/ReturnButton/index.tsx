import React, { useCallback } from "react";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";

interface ReturnButtonProps extends ButtonProps {
  icon?: IconType;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({
  icon = BiArrowFromRight,
  ...rest
}) => {
  const history = useNavigate();

  const handleReturn = useCallback(() => {
    history(-1);
  }, [history]);

  return (
    <Button
      leftIcon={<Icon as={icon} />}
      colorScheme="blue"
      variant="outline"
      onClick={handleReturn}
      {...rest}
    >
      Voltar
    </Button>
  );
};

export default ReturnButton;
