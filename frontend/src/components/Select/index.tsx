import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { SelectHTMLAttributes, forwardRef } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Array<{ value: string; label: string }>;
};

export const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
  (rest, ref) => {
    const { label, options, id } = rest;

    return (
      <FormControl isRequired>
        <FormLabel htmlFor={id}>{label}</FormLabel>

        <ChakraSelect ref={ref} {...rest} size="md">
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

// export function SelectComponent({ label, options, ...rest }: SelectProps) {
//   const { id } = rest;

//   return (
//     <FormControl isRequired>
//       <FormLabel htmlFor={id}>{label}</FormLabel>

//       <ChakraSelect {...rest} size="md">
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </ChakraSelect>
//     </FormControl>
//   );
// }
