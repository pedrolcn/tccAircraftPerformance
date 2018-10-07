import * as React from 'react';
import { Label, FormGroup, Input } from 'reactstrap';
import { AircraftConfiguration } from '../views/PerformanceView';

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
      <FormGroup inline>
        <Label for="wingArea">S[m²]</Label>
        <Input type="number" name="S" id="wingArea" value={config.S} onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="dragCD0">CD0</Label>
        <Input type="number" name="dragCD0" id="dragCD0" value={config.dragCD0} onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="dragK">K</Label>
        <Input type="number" name="dragK" id="dragK" value={config.dragK} onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="weigth">W[N]</Label>
        <Input type="number" name="W" id="weigth" value={config.W} onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="altitude">h[m]</Label>
        <Input type="number" name="h" id="altitude" value={h} onChange={changeHandler}/>
      </FormGroup>
    </React.Fragment>
  );
};

export default InputsTab;
