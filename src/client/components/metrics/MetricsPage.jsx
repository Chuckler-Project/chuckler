import * as Plot from "@observablehq/plot";
import PlotFigure from "./PlotFigure.js";
import penguins from "./penguins.json";

const MetricsPage = () =>{
  return (
    <div>
      <h1>Penguins</h1>
      <PlotFigure
        options={{
          marks: [
            Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
          ]
        }}
      />
    </div>
  );
}