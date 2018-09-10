import * as React from 'react';
import { Label, FormGroup, Input } from 'reactstrap';

export interface InputProps {}

const input: React.StatelessComponent<InputProps> = (props) => {
  return (
    <React.Fragment>
      <FormGroup inline>
        <Label for="wingArea">S</Label>
        <Input type="number" name="wingArea" id="wingArea" s/>
      </FormGroup>
      <FormGroup inline>
        <Label for="dragCd0">CD0</Label>
        <Input type="number" name="dragCd0" id="dragCd0" />
      </FormGroup>
      <FormGroup inline>
        <Label for="dragK">K</Label>
        <Input type="number" name="dragK" id="dragK" />
      </FormGroup>
      <FormGroup inline>
        <Label for="wingAR">AR</Label>
        <Input type="number" name="wingAR" id="wingAR" />
      </FormGroup>
      <FormGroup inline>
        <Label for="weigth">W</Label>
        <Input type="number" name="weigth" id="weigth" />
      </FormGroup>
      <FormGroup inline>
        <Label for="altitude">h</Label>
        <Input type="number" name="altitude" id="altitude" />
      </FormGroup>
    </React.Fragment>
  );
};

export default input;
