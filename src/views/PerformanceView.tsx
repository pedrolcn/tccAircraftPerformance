import * as React from 'react';
import { Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { Inputs, Plot } from '../components';
import AtmosIsa from '../util/atmosphere';

export interface PerformanceViewProps {}

export interface PerformanceViewState {
  airspeed: number[];
  config: any[];
  activeTab: number;
  h: number;
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
      config: [{
        dragCD0: 0, // 0.01805,
        dragK: 0, // 0.05627,
        S: 0, // 153,
        W: 0, // 588600,
      }],
      h: 0,
      activeTab: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.addNewTab = this.addNewTab.bind(this);
  }

  handleChange (idx: number) {
    return (event: React.FormEvent<HTMLInputElement>) => {
      const { config } = this.state;
      const { name } = event.currentTarget;

      if (name === 'h') {
        this.setState({ h: parseInt(event.currentTarget.value, 10) });
      } else {
        config[idx][name] = event.currentTarget.value;
        this.setState({ config });
      }
    };
  }

  addNewTab() {
    const { config , activeTab } = this.state;

    // Need to perform deep copy, otherwise new config entry points to the same object
    config.push(Object.assign({}, config[activeTab]));
    
    this.setState({ config, activeTab: config.length - 1 });
  }

  calculateSinkRate() {
    const rho = AtmosIsa.density(this.state.h);
    
    return this.state.config.map((config) => {
      const { dragK, dragCD0, S, W } = config;  
    
      return this.state.airspeed.map(v =>
        ((rho * S * dragCD0 * v ** 3) / (2 * W) + (2 * dragK * W) / (rho * v * S)));
    });
  }

  renderNavTabs() {
    const { activeTab } = this.state;

    return this.state.config.map((_, idx) => {
      return (
        <NavItem key={idx}>
          <NavLink active={idx === activeTab} onClick={this.toggleActiveTab(idx)}>
            {idx + 1}
          </NavLink>
        </NavItem>
      );
    });
  }

  toggleActiveTab(idx: number) {
    return () => {
      this.setState({ activeTab: idx });
    };
  }

  renderInputTabs() {
    return this.state.config.map((config, idx) => {
      return (
        <TabPane tabId={idx} key={idx}>
          <Inputs
            index={idx}
            changeHandler={this.handleChange(idx)}
            config={config}
            h={this.state.h}
          />
        </TabPane>
      );
    });
  }

  render() {
    const { airspeed, activeTab } = this.state;

    return (
      <main role="main">
        <Container>
          <Row>
            <Col xs="3">
              <Nav tabs id="nav-tab" role="tablist">
                {this.renderNavTabs()}
              </Nav>
              <TabContent activeTab={activeTab}>
                {this.renderInputTabs()}
              </TabContent>
            <Button color="primary" onClick={this.addNewTab}>
              +
            </Button>
            </Col>
            <Col xs="9">
              <Plot
                airspeed={airspeed}
                data={this.calculateSinkRate()}
              />
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
