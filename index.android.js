/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput,
    Switch,
    ToolbarAndroid,
    TouchableNativeFeedback,
    Navigator
} from 'react-native';

import {Page} from './components/Page';

var WorkoutDB = function() {
    var db = {
        '2016-05-13': {
            sets: [
                { reps: 10, weight: 25 },
                { reps: 8, weight: 35 },
                { reps: 8, weight: 30 },
                { reps: 8, weight: 30 }
            ]
        }
    };
    return {
        setsForDay(day) {
            db[day] = db[day] || {sets: []};
            return db[day];
        }
    };
}();

var ExerciseView = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const theDate = this.props.forDate;
        const day = WorkoutDB.setsForDay(theDate);
        return {
            sets: day.sets,
            dataSource: ds.cloneWithRows(day.sets),
        };
    },
    
    render() {
        const theDate = this.props.forDate;
        const renderRow = (rowData, sectionID, rowID) => (
            <View style={styles.listRow}>
              <Text>{String(parseInt(rowID) + 1)}</Text>
              <TextInput
                style={{width: 70, fontSize: 25}}
                onChangeText={(text) => this.editReps(parseInt(rowID), parseInt(text))}
                value={String(rowData.reps)} />
              <Text style={{fontSize: 25}}>x</Text>
              <TextInput
                style={{width: 70, fontSize: 25}}
                onChangeText={(text) => this.editWeight(parseInt(rowID), parseInt(text))}
                value={String(rowData.weight)} />
              <Text style={{fontSize: 25}}>lbs.</Text>
              <TouchableNativeFeedback
                onPress={() => this.removeRow(parseInt(rowID))}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View>
                  <Text>X</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
        );
        
        return (
            <Page title={"Dumbbell Shoulder Press " + theDate}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={renderRow}
                />
              <TouchableNativeFeedback
                onPress={this.addRow}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.addButton}>
                  <Text style={{fontSize: 25, color: 'white'}}>ADD SET</Text>
                </View>
              </TouchableNativeFeedback>
            </Page>
        );
    },
    
    addRow() {
        const newSets = this.state.sets.concat({reps: 1, weight: 1});
        this.setState({
            sets: newSets,
            dataSource: this.state.dataSource.cloneWithRows(newSets)
        });
    },
    
    editReps(rowID, newReps) {
        const newSets = this.state.sets.slice();
        const oldSet = newSets[rowID];
        newSets.splice(rowID, 1, {
            reps: newReps,
            weight: oldSet.weight
        });
        this.setState({
            sets: newSets,
            dataSource: this.state.dataSource.cloneWithRows(newSets)
        });
    },
    
    editWeight(rowID, newWeight) {
        const newSets = this.state.sets.slice();
        const oldSet = newSets[rowID];
        newSets.splice(rowID, 1, {
            reps: oldSet.reps,
            weight: newWeight
        });
        this.setState({
            sets: newSets,
            dataSource: this.state.dataSource.cloneWithRows(newSets)
        });
    },
    
    removeRow(rowID) {
        const newSets = [];
        for (var i = 0; i < this.state.sets.length; i++) {
            if (i !== rowID) {
                newSets.push(this.state.sets[i]);
            }
        }
        this.setState({
            sets: newSets,
            dataSource: this.state.dataSource.cloneWithRows(newSets)
        });
    }
});

class ExerciseCalendar extends React.Component {
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

class HomePage extends React.Component {
    render() {
        return (
            <Page title="Exercise Calendar">
              <ExerciseCalendar nav={this.props.nav}/>
            </Page>
        );
    }
}

var ExerciseTracker = React.createClass({
    render() {
        return (
            <Navigator
              initialRoute={{name: 'home'}}
              renderScene={(route, navigator) => {
                  switch (route.name) {
                  case 'home':
                      return <HomePage nav={navigator} />
                  case 'exercise':
                      return <ExerciseView forDate={route.date} />
                  default:
                      return <HomePage />
                  }
              }}
              />
        );
    }
});

const styles = StyleSheet.create({
    listRow: {
        height: 70,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    calendarWeek: {
        flex: 1,
        flexDirection: 'row'
    },

    addButton: {
        backgroundColor: '#ee3322',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('ExerciseTracker', () => ExerciseTracker);
