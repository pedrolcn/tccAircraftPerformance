import { AircraftConfiguration } from '../views/PerformanceView';

export interface PlotSettings {
  xLabel: string;
  yLabel: string;
  xScale: number;
  yScale: number;
}

export type Equation = (config: AircraftConfiguration, xCoordinate: number[]) => number[];

export default class EquationPlot {
  constructor(
    public readonly title: string,
    protected readonly equation: Equation,
    public readonly settings?: PlotSettings, 
  ) {}

  public calculate(config: AircraftConfiguration, xCoordinate: number[]): number[] {
    return this.equation(config, xCoordinate);
  }
}
