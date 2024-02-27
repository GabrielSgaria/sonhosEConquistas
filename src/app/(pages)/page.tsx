import { ChartsGrid } from "@/components/charts-grid";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Suspense fallback={<p>Carregando...</p>}>
        <ChartsGrid />
      </Suspense>
    </div>
  );
}
