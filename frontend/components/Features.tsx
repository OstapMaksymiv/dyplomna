"use client";
import * as React from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const Features = () => {
  return (
    <section className="flex flex-col gap-12 items-center pb-12">
      <div className="grid justify-around grid-cols-[repeat(2,700px)] grid-rows-[repeat(1,450px)]  gap-x-15 ">
        <ChartRadarLinesOnly />
        <ChartAreaDonutActive />
      </div>
      <Link href="/">
        <button
          style={{ boxShadow: "0px 10px 25px rgba(19,16,20,.5)" }}
          className="py-3.5 px-7 rounded-[2rem] bg-[rgba(19,16,20,.1)] text-black hover:bg-black hover:text-white transition-colors duration-700 cursor-pointer text-sm font-semibold "
        >
          Use them all
        </button>
      </Link>
    </section>
  );
};
export default Features;

const chartData = [
  { month: "January", desktop: 2000 },
  { month: "February", desktop: 4000 },
  { month: "September", desktop: 6000 },
  { month: "March", desktop: 7000 },
  { month: "April", desktop: 4000 },

  { month: "April", desktop: 4000 },
  { month: "June", desktop: 6000 },
  { month: "July", desktop: 6000 },
  { month: "December", desktop: 7000 },

  { month: "August", desktop: 4000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export function ChartAreaDonutActive() {
  return (
    <Card
      className=" text-white pb-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgb(19, 20, 21) 0%, rgb(5, 5, 5) 100%)",
        borderRadius: "1rem",
      }}
    >
      <CardHeader>
        <CardDescription className="text-gray-300">
          Income Line Chart
        </CardDescription>
        <CardTitle className="text-5xl">+2 350</CardTitle>
        <CardDescription className="text-gray-300">
          +180.1% from last month
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 ">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Area
              dataKey="desktop"
              type="natural"
              fill="#212121"
              fillOpacity={1}
              stroke="#fff"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ChartRadarLinesOnly() {
  return (
    <Card
      style={{
        background:
          "linear-gradient(180deg, rgb(19, 20, 21) 0%, rgb(5, 5, 5) 100%)",
      }}
      className=""
    >
      <CardHeader className="items-center pb-4 ">
        <CardTitle className="text-2xl">Chart of your costs</CardTitle>
        <CardDescription>
          Showing total income for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="text_change" indicator="line" />
              }
            />
            <PolarAngleAxis dataKey="month" tick={{ fill: "#ffffff" }} />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0}
              stroke="#000"
              strokeWidth={2}
            />
            <Radar
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0}
              stroke="var(--color-mobile)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-white">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
