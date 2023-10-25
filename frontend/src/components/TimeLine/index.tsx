import {
  Box,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { GoWorkflow, GoCheck } from "react-icons/go";

interface MilestoneItemProps extends BoxProps {
  icon?: ReturnType<typeof GoWorkflow>;
  boxProps?: BoxProps;
  skipTrail?: boolean;
  isStep?: boolean;
}

export const MilestoneItem: React.FC<MilestoneItemProps> = ({
  isStep = false,
  icon = isStep ? GoCheck : GoWorkflow,
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  const color = useColorModeValue("gray.700", "gray.500");
  return (
    <Flex {...props} minH={"5rem"}>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        mr={4}
        ml={isStep ? 2 : 0}
        pos="relative"
      >
        <Circle
          size={isStep ? 8 : 12}
          bg={useColorModeValue("gray.200", "gray.700")}
          opacity={useColorModeValue(0.5, 0.8)}
        />
        <Box
          as={icon}
          size={isStep ? "0.75rem" : "1.25rem"}
          color={color}
          pos="absolute"
          left={isStep ? "0.625rem" : "0.875rem"}
          top={isStep ? "0.625rem" : "0.875rem"}
        />
        {!skipTrail && <Box w="1px" flex={1} bg={"gray"} my={1} />}
      </Flex>
      <Box {...boxProps} pb={5}>
        {children}
      </Box>
    </Flex>
  );
};

export const MilestoneEnd: React.FC<MilestoneItemProps> = ({
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  return (
    <Flex {...props}>
      <Flex
        flexDir="column"
        alignItems="start"
        justifyContent="start"
        mr={4}
        ml={4}
        pos="relative"
      >
        <Circle
          size={4}
          bg={useColorModeValue("gray.400", "gray.700")}
          opacity={useColorModeValue(0.5, 0.8)}
        />
        {!skipTrail && <Box w="1px" flex={1} bg={"gray"} my={1} />}
      </Flex>
      <Box {...boxProps}>{children}</Box>
    </Flex>
  );
};
