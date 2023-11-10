import { Button as ChacButton, ButtonProps } from "@chakra-ui/react";

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChacButton backgroundColor="black" textColor="white" {...rest}>
      {children}
    </ChacButton>
  );
}
