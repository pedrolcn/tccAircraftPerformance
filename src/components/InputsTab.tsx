import * as React from 'react';
import { Label, FormGroup, Input, Col, CustomInput } from 'reactstrap';
import { AircraftConfiguration, Motorizations } from 'views/PerformanceView';

export interface InputProps {
  idx?: number;
  config: AircraftConfiguration;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

const InputsTab: React.StatelessComponent<InputProps> = (props) => {
  const { idx, changeHandler, config } = props;

  return (
    <React.Fragment>
      <div>
        <legend className="col-form-label">Motorização:</legend>
        <FormGroup check inline>
          <CustomInput
            type="radio"
            name={`motorization_${idx}`}
            id={`jet_${idx}`}
            checked={config.motorization === Motorizations.JET}
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
            checked={config.motorization === Motorizations.PROPELER}
            value={Motorizations.PROPELER}
            onChange={changeHandler}
            label="Helice"  
          />
        </FormGroup>
        <FormGroup row>
          <Label for={`TSFC_${idx}`} xs={6}>
            <abbr title="Consumo Especifico de Combustivel">
              {config.motorization === Motorizations.JET ? 'T' : 'P'}SFC
            </abbr>
          </Label>
          <Col xs={6}>
            <Input type="number" name="TSFC" id={`TSFC_${idx}`} value={config.TSFC} onChange={changeHandler}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`T0orP0_${idx}`} xs={6}>
            <abbr title={`${config.motorization === Motorizations.JET ? 'Empuxo' : 'Potência'} ao Nivel do Mar`}>
              {config.motorization === Motorizations.JET ? 'T0 [N]' : 'P0 [W]'}
            </abbr>
          </Label>
          <Col xs={6}>
            <Input type="number" name="T0orP0" id={`T0orP0_${idx}`} value={config.T0orP0} onChange={changeHandler}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`engineN_${idx}`} xs={6}><abbr title="Constante N motor">N</abbr></Label>
          <Col xs={6}>
            <Input type="number" name="engineN" id={`engineN_${idx}`} value={config.engineN} onChange={changeHandler}/>
          </Col>
        </FormGroup>
      </div>
      <div>
        <legend className="col-form-label">Aerodinâmica:</legend>
        <FormGroup row>
          <Label for={`wingArea_${idx}`} xs={6}><abbr title="Area Molhada">S [m²]</abbr></Label>
          <Col xs={6}>
            <Input type="number" name="S" id={`wingArea_${idx}`} value={config.S} onChange={changeHandler}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`dragCD0_${idx}`} xs={6}><abbr title="Coeficiente de Arrasto Parasita">C<sub>D0</sub></abbr></Label>
          <Col xs={6}>
            <Input type="number" name="dragCD0" id={`dragCD0_${idx}`} value={config.dragCD0} onChange={changeHandler} step={0.01}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`dragK_${idx}`} xs={6}><abbr title="Constante de Arrasto Induzido">K</abbr></Label>
          <Col xs={6}>
            <Input type="number" name="dragK" id={`dragK_${idx}`} value={config.dragK} onChange={changeHandler} step={0.01}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`CLMax_${idx}`} xs={6}>
            <abbr title="Coeficiente de Sustentação Máximo">
              C<sub>L<sub>max</sub></sub>
            </abbr>
          </Label>
          <Col xs={6}>
            <Input type="number" name="CLMax" id={`CLMax_${idx}`} value={config.CLMax} onChange={changeHandler} step={0.01}/>
          </Col>
        </FormGroup>
      </div>
      <div>
        <legend className="col-form-label">Outros:</legend>
        <FormGroup row>
          <Label for={`weigth_${idx}`} xs={6}><abbr title="Peso da Aeronave">W<sub>0</sub> [N]</abbr></Label>
          <Col xs={6}>
            <Input type="number" name="W" id={`weigth_${idx}`} value={config.W} onChange={changeHandler} step={100}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`loadFactor_${idx}`} xs={6}><abbr title="Fator de carga">n</abbr></Label>
          <Col xs={6}>
            <Input
              type="number"
              name="loadFactor"
              id={`loadFactor_${idx}`}
              value={config.loadFactor}
              onChange={changeHandler}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={`altitude_${idx}`} xs={6}><abbr title="Altitude">h [m]</abbr></Label>
          <Col xs={6}>
            <Input
              type="number"
              name="h"
              id={`h_${idx}`}
              value={config.h}
              onChange={changeHandler}/>
          </Col>
        </FormGroup>
      </div>
    </React.Fragment>
  );
};

export default InputsTab;
