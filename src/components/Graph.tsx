import * as React from 'react';

// Create React component from custom bundle to reduce size
const CreatePlotlyComponent = require('react-plotly.js/factory');
const Plotly = require('plotly.js-basic-dist');
const Plot = CreatePlotlyComponent(Plotly);

export interface PlotProps {
  airspeed: number[];
  data: number[][];
}

const plot: React.StatelessComponent<PlotProps> = ({ airspeed, data }) => {
  return <Plot
      data={data.map((d, idx) => (
      {
        x: airspeed,
        y: d,
        type: 'scatter',
        mode: 'lines+markers',
        name: (idx + 1).toString(),
      } as Partial<Plotly.Data>
      ))}
      layout={{ autosize: true, title: 'Sink Rate vs Airspeed' }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
      config={{
        modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'hoverCompareCartesian', 'toggleSpikelines'],
      }}
    />;
};

export default plot;
