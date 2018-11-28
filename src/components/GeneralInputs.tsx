import * as React from 'react';
import { Label, FormGroup, Input, Col, Button, Collapse, Row, CustomInput, FormFeedback } from 'reactstrap';
import EquationPlot from 'equations/Base';
import { chunk } from '../util/FunctionUtils';
import { IGeneralInputs } from 'views/PerformanceView';
import { FormData } from 'ecv-validation';

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
    let globalIdx = 0;

    return chunk(equations, 3).map(chunk =>
      <FormGroup row>
        {chunk.map((e) => {
          const idx = globalIdx;
          globalIdx += 1;
          return (
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
            </Col>
          );
        })}
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
                <Label for="xMin" xs={6}>
                  <abbr title="Valor minimo do eixo X">X<sub>min</sub></abbr>
                </Label>
                <Col xs={6}>
                  <Input type="number" name="xMin" id="xMin" value={values.xMin} onChange={changeHandler} invalid={invalid.xMin}/>
                  <FormFeedback>{errors.xMin}</FormFeedback>
                </Col>
              </FormGroup>
            </Col>
            <Col xs={3}>
              <FormGroup row>
              <Label for="xMax" xs={6}>
                <abbr title="Valor máximo do eixo X">X<sub>max</sub></abbr>
              </Label>
              <Col xs={6}>
                <Input type="number" name="xMax" id="xMax" value={values.xMax} onChange={changeHandler} invalid={invalid.xMax} />
                <FormFeedback>{errors.xMax}</FormFeedback>
              </Col>
              </FormGroup>
            </Col>
            <Col xs={3}>
              <FormGroup row>
                <Label for="deltaV" xs={6}>
                <abbr title="passo do eixo X ">&Delta;X [m/s]</abbr>
                </Label>
                <Col xs={6}>
                  <Input type="number" name="deltaX" id="deltaX" value={values.deltaX} onChange={changeHandler} invalid={invalid.deltaX} />
                  <FormFeedback>{errors.deltaX}</FormFeedback>
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
