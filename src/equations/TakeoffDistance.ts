import EquationPlot, { Equation } from './Base';
import { AircraftConfiguration, Motorizations } from '../views/PerformanceView';
import { AtmosIsa } from '../util';

const takeoffDistance: Equation = (config: AircraftConfiguration, xCoordinate: number[]) => {
  const { S, Wmax, CLMax, T0orP0, motorization, dragCD0Takeoff, dragK, engineN } = config;
  const rho0 = AtmosIsa.density(0);

  return xCoordinate.map((h) => {
    const rho = AtmosIsa.density(h);
    const Vstall = Math.sqrt(2 * Wmax / (rho * S * CLMax));
    const Vr = 1.1 * Vstall;
    const Vtr = 1.15 * Vstall;
    const T = (motorization === Motorizations.JET ? T0orP0 : T0orP0 / Vr) * (rho / rho0) ** (engineN || 0);
    const G = 9.81;
    const mu = 0.04;
    const D = 0.5 * rho * Vr * Vr * S * (dragCD0Takeoff + dragK * CLMax * CLMax);
    const hObs = 15.24;

    const KT = T / Wmax - mu;
    const KA = rho * S / (2 * Wmax) * (mu * CLMax - dragCD0Takeoff - dragK * CLMax * CLMax);
    const gamma = Math.asin((T - D) / Wmax);
    const R = Vtr * Vtr / (0.2 * G);

    const SG = 1 / (2 * G * KA) * Math.log(1 + KA * Vr * Vr / KT);
    const ST = R * Math.sin(gamma);
    const SC = (hObs - R * (1 - Math.cos(gamma))) / Math.tan(gamma);

    return SG + ST + SC;
  }).map(val => val > 0 ? val : NaN);
};

export default new EquationPlot(
  'Distância de decolagem vs Altitude',
  takeoffDistance,
  { xLabel: 'Altitude [m]', yLabel: 'Distância de decolagem [m]', xScale: 100 },
);
