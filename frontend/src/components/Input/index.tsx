import { FormControl, FormLabel, Input as ChakraInput } from "@chakra-ui/react";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type?: string;
  isRequired?: boolean;
};

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (rest, ref) => {
    const { id, placeholder, label, type = "text", isRequired = true } = rest;

    return (
      <FormControl isRequired={isRequired}>
        <FormLabel htmlFor={id}>{label}</FormLabel>

        <ChakraInput
          ref={ref}
          {...rest}
          id={id}
          placeholder={placeholder}
          type={type}
          size="md"
        />
      </FormControl>
    );
  }
);

// export function InputComponent({
//   label,
//   type = "text",
//   isRequired = true,
//   ...rest
// }: InputProps) {
//   const { id, placeholder } = rest;

//   return (
//     <FormControl isRequired={isRequired}>
//       <FormLabel htmlFor={id}>{label}</FormLabel>

//       <ChakraInput
//         {...rest}
//         id={id}
//         placeholder={placeholder}
//         type={type}
//         size="md"
//       />
//     </FormControl>
//   );
// }
