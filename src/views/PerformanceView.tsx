import * as React from 'react';
import { Container, Col, Row, Nav, NavItem, NavLink } from 'reactstrap';
import { Inputs, Plot } from '../components';
import AtmosIsa from '../util/atmosphere';

export interface PerformanceViewProps {}
export interface PerformanceViewState {
  airspeed: number[];
  config: any;
}

export interface AircraftConfiguration {
  dragK: number;
  dragCD0: number;
  W: number;
  S: number;
}

export default class PerformanceView extends React.Component<PerformanceViewProps, PerformanceViewState> {
  constructor(props: PerformanceViewProps) {
    super(props);

    this.state = {
      airspeed: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      config: {
        dragCD0: 0, // 0.01805,
        dragK: 0, // 0.05627,
        S: 0, // 153,
        W: 0, // 588600,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event: React.FormEvent<HTMLInputElement>) {
    const { config } = this.state;
    config[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ config });
  }

  calculateSinkRate(h: number) {
    const { dragK, dragCD0, S, W } = this.state.config;
    const rho = AtmosIsa.density(h);

    return this.state.airspeed.map(v => ((rho * S * dragCD0 * v ** 3) / (2 * W) + (2 * dragK * W) / (rho * v * S)));
  }

  render() {
    return (
      <main role="main">
        <Container>
          <Row>
            <Col xs="3">
              <Inputs 
                changeHandler={this.handleChange}
                config={this.state.config}
              />
            </Col>
            <Col xs="9">
              <Plot
                airspeed={this.state.airspeed}
                sinkRate={this.calculateSinkRate(0)}
              />
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
