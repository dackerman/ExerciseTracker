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

import {WorkoutDB} from './services/WorkoutDatabase';

import {Page} from './components/Page';
import {HomePage} from './components/HomePage';

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

var ExerciseTracker = React.createClass({
  render() {
    return (
      <Navigator
          initialRoute={{name: 'home'}}
          renderScene={(route, navigator) => {
              switch (route.name) {
                case 'home':
                  return <HomePage nav={navigator} />;
                case 'exercise':
                  return <ExerciseView forDate={route.date} />;
                default:
                  return <HomePage />;
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

    addButton: {
        backgroundColor: '#ee3322',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('ExerciseTracker', () => ExerciseTracker);
