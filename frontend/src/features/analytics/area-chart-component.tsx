"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartData {
  month: string;
  [key: string]: string | number;
}

interface AreaChartComponentProps {
  data: ChartData[];
  config: ChartConfig;
}

export function AreaChartComponent({ data, config }: AreaChartComponentProps) {
  // Define the tooltip content using proper types
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${config[entry.dataKey as string].label}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={310}>
      <AreaChart
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis hide />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        {Object.keys(config).map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            fill={config[key].color}
            fillOpacity={0.4}
            stroke={config[key].color}
            stackId="a"
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
