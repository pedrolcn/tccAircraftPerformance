import * as React from 'react';
import { AircraftConfiguration } from 'views/PerformanceView';
import { FormData } from 'ecv-validation';
import { Collapse, Button, FormGroup, Label, Col, Input, FormFeedback } from 'reactstrap';

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
        <Label for={`dragCD0Cruise_${idx}`} xs={6}>
          <abbr title="Coeficiente de Arrasto Parasita em cruseiro">C<sub>D0<sub>cruise</sub></sub></abbr>
        </Label>
        <Col xs={6}>
          <Input
            type="number"
            name="dragCD0Cruise"
            id={`dragCD0Cruise_${idx}`}
            value={values.dragCD0Cruise}
            onChange={changeHandler}
            step={0.01}
            invalid={invalid.dragCD0Cruise}
          />
          <FormFeedback>{errors.dragCD0Cruise}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for={`dragCD0Takeoff_${idx}`} xs={6}>
          <abbr title="Coeficiente de Arrasto Parasita em decolagem">C<sub>D0<sub>TO</sub></sub></abbr>
        </Label>
        <Col xs={6}>
          <Input
            type="number"
            name="dragCD0Takeoff"
            id={`dragCD0Takeoff_${idx}`}
            value={values.dragCD0Takeoff}
            onChange={changeHandler}
            step={0.01}
            invalid={invalid.dragCD0Takeoff}
          />
          <FormFeedback>{errors.dragCD0Takeoff}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for={`dragCD0Landing_${idx}`} xs={6}>
          <abbr title="Coeficiente de Arrasto Parasita em pouso">C<sub>D0<sub>landing</sub></sub></abbr>
        </Label>
        <Col xs={6}>
          <Input
            type="number"
            name="dragCD0Landing"
            id={`dragCD0Landing_${idx}`}
            value={values.dragCD0Landing}
            onChange={changeHandler}
            step={0.01}
            invalid={invalid.dragCD0Landing}
          />
          <FormFeedback>{errors.dragCD0Landing}</FormFeedback>
        </Col>
      </FormGroup>
    </Collapse>
  );
};

export default dragCD0Form;
