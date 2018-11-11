import * as React from 'react';
import { Label, FormGroup, Input, Col, Button, Collapse, Row } from 'reactstrap';
import EquationPlot from 'equations/Base';

export interface GeneralInputProps {
  vMin: number;
  vMax: number;
  deltaV: number;
  equations: {
    eq: EquationPlot;
    enabled: boolean;
  }[];
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  equationHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

export interface GeneralInputsState {
  isOpen: boolean;
}

export default class GeneralInputs extends React.Component<GeneralInputProps, GeneralInputsState>  {
  constructor(props: GeneralInputProps) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  renderEquationsMenu() {
    const { equations, equationHandler } = this.props;

    return equations.map((e, idx) => 
      <FormGroup check row>
        <Label check xs={9} for={`eq_${idx}`}>
          {e.eq.title}
        </Label>
        <Col xs={3}>
          <Input
            type="checkbox"
            checked={e.enabled}
            name={idx.toString()}
            id={`eq_${idx}`}
            onChange={equationHandler}
          />
        </Col>
      </FormGroup>,
    );
  }

  render () {
    const { vMin, vMax, deltaV, changeHandler } = this.props;
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggleOpen} style={{ margin: '1rem 0' }} block>
          Configurações Gerais
          <span className={ isOpen ? 'caret-up' :'caret-down'}></span>
        </Button>
        <Collapse isOpen={isOpen}>
          <legend>Parâmetros gerais</legend>
          <Row>
            <Col xs={3}>
              <FormGroup row>
                <Label for="vMin" xs={6}>
                  <abbr title="Velocidade minima [m/s]">V<sub>min</sub> [m/s]</abbr>
                </Label>
                <Col xs={6}>
                  <Input type="number" name="vMin" id="vMin" value={vMin} onChange={changeHandler}/>
                </Col>
              </FormGroup>
            </Col>
            <Col xs={3}>
              <FormGroup row>
              <Label for="vMax" xs={6}>
                <abbr title="Velocidade Maxima [m/s]">V<sub>max</sub> [m/s]</abbr>
              </Label>
              <Col xs={6}>
                <Input type="number" name="vMax" id="vMax" value={vMax} onChange={changeHandler}/>
              </Col>
              </FormGroup>
            </Col>
            <Col xs={3}>
              <FormGroup row>
                <Label for="deltaV" xs={6}>
                <abbr title="passo do eixo X [m/s]">&Delta;V [m/s]</abbr>
                </Label>
                <Col xs={6}>
                  <Input type="number" name="deltaV" id="deltaV" value={deltaV} onChange={changeHandler}/>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <legend>Graficos</legend>
          <Row>
            {this.renderEquationsMenu()}
          </Row>
        </Collapse>
      </React.Fragment>
    );
  }
}
