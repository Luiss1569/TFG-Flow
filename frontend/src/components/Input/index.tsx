/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormLabel, Input as ChakraInput } from "@chakra-ui/react";
import { InputHTMLAttributes, forwardRef } from "react";
import InputMask from "react-input-mask";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  mask?: string;
  type?: string;
  isRequired?: boolean;
};

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (rest, ref) => {
    const {
      id,
      placeholder,
      label,
      type = "text",
      isRequired = true,
      mask,
    } = rest;

    return (
      <FormControl isRequired={isRequired}>
        <FormLabel htmlFor={id}>{label}</FormLabel>

        <ChakraInput
          ref={ref}
          {...rest}
          as={mask ? InputMask : undefined}
          id={id}
          placeholder={placeholder}
          type={type}
          size="md"
        />
      </FormControl>
    );
  }
);
