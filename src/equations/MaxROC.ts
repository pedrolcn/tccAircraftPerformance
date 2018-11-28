import EquationPlot, { Equation } from './Base';
import { AircraftConfiguration, Motorizations } from '../views/PerformanceView';
import { AtmosIsa } from '../util';

const maxROC: Equation = (config: AircraftConfiguration, xCoordinate: number[]): number[] => {
  const { S, Wmax: W, T0orP0, dragCD0Cruise: CD0, dragK, motorization, engineN } = config;
  let out: number;
  const rhoZero = AtmosIsa.density(0);

  // xCoordinate is heigth
  return xCoordinate.map((h) => {
    const rho = AtmosIsa.density(h);
    if (motorization === Motorizations.JET) {
      const adjustedT = T0orP0 * (rho / rhoZero) ** (engineN || 0);
      const vFC = Math.sqrt(adjustedT / (3 * rho * S * CD0) * (1 + Math.sqrt(1 + 3 * W * W / (4 * dragK * CD0  * adjustedT * adjustedT))));
      
      out = adjustedT * vFC / W - ((rho * vFC * vFC * vFC * CD0 * S) / (2 * W)  + 2 * dragK * W / (S * rho * vFC));
    }
    if (motorization === Motorizations.PROPELER) {
      const adjustedP = T0orP0 * (rho / rhoZero) ** (engineN || 0);
      const vFC = Math.sqrt(2 * W / (rho * S) * Math.sqrt(dragK / (3 * CD0)));
      out =  adjustedP / W - ((rho * vFC * vFC * vFC * CD0 * S) / (2 * W)  + 2 * dragK * W / (S * rho * vFC));
    }

    return out;
  });
};

export { maxROC };
export default new EquationPlot('ROC vs Altitude', maxROC, { xLabel: 'Altitude [m]', yLabel: 'ROC [m/s]', xScale: 100 });
