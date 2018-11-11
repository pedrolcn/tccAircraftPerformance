import EquationPlot, { Equation } from './Base';
import { AircraftConfiguration } from 'views/PerformanceView';

const turnRate: Equation = (config: AircraftConfiguration, airspeed: number[]) => {
  const { loadFactor } = config;
  const G = 9.81;

  return airspeed.map(v => (G / v) * Math.sqrt(loadFactor ** 2 - 1));
};

export default new EquationPlot('Razão de Curva', turnRate);
