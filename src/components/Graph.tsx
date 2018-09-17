import * as React from 'react';
import Plot from 'react-plotly.js';

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
      layout={{ autosize: true, title: 'A Fancy Plot' }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
      config={{
        modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'hoverCompareCartesian', 'toggleSpikelines', 'zoom2d'],
      }}
    />;
};

export default plot;
