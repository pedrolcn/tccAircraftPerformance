import * as React from 'react';
import Plot from 'react-plotly.js';

export interface PlotProps {
  airspeed: number[];
  sinkRate: number[];
}

const plot: React.StatelessComponent<PlotProps> = (props) => {
  const { airspeed, sinkRate } = props;
  return (
    <Plot
      data={[
        {
          x: airspeed,
          y: sinkRate,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ]}
      layout={{ autosize: true, title: 'A Fancy Plot' }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
      config={{
        modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'hoverCompareCartesian', 'toggleSpikelines', 'zoom2d'],
      }}
    />
  );
};

export default plot;
