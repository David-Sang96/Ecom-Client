/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { productSaleQuery } from "@/api/query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  Books: {
    label: "Books",
    color: "var(--chart-1)",
  },
  Clothing: {
    label: "Clothing",
    color: "var(--chart-2)",
  },
  Electronics: {
    label: "Electronics",
    color: "var(--chart-3)",
  },
  Kitchen: {
    label: "Kitchen",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function Chart() {
  const { data, isLoading, isError, error } = useQuery(productSaleQuery());

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }
    return days; //2025-05-25
  };

  const last7Days = getLast7Days();
  const sales = data.sales || [];
  const categories = ["Books", "Clothing", "Electronics", "Kitchen"];

  // Make array with zero sales for every day and category
  const chartData = last7Days.map((date) => {
    const obj = { date };
    categories.forEach((cat) => {
      obj[cat] = 0;
    });
    return obj;
  });

  sales.forEach((sale: any) => {
    const { category, date } = sale._id;
    const dayData = chartData.find((d) => d.date === date);
    if (dayData && categories.includes(category)) {
      dayData[category] = sale.totalSold;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Chart</CardTitle>
        <CardDescription>
          Showing total users purchasement of last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "long",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="Books"
              type="natural"
              fill={chartConfig["Books"].color}
              stroke={chartConfig["Books"].color}
              fillOpacity={0.4}
              // stackId="a"
            />
            <Area
              dataKey="Clothing"
              type="natural"
              fill={chartConfig["Clothing"].color}
              stroke={chartConfig["Clothing"].color}
              fillOpacity={0.4}
              // stackId="a"
            />
            <Area
              dataKey="Electronics"
              type="natural"
              fill={chartConfig["Electronics"].color}
              stroke={chartConfig["Electronics"].color}
              fillOpacity={0.4}
              // stackId="a"
            />
            <Area
              dataKey="Kitchen"
              type="natural"
              fill={chartConfig["Kitchen"].color}
              stroke={chartConfig["Kitchen"].color}
              fillOpacity={0.4}
              // stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
