import EquationPlot, { Equation, xOveride } from './Base';
import { AircraftConfiguration } from '../views/PerformanceView';

const rangePAyloadX: xOveride = (config: AircraftConfiguration) => {
  const { W0, Wf, Wmax, Wpl, dragCD0Cruise, dragK, TSFC } = config;
  const CL = Math.sqrt(dragCD0Cruise / dragK);
  const CD = dragCD0Cruise + dragK * CL * CL;

  const x2 = - CL / (1000 * CD * TSFC) * Math.log(1 - (Wmax - W0 - Wpl) / Wmax);
  const x3 = - CL / (1000 * CD * TSFC) * Math.log(1 - Wf / Wmax);
  const x4 = - CL / (1000 * CD * TSFC) * Math.log(1 - Wf / (W0 + Wf));

  return [0, x2, x3, x4];
};

const rangePayloadY: Equation = (config: AircraftConfiguration, xCoordinate: number[]) => {
  const { W0, Wf, Wmax, Wpl } = config;
  const G = 9.81;

  const y1 = Wpl / G;
  const y2 = y1;
  const y3 = (Wmax - W0 - Wf) / G;
  const y4 = 0;
  
  return [y1, y2, y3, y4];
};

export default new EquationPlot('Payload vs Range', rangePayloadY, { yLabel: 'Payload [Kg]', xLabel: 'Alcance [Km]', overideX: rangePAyloadX });
