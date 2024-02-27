import { getHeritagesToChart } from "@/lib/actions";
import { PieChart } from "./pie-chart";

export async function ChartsGrid() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const { conquered, wanted } = await getHeritagesToChart();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <PieChart
        labels={["conquistados", "desejados"]}
        series={[conquered, wanted]}
      />
    </div>
  );
}
