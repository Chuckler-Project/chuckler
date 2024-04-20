import * as Plot from "@observablehq/plot";
import {createElement as h} from "react";

const PlotFigure = ({options}) => {
  return Plot.plot({...options, document: new Document()}).toHyperScript();
}

export default PlotFigure;