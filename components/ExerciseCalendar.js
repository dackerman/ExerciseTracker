import React, {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';

import {WorkoutDB} from '../services/WorkoutDatabase';

export class ExerciseCalendar extends React.Component {

  goToOtherPage(navigator, theDate) {
    navigator.push({name: 'exercise', date: theDate});
  }

  render() {
    const row = (week, columns) => (
      <View key={week} style={styles.calendarWeek}>
        {columns}
      </View>
    );

    const cell = (dayi, week) => {
      let day = week * 7 + dayi;
      const theDate = '2016-05-' + day;
      const color = day % 2 ? '#fafaff' : '#ffffff';
      const sets = WorkoutDB.setsForDay(theDate).sets;
      const mark = sets.length ? <Text>X</Text> : <Text></Text>;
      return (
        <TouchableNativeFeedback
            key={day+week}
            onPress={() => this.goToOtherPage(this.props.nav, theDate)}
            background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={{flex: 1, height:60, paddingLeft: 3, backgroundColor: color}}>
            <Text>{day}</Text>
            {mark}
          </View>
        </TouchableNativeFeedback>
      );
    }

    const header = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
      <View key={day} style={{flex: 1}}>
        <Text style={{color: '#dfeefe'}}>{day}</Text>
      </View>
    ));
    
    const rows = [];
    for (var week = 0; week < 5; week++) {
      const columns = [];
      for (var day = 0; day < 7; day++) {
        columns.push(cell(day, week));
      }
      rows.push(row(week, columns));
    }
    
    return (
      <View>
        <Text style={{fontSize: 30, textAlign: 'center', backgroundColor: '#332322', color: '#dfeefe'}}>&lt;   April   &gt;</Text>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#332322'}}>
          {header}
        </View>
        {rows}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarWeek: {
    flex: 1,
    flexDirection: 'row'
  }
});
