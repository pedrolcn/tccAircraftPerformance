import * as React from 'react';
import { AircraftConfiguration } from 'views/PerformanceView';
import { FormData } from 'ecv-validation';
import { Collapse, FormGroup, Label, Col, Input, FormFeedback } from 'reactstrap';

export interface DragCD0FormProps {
  idx: number;
  isOpen: boolean;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  config: FormData<Partial<AircraftConfiguration>>;
}

const dragCD0Form: React.StatelessComponent<DragCD0FormProps> = (props) => {
  const { idx, isOpen, changeHandler, config: { errors, values, invalid } } = props;

  return (
    <Collapse className="subform" isOpen={isOpen}>
      <FormGroup row>
        <Label for={`weigth0_${idx}`} xs={6}><abbr title="Peso Vazio da Aeronave">W<sub>0</sub> [N]</abbr></Label>
        <Col xs={6}>
          <Input type="number" name="W0" id={`weigth0_${idx}`} value={values.W0} onChange={changeHandler} step={100} invalid={invalid.W0}/>
          <FormFeedback>{errors.W0}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for={`weigthf_${idx}`} xs={6}><abbr title="Peso de combustivel da Aeronave">W<sub>f</sub> [N]</abbr></Label>
        <Col xs={6}>
          <Input type="number" name="Wf" id={`weigthf_${idx}`} value={values.Wf} onChange={changeHandler} step={100} invalid={invalid.Wf}/>
          <FormFeedback>{errors.Wf}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for={`weigthmax_${idx}`} xs={6}><abbr title="Peso Máximo de decolagem ">MTOW [N]</abbr></Label>
        <Col xs={6}>
          <Input type="number" name="Wmax" id={`weigthmax_${idx}`} value={values.Wmax} onChange={changeHandler} step={100} invalid={invalid.Wmax}/>
          <FormFeedback>{errors.Wmax}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for={`weigthpl_${idx}`} xs={6}><abbr title="Peso Máximo de Carga Paga ">W<sub>PL</sub> [N]</abbr></Label>
        <Col xs={6}>
          <Input type="number" name="Wpl" id={`weigthpl_${idx}`} value={values.Wpl} onChange={changeHandler} step={100} invalid={invalid.Wpl}/>
          <FormFeedback>{errors.Wpl}</FormFeedback>
        </Col>
      </FormGroup>
    </Collapse>
  );
};

export default dragCD0Form;
