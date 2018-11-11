import { AircraftConfiguration } from '../views/PerformanceView';

export interface PlotSettings {
  xLabel: string;
  yLabel: string;
  xScale: number;
  yScale: number;
}

export type Equation = (config: AircraftConfiguration, airspeed: number[]) => number[];

export default class EquationPlot {
  constructor(
    public readonly title: string,
    protected readonly equation: Equation,
    public readonly settings?: PlotSettings, 
  ) {}

  public calculate(config: AircraftConfiguration, airspeed: number[]): number[] {
    return this.equation(config, airspeed);
  }
}
