import EquationPlot, { Equation } from './Base';
import AtmosIsa from 'util/Atmosphere';
import { AircraftConfiguration } from 'views/PerformanceView';

const sinkRate: Equation = (config: AircraftConfiguration, xCoordinate: number[]) => {
  const { dragK, dragCD0, S, W, h } = config;
  const rho = AtmosIsa.density(h);

  // xCoordinate is airspeed
  return xCoordinate.map((v) => {
    const q = 0.5 * rho * (v ** 2);
    const CL = W / (S * q);
    const CD = dragCD0 + dragK * (CL ** 2);
    const D = S * CD * q;

    return - D * v / W;
  });
};

export default new EquationPlot('Sink Rate', sinkRate);
