"use client";

import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PieChartProps {
  labels: string[];
  series: number[];
}

const options = {
  legend: {
    labels: {
      colors: ["#fff", "#fff"],
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export function PieChart({ labels, series }: PieChartProps) {
  return (
    <div className="rounded-lg bg-zinc-800 p-4 text-white shadow-lg">
      <ApexChart
        options={{ labels, ...options }}
        series={series}
        type="pie"
        width={380}
        height={380}
      />
    </div>
  );
}
