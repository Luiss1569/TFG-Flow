import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BarChartProps extends React.ComponentProps<typeof BarChart> {
  xKey: string;
  yKey: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({
  xKey,
  yKey,
  ...rest
}) => {
  const lineColor = useColorModeValue("#38A169", "#68D391");
  const textColor = useColorModeValue("black", "white");

  return (
    <BarChart width={500} height={300} {...rest}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} stroke={textColor} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={yKey} fill={lineColor} />
    </BarChart>
  );
};

export default BarChartComponent;
