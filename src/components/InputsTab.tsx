import * as React from 'react';
import { Label, FormGroup, Input, Col, CustomInput, FormFeedback, Button } from 'reactstrap';
import { AircraftConfiguration, Motorizations } from 'views/PerformanceView';
import { FormData } from 'ecv-validation';
import { DragCD0Form, WeightForm } from './';
import SubformButton from './SubFormButton';

export interface InputProps {
  idx: number;
  config: FormData<AircraftConfiguration>;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

export interface InputState {
  isCD0Open: boolean;
  isWeightOpen: boolean;
}

export default class InputsTab extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);

    this.state = {
      isCD0Open: false,
      isWeightOpen: false,
    };

    this.openDragCd0 = this.openDragCd0.bind(this);
    this.openWeight = this.openWeight.bind(this);
  }

  openDragCd0() {
    this.setState(prevState => ({ isCD0Open: !prevState.isCD0Open }));
  }

  openWeight() {
    this.setState(prevState => ({ isWeightOpen: !prevState.isWeightOpen }));
  }

  render() {
    const { idx, changeHandler, config: { errors, values, invalid }, config } = this.props;
    const { isCD0Open, isWeightOpen } = this.state;
  
    return (
      <React.Fragment>
        <div>
          <legend className="col-form-label">Motorização:</legend>
          <FormGroup check inline>
            <CustomInput
              type="radio"
              name={`motorization_${idx}`}
              id={`jet_${idx}`}
              checked={values.motorization === Motorizations.JET}
              value={Motorizations.JET}
              onChange={changeHandler}
              label="Jato"  
            />
          </FormGroup>
          <FormGroup check inline>
            <CustomInput
              type="radio"
              name={`motorization_${idx}`}
              id={`propeler_${idx}`}
              checked={values.motorization === Motorizations.PROPELER}
              value={Motorizations.PROPELER}
              onChange={changeHandler}
              label="Helice"  
            />
          </FormGroup>
          <FormGroup row>
            <Label for={`TSFC_${idx}`} xs={6}>
              <abbr title="Consumo Especifico de Combustivel">
                {values.motorization === Motorizations.JET ? 'T' : 'P'}SFC
              </abbr>
            </Label>
            <Col xs={6}>
              <Input type="number" name="TSFC" id={`TSFC_${idx}`} value={values.TSFC} onChange={changeHandler} invalid={invalid.TSFC}/>
              <FormFeedback>{errors.TSFC}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for={`T0orP0_${idx}`} xs={6}>
              <abbr title={`${values.motorization === Motorizations.JET ? 'Empuxo' : 'Potência'} ao Nivel do Mar`}>
                {values.motorization === Motorizations.JET ? 'T0 [N]' : 'P0 [W]'}
              </abbr>
            </Label>
            <Col xs={6}>
              <Input type="number" name="T0orP0" id={`T0orP0_${idx}`} value={values.T0orP0} onChange={changeHandler} invalid={invalid.T0orP0} />
              <FormFeedback>{errors.T0orP0}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for={`engineN_${idx}`} xs={6}><abbr title="Constante N motor">N</abbr></Label>
            <Col xs={6}>
              <Input type="number" name="engineN" id={`engineN_${idx}`} value={values.engineN} onChange={changeHandler} invalid={invalid.engineN} />
              <FormFeedback>{errors.engineN}</FormFeedback>
            </Col>
          </FormGroup>
        </div>
        <div>
          <legend className="col-form-label">Aerodinâmica:</legend>
          <FormGroup row>
            <Label for={`wingArea_${idx}`} xs={6}><abbr title="Area Molhada">S [m²]</abbr></Label>
            <Col xs={6}>
              <Input type="number" name="S" id={`wingArea_${idx}`} value={values.S} onChange={changeHandler} invalid={invalid.S}/>
              <FormFeedback>{errors.S}</FormFeedback>
            </Col>
          </FormGroup>
          <SubformButton isOpen={isCD0Open} className={`subform-button${isCD0Open ? ' active' : ''}`} onClick={this.openDragCd0}>CD0</SubformButton>
          <DragCD0Form idx={idx} isOpen={isCD0Open} config={config} changeHandler={changeHandler} />
          <FormGroup row>
            <Label for={`dragK_${idx}`} xs={6}><abbr title="Constante de Arrasto Induzido">K</abbr></Label>
            <Col xs={6}>
              <Input
                type="number"
                name="dragK"
                id={`dragK_${idx}`}
                value={values.dragK}
                onChange={changeHandler}
                step={0.01}
                invalid={invalid.dragK}
              />
              <FormFeedback>{errors.dragK}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for={`CLMax_${idx}`} xs={6}>
              <abbr title="Coeficiente de Sustentação Máximo">
                C<sub>L<sub>max</sub></sub>
              </abbr>
            </Label>
            <Col xs={6}>
              <Input
                type="number"
                name="CLMax"
                id={`CLMax_${idx}`}
                value={values.CLMax}
                onChange={changeHandler}
                step={0.01}
                invalid={invalid.CLMax}
              />
              <FormFeedback>{errors.CLMax}</FormFeedback>
            </Col>
          </FormGroup>
        </div>
        <div>
          <legend className="col-form-label">Outros:</legend>
          <SubformButton isOpen={isWeightOpen} onClick={this.openWeight}>Peso da aeonave</SubformButton>
          <WeightForm idx={idx} isOpen={isWeightOpen} config={config} changeHandler={changeHandler} />
          <FormGroup row>
            <Label for={`loadFactor_${idx}`} xs={6}><abbr title="Fator de carga">n</abbr></Label>
            <Col xs={6}>
              <Input
                type="number"
                name="loadFactor"
                id={`loadFactor_${idx}`}
                value={values.loadFactor}
                onChange={changeHandler}
                invalid={invalid.loadFactor}
              />
              <FormFeedback>{errors.loadFactor}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for={`altitude_${idx}`} xs={6}><abbr title="Altitude">h [m]</abbr></Label>
            <Col xs={6}>
              <Input
                type="number"
                name="h"
                id={`h_${idx}`}
                value={values.h}
                onChange={changeHandler}
                invalid={invalid.h}/>
            </Col>
            <FormFeedback>{errors.h}</FormFeedback>
          </FormGroup>
        </div>
      </React.Fragment>
    );
  }
}
