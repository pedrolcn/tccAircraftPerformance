import EquationPlot, { Equation } from './Base';
import { AircraftConfiguration, Motorizations } from '../views/PerformanceView';
import { AtmosIsa } from '../util';

const takeoffDistance: Equation = (config: AircraftConfiguration, xCoordinate: number[]) => {
  const { S, Wmax: W0, CLMax, T0orP0, motorization, dragCD0Landing, dragK, engineN } = config;
  const rho0 = AtmosIsa.density(0);
  const Wmax = 0.85 * W0;

  return xCoordinate.map((h) => {
    const rho = AtmosIsa.density(h);
    const Vstall = Math.sqrt(2 * Wmax / (rho * S * CLMax));
    const Vtd = 1.1 * Vstall;
    const Va = 1.3 * Vstall;
    const T = 0.06 * (motorization === Motorizations.JET ? T0orP0 : T0orP0 / Va) * (rho / rho0) ** (engineN || 0);
    const G = 9.81;
    const mu = 0.5;
    const hObs = 15.24;

    const KT = T / Wmax - mu;
    const KA = rho * S / (2 * Wmax) * (mu * CLMax - dragCD0Landing - dragK * CLMax * CLMax);
    const gamma = 0.052;
    const R = Va * Va / (0.2 * G);
    const hTr = R * (1 - Math.cos(gamma));

    const SGB = 1 / (2 * G * KA) * Math.log(KT / (KT + KA * Vtd * Vtd));
    const SA = (hObs - hTr) / Math.tan(gamma);
    const SR = R * Math.sin(gamma);
    const SGT = 3 * 1.15 * Vstall;

    return 1.666 * (SGB + SA + SR + SGT);
  }).map(val => val > 0 ? val : NaN);
};

export default new EquationPlot(
  'Distância de Pouso vs Altitude',
  takeoffDistance,
  { xLabel: 'Altitude [m]', yLabel: 'Distância de Pouso [m]', xScale: 100 },
);
