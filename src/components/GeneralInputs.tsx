import * as React from 'react';
import { Label, FormGroup, Input, Col, Button, Collapse } from 'reactstrap';

export interface GeneralInputProps {
  h: number;
  vMin: number;
  vMax: number;
  deltaV: number;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
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

  render () {
    const {
      h,
      vMin,
      vMax,
      deltaV,
      changeHandler,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggleOpen} style={{ margin: '1rem 0' }} >
          Configurações Gerais
          <span className={ isOpen ? 'caret-up' :'caret'}></span>
        </Button>
        <Collapse isOpen={isOpen}> 
          <FormGroup row>
            <Label for="altitude" xs={6}>h [m]</Label>
            <Col xs={6} >
              <Input type="number" name="h" id="altitude" value={h} onChange={changeHandler}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="altitude" xs={6}>Vmin [m/s]</Label>
            <Col xs={6}>
              <Input type="number" name="vMin" id="vMin" value={vMin} onChange={changeHandler}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="altitude" xs={6}>Vmax [m/s]</Label>
            <Col xs={6}>
              <Input type="number" name="vMax" id="vMax" value={vMax} onChange={changeHandler}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="altitude" xs={6}>deltaV [m/s]</Label>
            <Col xs={6}>
              <Input type="number" name="deltaV" id="deltaV" value={deltaV} onChange={changeHandler}/>
            </Col>
          </FormGroup>
        </Collapse>
      </React.Fragment>
    );
  }
}
