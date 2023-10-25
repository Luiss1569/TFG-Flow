import { extendTheme } from "@chakra-ui/react";
import { defineStyleConfig } from '@chakra-ui/react'


const Button = defineStyleConfig({
  variants: {
    outline: {
      border: '2px solid',
      borderColor: '#3CB371',
      color: '#3CB371',
    },
    solid: {
      bg: '#3CB371',
      color: 'white',
      _hover: {bg: 'green_dark'},
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
})


const customTheme = {
  fonts: {
    heading: `'Rubik', sans-serif`,
    body: `'Rubik', sans-serif`,
  },
  components: {
    Text: {
      variants: {
        title: {
          fontWeight: 'semibold',
          fontSize: '14px',
        }
      }
    },
    Button
  },
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: {
        default: '#E0E0E0',
        _dark: '#121214',
      },
      secondary: {
        default: '#F5F5F5',
        _dark: '#29292E',
      },
      green_light: '#3CB371',
      green_dark:'#329961'
    },
  },
};

const Theme = extendTheme(customTheme);

export default Theme;