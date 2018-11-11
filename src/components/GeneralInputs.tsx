import * as React from 'react';
import { Label, FormGroup, Input, Col, Button, Collapse, Row, CustomInput, FormFeedback } from 'reactstrap';
import EquationPlot from 'equations/Base';
import { chunk } from '../util/FunctionUtils';
import { FormData, IGeneralInputs } from 'views/PerformanceView';
import { error } from 'util';

export interface GeneralInputProps {
  generalInputs: FormData<IGeneralInputs>;
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

    return chunk(equations, 3).map(chunk =>
      <FormGroup row>
        {chunk.map((e, idx) => 
          <Col xs={4}>
            <FormGroup check style={{ paddingLeft: '0' }}>
              <CustomInput
                type="checkbox"
                checked={e.enabled}
                name={idx.toString()}
                id={`eq_${idx}`}
                onChange={equationHandler}
                label={e.eq.title}
              />
            </FormGroup>
          </Col>,
        )}
      </FormGroup>,
    );
  }

  render () {
    const { generalInputs: { errors, values, invalid }, changeHandler } = this.props;
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggleOpen} style={{ margin: '1rem 0' }} block>
          Configurações Gerais
          <span className={ isOpen ? 'caret-up' :'caret-down'}></span>
        </Button>
        <Collapse isOpen={isOpen} style={{ marginBottom: '15px' }}>
          <legend>Parâmetros gerais</legend>
          <Row>
            <Col xs={3}>
              <FormGroup row>
                <Label for="vMin" xs={6}>
                  <abbr title="Velocidade minima [m/s]">V<sub>min</sub> [m/s]</abbr>
                </Label>
                <Col xs={6}>
                  <Input type="number" name="vMin" id="vMin" value={values.vMin} onChange={changeHandler} invalid={invalid.vMin}/>
                  <FormFeedback>{errors.vMin}</FormFeedback>
                </Col>
              </FormGroup>
            </Col>
            <Col xs={3}>
              <FormGroup row>
              <Label for="vMax" xs={6}>
                <abbr title="Velocidade Maxima [m/s]">V<sub>max</sub> [m/s]</abbr>
              </Label>
              <Col xs={6}>
                <Input type="number" name="vMax" id="vMax" value={values.vMax} onChange={changeHandler} invalid={invalid.vMax} />
                <FormFeedback>{errors.vMax}</FormFeedback>
              </Col>
              </FormGroup>
            </Col>
            <Col xs={3}>
              <FormGroup row>
                <Label for="deltaV" xs={6}>
                <abbr title="passo do eixo X [m/s]">&Delta;V [m/s]</abbr>
                </Label>
                <Col xs={6}>
                  <Input type="number" name="deltaV" id="deltaV" value={values.deltaV} onChange={changeHandler} invalid={invalid.deltaV} />
                  <FormFeedback>{errors.deltaV}</FormFeedback>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <hr />
          <legend>Graficos</legend>
            {this.renderEquationsMenu()}
        </Collapse>
      </React.Fragment>
    );
  }
}
