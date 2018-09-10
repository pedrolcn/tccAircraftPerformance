import * as React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Inputs } from '../components';

export interface PerformanceViewProps {}
export interface PerformanceViewState {}

export default class PerformanceView extends React.Component<PerformanceViewProps, PerformanceViewState> {
  constructor(props: PerformanceViewProps) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <main role="main">
        <Container>
          <Row>
            <Col xs="6">
              <Inputs />
            </Col>
            <Col xs="6">
              Here be graphs
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
