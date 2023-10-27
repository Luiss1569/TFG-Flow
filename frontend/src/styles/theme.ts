import { extendTheme } from "@chakra-ui/react";
import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "#3CB371",
      color: "#3CB371",
    },
    solid: {
      bg: "#3CB371",
      color: "white",
      _hover: { bg: "green_dark" },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});

const customTheme = {
  fonts: {
    heading: `'Rubik', sans-serif`,
    body: `'Rubik', sans-serif`,
  },
  components: {
    Text: {
      variants: {
        title: {
          fontWeight: "semibold",
          fontSize: "14px",
        },
      },
    },
    Button,
  },
  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.500",
      primary: {
        default: "#E0E0E0",
        _dark: "#121214",
      },
      secondary: {
        default: "#F5F5F5",
        _dark: "#29292E",
      },
      green_light: "#3CB371",
      green_dark: "#329961",
      white: {
        default: "#FFFFFF",
        _dark: "#202024",
      },
      gray: {
        100: {
          default: "#F5F5F5",
          _dark: "#29292E",
        },
        200: {
          default: "#E0E0E0",
          _dark: "#29292E",
        },
        300: {
          default: "#BDBDBD",
          _dark: "#29292E",
        },
        400: {
          default: "#9E9E9E",
          _dark: "#29292E",
        },
        500: {
          default: "#757575",
          _dark: "#29292E",
        },
        600: {
          default: "#616161",
          _dark: "#29292E",
        },
        700: {
          default: "#424242",
          _dark: "#29292E",
        },
      },
      icons: {
        100: {
          default: "#F5F5F5",
          _dark: "#29292E",
        },
        200: {
          default: "#E0E0E0",
          _dark: "#29292E",
        },
        300: {
          default: "#BDBDBD",
          _dark: "#29292E",
        },
        400: {
          default: "#9E9E9E",
          _dark: "#363636",
        },
        500: {
          default: "#757575",
          _dark: "#A7A6A6",
        },
        600: {
          default: "#616161",
          _dark: "#EEEEEE",
        },
        700: {
          default: "#424242",
          _dark: "#FFFFFF",
        },
      },
    },
  },
};

const Theme = extendTheme(customTheme);

export type ThemeType = typeof customTheme;

export default Theme;
