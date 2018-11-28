import { AircraftConfiguration } from '../views/PerformanceView';

export type xOveride = (config: AircraftConfiguration) => number[];

export interface PlotSettings {
  xLabel: string;
  yLabel: string;
  xScale: number;
  yScale: number;
  overideX?: xOveride;
}

export type Equation = (config: AircraftConfiguration, xCoordinate: number[]) => number[];

export default class EquationPlot {
  public readonly settings: PlotSettings;

  constructor(
    public readonly title: string,
    protected readonly equation: Equation,
    settings: Partial<PlotSettings>, 
  ) {

    this.settings = {
      overideX: settings.overideX || undefined,
      xLabel: settings.xLabel || 'TAS [m/s]',
      xScale: settings.xScale || 1,
      yLabel: settings.yLabel || '',
      yScale: settings.yScale || 1, 
    };
  }

  public calculate(config: AircraftConfiguration, xCoordinate: number[]): number[] {
    return this.equation(config, xCoordinate);
  }
}
