import * as React from 'react';
import { Label, FormGroup, Input, Col } from 'reactstrap';
import { AircraftConfiguration } from 'views/PerformanceView';

export interface InputProps {
  index?: number;
  config: AircraftConfiguration;
  h: number;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

const InputsTab: React.StatelessComponent<InputProps> = (props) => {
  const { index = 0, changeHandler, config, h } = props;
  return (
    <React.Fragment>
      <FormGroup row>
        <Label for="wingArea" xs={6}>S[m²]</Label>
        <Col xs={6}>
          <Input type="number" name="S" id="wingArea" value={config.S} onChange={changeHandler}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="dragCD0" xs={6}>CD0</Label>
        <Col xs={6}>
          <Input type="number" name="dragCD0" id="dragCD0" value={config.dragCD0} onChange={changeHandler}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="dragK" xs={6}>K</Label>
        <Col xs={6}>
          <Input type="number" name="dragK" id="dragK" value={config.dragK} onChange={changeHandler}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="weigth" xs={6}>W[N]</Label>
        <Col xs={6}>
          <Input type="number" name="W" id="weigth" value={config.W} onChange={changeHandler}/>
        </Col>
      </FormGroup>

    </React.Fragment>
  );
};

export default InputsTab;
