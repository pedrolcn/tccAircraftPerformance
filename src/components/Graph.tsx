import * as React from 'react';
import EquationPlot, { Equation } from 'equations/Base';
import { Nav, TabContent, TabPane, NavItem, NavLink } from 'reactstrap';
import { rangeInclusive } from '../util/FunctionUtils';
import { AircraftConfiguration } from 'views/PerformanceView';
import { FormData } from 'ecv-validation';

// Create React component from custom bundle to reduce size
const CreatePlotlyComponent = require('react-plotly.js/factory');
const Plotly = require('plotly.js-basic-dist');
const Plot = CreatePlotlyComponent(Plotly);

export interface GraphProps {
  vMin: number;
  vMax: number;
  deltaV: number;
  equations: EquationPlot[];
  configs: FormData<AircraftConfiguration>[];
}

export interface GraphState {
  activeTab: number;
}

export default class Graph extends React.Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.toggleActiveTab = this.toggleActiveTab.bind(this);
  }

  toggleActiveTab(idx: number) {
    return () => {
      this.setState({ activeTab: idx });
    };
  }

  renderNavTabs() {
    const { activeTab } = this.state;
    const { equations } = this.props;

    return equations.map((eq, idx) => {
      return (
        <NavItem key={idx}>
          <NavLink active={idx === activeTab} onClick={this.toggleActiveTab(idx)}>
            {eq.title}
          </NavLink>
        </NavItem>
      );
    });
  }

  preprocessPlot(equation: EquationPlot, configs: FormData<AircraftConfiguration>[], xCoordinate: number[]) {
    const { settings } = equation;
    const transformedX = xCoordinate.map(x => x * settings.xScale);

    const data = configs.map((config, idx) => ({
      x: settings.overideX ? settings.overideX(config.values) : transformedX,
      y: equation ? equation.calculate(config.values, transformedX) : Array(xCoordinate.length).fill(null),
      type: 'scatter',
      mode: 'lines+markers',
      name: (idx + 1).toString(),
    } as Plotly.Data));

    const layout = {
      autosize: true,
      title: equation ? equation.title : undefined,
      xaxis: {
        title: settings.xLabel,
      },
      yaxis: {
        title: settings.yLabel,
      },
    } as Plotly.Layout;

    return { data, layout }; 
  }

  renderPlots() {
    const { vMin, vMax, deltaV, configs, equations } = this.props;
    const xCoordinate = rangeInclusive(vMin, vMax, deltaV);
  
    return equations.map((eq, idx) => {
      const { data, layout } = this.preprocessPlot(eq, configs, xCoordinate);

      return (
        <TabPane tabId={idx} key={idx} style={{ height: '100%' }}>
          <Plot
            data={data}
            layout={layout}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler
            config={{
              modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'hoverCompareCartesian', 'toggleSpikelines'],
            }}
          />
        </TabPane>
      );
    });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <React.Fragment>
        <Nav tabs id="nav-tab" role="tablist">
          {this.renderNavTabs()}
        </Nav>
        <TabContent activeTab={activeTab} className="graph-tab">
          {this.renderPlots()}
        </TabContent>
      </React.Fragment>
    );
  }
}
