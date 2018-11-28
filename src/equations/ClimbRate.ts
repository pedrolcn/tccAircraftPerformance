import EquationPlot, { Equation } from './Base';
import { AircraftConfiguration, Motorizations } from '../views/PerformanceView';
import { AtmosIsa } from '../util';

const climbRate: Equation = (config: AircraftConfiguration, xCoordinate: number[]): number[] => {
  const { h , dragCD0, dragK, W, S, T0orP0, motorization } = config;
  const rho = AtmosIsa.density(h);

  if (motorization === Motorizations.JET) {
    // xCoordinate is airspeed
    return xCoordinate.map(v => 
      T0orP0 * v / W - ((rho * v * v * v * dragCD0 * S) / (2 * W)  + 2 * dragK * W / (S * rho * v)),
    );
  }
  
  if (motorization === Motorizations.PROPELER) {
    // xCoordinate is airspeed
    return xCoordinate.map(v => 
      T0orP0 / W - ((rho * v * v * v * dragCD0 * S) / (2 * W)  + 2 * dragK * W / (S * rho * v)),
    );
  }

  return [];
};

export default new EquationPlot('Velocidade de subida', climbRate);
