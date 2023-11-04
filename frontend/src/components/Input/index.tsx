/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button as ChakraButton,
  Input as ChakraInput,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa"; // Adicionando ícones de olho

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isRequired?: boolean;
  isSearch?: boolean;
};

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      placeholder,
      label,
      type = "text",
      isRequired = false,
      isSearch = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(type === "password");

    const handleTogglePassword = () => setShowPassword(!showPassword);

    return (
      <FormControl isRequired={isRequired}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <InputGroup size="md">
          {isSearch && (
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
          )}
          <ChakraInput
            ref={ref}
            {...rest}
            id={id}
            placeholder={placeholder}
            type={!showPassword ? "text" : type}
            size="md"
          />
          {type === "password" && (
            <InputRightElement width="4.5rem">
              <ChakraButton
                h="1.75rem"
                size="sm"
                onClick={handleTogglePassword}
              >
                {showPassword ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
              </ChakraButton>
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    );
  }
);
