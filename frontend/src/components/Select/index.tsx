import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { SelectHTMLAttributes, forwardRef } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Array<{ value: string; label: string }>;
  isRequired?: boolean;
};

export const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
  (rest, ref) => {
    const { label, options, id, isRequired } = rest;

    return (
      <FormControl isRequired={isRequired}>
        <FormLabel htmlFor={id}>{label}</FormLabel>

        <ChakraSelect ref={ref} {...rest} placeholder="Selecione" size="md">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ChakraSelect>
      </FormControl>
    );
  }
);
