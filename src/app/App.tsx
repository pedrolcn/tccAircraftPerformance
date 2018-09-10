import * as React from 'react';
import { PerformanceView } from '../views';

import './App.scss';

export interface AppProps {}
export interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  render() {
    return <PerformanceView />;
  }
}
