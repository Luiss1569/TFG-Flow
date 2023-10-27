import { useColorMode } from "@chakra-ui/react";
import React, { useMemo } from "react";
import Select, { Props as SelectProps, StylesConfig } from "react-select";

interface Props extends SelectProps {}

const MultiSelect: React.FC<Props> = ({ options, ...rest }) => {
  const { colorMode } = useColorMode();

  const borderColor = colorMode === "light" ? "#cbd5e0" : "#4a5568";
  const backgroundColor = colorMode === "light" ? "#fff" : "#29292E";
  const backgroundColorSelected = colorMode === "light" ? "#BDBDBD" : "#363636";
  const backgroundColorHover = colorMode === "light" ? "#BDBDBD" : "#363636";
  const color = colorMode === "light" ? "#000" : "#fff";

  const styles: StylesConfig = useMemo(() => {
    return {
      control: (provided) => ({
        ...provided,
        borderColor: "none",
        backgroundColor: "none",
        borderRadius: "0.375rem",
        boxShadow: "none",
        "&:hover": {
          borderColor: borderColor,
        },
        "&:focus": {
          borderColor: borderColor,
        },
      }),
      menu: (provided) => ({
        ...provided,
        borderRadius: "0.375rem",
        boxShadow: "none",
        backgroundColor: backgroundColor,
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? backgroundColorSelected
          : backgroundColor,
        color: color,
        "&:hover": {
          backgroundColor: backgroundColorHover,
          color: color,
        },
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: backgroundColorSelected,
        color: color,
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: color,
      }),
    };
  }, [
    borderColor,
    backgroundColor,
    backgroundColorSelected,
    backgroundColorHover,
    color,
  ]);

  return <Select isMulti options={options} {...rest} styles={styles} />;
};

export default MultiSelect;
