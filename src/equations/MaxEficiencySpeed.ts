import EquationPlot, { Equation } from './Base';
import { AircraftConfiguration } from '../views/PerformanceView';
import { AtmosIsa } from '../util';

const maxEficiencySpeed: Equation = (config: AircraftConfiguration, xCoordinate: number[]) => {
  const { dragK, dragCD0Cruise, S, Wmax } = config;
  
  return xCoordinate.map((h) => {
    const rho = AtmosIsa.density(h);
    const a = AtmosIsa.soundSpeed(h);
    const CL = Math.sqrt(dragCD0Cruise / dragK);
      
    return Math.sqrt(2 * Wmax / (rho * S * CL)) / a;
  });
};

export default new EquationPlot(
  'Mach de Cruzeiro vs Altitude',
  maxEficiencySpeed,
  { xLabel: 'Altitude [m]', yLabel: 'M', xScale: 100 },
);
