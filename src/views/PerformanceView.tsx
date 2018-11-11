import * as React from 'react';
import { Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { InputsTab, GeneralInputs, Plot } from '../components';
import EquationPlot from 'equations/Base';
import * as equations from '../equations';

export interface PerformanceViewProps {}

export interface PerformanceViewState {
  vMin: number;
  vMax: number;
  deltaV: number;
  equations: EquationPlot[];
  configs: AircraftConfiguration[];
  activeTab: number;
}

export enum Motorizations {
  JET = 'jet',
  PROPELER = 'propeler',
}

export interface AircraftConfiguration {
  motorization: Motorizations;
  dragK: number;
  dragCD0: number;
  W: number;
  S: number;
  TSFC: number;
  T0orP0: number;
  CLMax: number;
  loadFactor: number;
  engineN: number;
  h: number;
}

export default class PerformanceView extends React.Component<PerformanceViewProps, PerformanceViewState> {
  constructor(props: PerformanceViewProps) {
    super(props);

    this.state = {
      vMin: 5,
      vMax: 100,
      deltaV: 5,
      equations: (Object as any).values(equations),
      configs: [{
        motorization: Motorizations.JET,
        dragCD0: 0, // 0.01805,
        dragK: 0, // 0.05627,
        S: 0, // 153,
        W: 0, // 588600,
        TSFC: 0,
        T0orP0: 0,
        CLMax: 0,
        loadFactor: 0,
        engineN: 0,
        h: 0,
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
      const { type } = event.currentTarget;
      let { name, value }: { name: string, value: any } = event.currentTarget;

      this.setState((prevState) => {
        const { configs } = prevState;
        if (type === 'radio') {
          name = 'motorization';
        } else {
          value = parseFloat(value);
        }
         
        (configs as any[])[idx][name] = value;
        return { configs };
      });
    };
  }

  handleGeneralInputs (event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    this.setState(prevState => Object.assign(prevState, { [name]: parseInt(value, 10) }));
  }

  addNewTab() {
    this.setState((prevState) => {
      const { configs , activeTab } = prevState;

      // Need to perform deep copy, otherwise new config entry points to the same object
      configs.push(Object.assign({}, configs[activeTab]));
      return { configs, activeTab: configs.length - 1 };
    });
  }

  deleteTab(idx: number) {
    return (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      this.setState((prevState) => {
        const { configs, activeTab } = prevState;
        const newTab = activeTab === idx ? activeTab - 1 : 
          activeTab > idx ? activeTab - 1 : activeTab; 
        configs.splice(idx, 1);

        return { configs, activeTab: newTab };
      });
    };
  }

  renderNavTabs() {
    const { activeTab, configs: { length } } = this.state;

    return this.state.configs.map((_, idx) => {
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
    return this.state.configs.map((config, idx) => {
      return (
        <TabPane tabId={idx} key={idx}>
          <InputsTab
            idx={idx}
            changeHandler={this.handleInputs(idx)}
            config={config}
          />
        </TabPane>
      );
    });
  }

  render() {
    const { vMin, vMax, deltaV, activeTab, equations, configs } = this.state;

    return (
      <main role="main">
        <Container>
          <Row className="main">
            <Col xs="3" className="main-column">
              <Nav tabs id="nav-tab" role="tablist">
                {this.renderNavTabs()}
              </Nav>
              <TabContent activeTab={activeTab} style={{ marginTop: '0.5rem' }}>
                {this.renderInputTabs()}
              </TabContent>
            <Button color="primary" onClick={this.addNewTab} style={{ marginTop: '5px' }}>
              Adicionar Aeronave +
            </Button>
            </Col>
            <Col xs="9" className="main-column">
              <Plot
                configs={configs}
                vMin={vMin}
                vMax={vMax}
                deltaV={deltaV}
                equations={equations}
              />
            </Col>
          </Row>
          <GeneralInputs
            vMin={vMin}
            vMax={vMax}
            deltaV={deltaV}
            changeHandler={this.handleGeneralInputs}
          />
        </Container>
      </main>
    );
  }
}
