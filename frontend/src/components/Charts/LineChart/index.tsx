import { useColorModeValue } from "@chakra-ui/react";
import React, { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface LineChartProps extends React.ComponentPropsWithRef<typeof LineChart> {
  xKey: string;
  yKey: string;
}

const LineChartComponent: React.FC<LineChartProps> = ({
  xKey,
  yKey,
  ...rest
}) => {
  const lineColor = useColorModeValue("#38A169", "#68D391");
  const textColor = useColorModeValue("black", "white");

  return (
    <LineChart width={500} height={300} {...rest}>
      <XAxis dataKey={xKey} stroke={textColor} />
      <YAxis stroke={textColor} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={yKey} stroke={lineColor} />
    </LineChart>
  );
};

const LineChartMemo = memo(LineChartComponent);
export default LineChartMemo;
