import * as React from 'react';
import { Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { InputsTab, GeneralInputs, Plot } from '../components';
import EquationPlot from 'equations/Base';
import * as equations from '../equations';
import { GeneralInputsValidationRunner, InputsValidationRunner } from '../validators';
import { FormData } from 'ecv-validation';

export enum Motorizations {
  JET = 'jet',
  PROPELER = 'propeler',
}

export interface AircraftConfiguration {
  motorization: Motorizations;
  dragK: number;
  dragCD0Cruise: number;
  dragCD0Landing: number;
  dragCD0Takeoff: number;
  W0: number;
  Wf: number;
  Wpl: number;
  Wmax: number;
  S: number;
  TSFC: number;
  T0orP0: number;
  CLMax: number;
  loadFactor: number;
  engineN: number;
  h: number;
}

export interface IGeneralInputs {
  vMin: number;
  vMax: number;
  deltaV: number;
}

export interface PerformanceViewProps {}

export interface PerformanceViewState {
  general: FormData<IGeneralInputs>;
  equations: {
    eq: EquationPlot;
    enabled: boolean;
  }[];
  configs: FormData<AircraftConfiguration>[];
  activeTab: number;
}

export default class PerformanceView extends React.Component<PerformanceViewProps, PerformanceViewState> {
  constructor(props: PerformanceViewProps) {
    super(props);

    this.state = {
      general: {
        values: {
          vMin: 5,
          vMax: 100,
          deltaV: 5,
        },
        errors: {},
        invalid: {},
      },
      equations: Object.values(equations).map(e => ({ eq: e, enabled: false })),
      configs: [{
        values: {
          motorization: Motorizations.JET,
          dragCD0Cruise: 0,
          dragCD0Landing: 0,
          dragCD0Takeoff: 0,
          dragK: 0,
          S: 0,
          W0: 0,
          Wpl: 0,
          Wf: 0,
          Wmax: 0,
          TSFC: 0,
          T0orP0: 0,
          CLMax: 0,
          loadFactor: 0,
          engineN: 0,
          h: 0,
        },
        errors: {},
        invalid: {},
      }],
      activeTab: 0,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleGeneralInputs = this.handleGeneralInputs.bind(this);
    this.handleEquations = this.handleEquations.bind(this);
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.addNewTab = this.addNewTab.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
  }

  handleInputs (idx: number) {
    return (event: React.FormEvent<HTMLInputElement>) => {
      const { type, value } = event.currentTarget;
      let { name }: { name: string } = event.currentTarget;

      this.setState((prevState) => {
        const { configs } = prevState;
        if (type === 'radio') {
          name = 'motorization';
          (configs[idx].values as any)[name] = value;
        } else {
          configs[idx] = InputsValidationRunner.run(configs[idx], name, value);
        }

        return { configs };
      });
    };
  }

  handleGeneralInputs (event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    this.setState((prevState) => {
      let { general } = prevState;
      general = GeneralInputsValidationRunner.run(general, name, value);
      return { general };
    });
  }

  handleEquations (event: React.FormEvent<HTMLInputElement>) {
    const { name, checked } = event.currentTarget;
    this.setState((prevState) => {
      const { equations } = prevState;

      equations[parseInt(name, 10)].enabled = checked;
      return { equations };
    });
  }

  addNewTab() {
    this.setState((prevState) => {
      const { configs , activeTab } = prevState;

      // Need to perform deep copy, otherwise new config entry points to the same object
      // Nested deepCopy suuuuuucks
      configs.push(Object.assign({}, {
        errors: {},
        invalid: {},
        values: Object.assign({}, configs[activeTab].values),
      }));
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
    const { activeTab, configs, configs: { length } } = this.state;

    return configs.map((_, idx) => {
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
    const { general, general: { values: { vMin, vMax, deltaV } }, activeTab, equations, configs } = this.state;
    const enabledEquations = equations
      .filter(e => e.enabled === true)
      .map(e => e.eq);

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
                equations={enabledEquations}
              />
            </Col>
          </Row>
          <GeneralInputs
            generalInputs={general}
            changeHandler={this.handleGeneralInputs}
            equations={equations}
            equationHandler={this.handleEquations}
          />
        </Container>
      </main>
    );
  }
}

declare global {
  interface Object {
    /**
     * Returns an array of a given object's own enumerable property values,in the same order as that provided by a
     * for...in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
     * 
     * @param o The object whose enumerable own property values are to be returned. 
     */
    values: (o: {}) => any[];
  }
}
