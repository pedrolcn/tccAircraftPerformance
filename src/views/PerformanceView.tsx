import * as React from 'react';
import { Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { InputsTab, GeneralInputs, Plot } from '../components';
import AtmosIsa from 'util/Atmosphere';
import { rangeInclusive } from 'util/FunctionUtils';

export interface PerformanceViewProps {}

export interface PerformanceViewState {
  vMin: number;
  vMax: number;
  deltaV: number;
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
      vMin: 5,
      vMax: 100,
      deltaV: 5,
      h: 0,
      config: [{
        dragCD0: 0, // 0.01805,
        dragK: 0, // 0.05627,
        S: 0, // 153,
        W: 0, // 588600,
      }],
      activeTab: 0,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleGeneralInputs = this.handleGeneralInputs.bind(this);
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.addNewTab = this.addNewTab.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
  }

  handleInputs (idx: number) {
    return (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;

      if (name === 'h') {
        this.setState({ h: parseInt(event.currentTarget.value, 10) });
        
      } else {
        this.setState((prevState) => {
          debugger;
          const { config } = prevState;
          config[idx][name] = value;

          return { config };
        });
      }
    };
  }

  handleGeneralInputs (event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    this.setState(prevState => Object.assign(prevState, { [name]: parseInt(value, 10) }));
  }

  addNewTab() {
    this.setState((prevState) => {
      const { config , activeTab } = prevState;

      // Need to perform deep copy, otherwise new config entry points to the same object
      config.push(Object.assign({}, config[activeTab]));
      return { config, activeTab: config.length - 1 };
    });
  }

  deleteTab(idx: number) {
    return (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      this.setState((prevState) => {
        const { config, activeTab } = prevState;
        const newTab = activeTab === idx ? activeTab - 1 : 
          activeTab > idx ? activeTab - 1 : activeTab; 
        config.splice(idx, 1);

        return { config, activeTab: newTab };
      });
    };
  }

  calculateSinkRate() {
    const { h, vMin, vMax, deltaV } = this.state;
    const rho = AtmosIsa.density(h);
    const airspeed = rangeInclusive(vMin, vMax, deltaV);

    return this.state.config.map((config) => {
      const { dragK, dragCD0, S, W } = config;  
    
      return airspeed.map(v =>
        ((rho * S * dragCD0 * v ** 3) / (2 * W) + (2 * dragK * W) / (rho * v * S)));
    });
  }

  renderNavTabs() {
    const { activeTab, config: { length } } = this.state;

    return this.state.config.map((_, idx) => {
      return (
        <NavItem key={idx}>
          <NavLink active={idx === activeTab} onClick={this.toggleActiveTab(idx)}>
            {idx + 1}
            { length === 1
             ? undefined
             :<Button 
                className={'close'} 
                color={'transparent'} 
                style={{ marginLeft: '0.2rem' }} 
                onClick={this.deleteTab(idx)}>
                &times;
              </Button>
            }
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
          <InputsTab
            index={idx}
            changeHandler={this.handleInputs(idx)}
            config={config}
            h={this.state.h}
          />
        </TabPane>
      );
    });
  }

  render() {
    const { h, vMin, vMax, deltaV, activeTab } = this.state;
    const airspeed = rangeInclusive(vMin, vMax, deltaV);

    return (
      <main role="main">
        <Container>
          <Row>
            <Col xs="3">
              <GeneralInputs
                h={h}
                vMin={vMin}
                vMax={vMax}
                deltaV={deltaV}
                changeHandler={this.handleGeneralInputs}
              />
              <Nav tabs id="nav-tab" role="tablist">
                {this.renderNavTabs()}
              </Nav>
              <TabContent activeTab={activeTab} style={{ marginTop: '0.5rem' }}>
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
