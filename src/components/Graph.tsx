import * as React from 'react';
import EquationPlot from 'equations/Base';
import { rangeInclusive } from '../util/FunctionUtils';
import { AircraftConfiguration } from 'views/PerformanceView';

// Create React component from custom bundle to reduce size
const CreatePlotlyComponent = require('react-plotly.js/factory');
const Plotly = require('plotly.js-basic-dist');
const Plot = CreatePlotlyComponent(Plotly);

export interface PlotProps {
  vMin: number;
  vMax: number;
  deltaV: number;
  equations: EquationPlot[];
  configs: AircraftConfiguration[];
}

const plot: React.StatelessComponent<PlotProps> = ({ equations, configs,  vMin, vMax, deltaV }) => {
  const equation = equations[0];
  const airspeed = rangeInclusive(vMin, vMax, deltaV);

  return <Plot
      data={
        configs.map((config, idx) => ({
          x: airspeed,
          y: equation.calculate(config, airspeed),
          type: 'scatter',
          mode: 'lines+markers',
          name: (idx + 1).toString(),
        } as Partial<Plotly.Data>))
      }
      layout={{ autosize: true, title: equation.title }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
      config={{
        modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'hoverCompareCartesian', 'toggleSpikelines'],
      }}
    />;
};

export default plot;
