import React from 'react-native';

import {Page} from './Page';
import {ExerciseCalendar} from './ExerciseCalendar'

export class HomePage extends React.Component {
  render() {
    return (
      <Page title="Exercise Calendar">
        <ExerciseCalendar nav={this.props.nav}/>
      </Page>
    );
  }
}
