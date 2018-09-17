import * as React from 'react';
import { Label, FormGroup, Input } from 'reactstrap';

export interface InputProps {
  index?: number;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

const input: React.StatelessComponent<InputProps> = (props) => {
  const { index = 0, changeHandler } = props;
  return (
    <React.Fragment>
      <FormGroup inline>
        <Label for="wingArea">S</Label>
        <Input type="number" name="S" id="wingArea" defaultValue="153" onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="dragCD0">CD0</Label>
        <Input type="number" name="dragCD0" id="dragCD0" defaultValue="0.01805" onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="dragK">K</Label>
        <Input type="number" name="dragK" id="dragK" defaultValue="0.05627" onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="weigth">W</Label>
        <Input type="number" name="W" id="weigth" defaultValue="588600" onChange={changeHandler}/>
      </FormGroup>
      <FormGroup inline>
        <Label for="altitude">h</Label>
        <Input type="number" name="h" id="altitude" defaultValue="0" onChange={changeHandler}/>
      </FormGroup>
    </React.Fragment>
  );
};

export default input;
