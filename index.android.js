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

var ExerciseView = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const sets = [
            { reps: 10, weight: 25 },
            { reps: 8, weight: 35 },
            { reps: 8, weight: 30 },
            { reps: 8, weight: 30 }
        ];
        return {
            sets: sets,
            dataSource: ds.cloneWithRows(sets),
        };
    },
    render() {
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
            <View style={styles.container}>
              <ToolbarAndroid
                style={styles.toolbar}
                logo={require('./dumbbell-icon.png')}
                actions={[{title: 'Home'}]} />
              <View style={styles.topbar}>
                <Text style={styles.topbarTitle}>
                  Dumbbell Shoulder Press {this.props.blerga}
                </Text>
              </View>
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
            </View>
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

class Page extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <ToolbarAndroid
                style={styles.toolbar}
                logo={require('./dumbbell-icon.png')}
                actions={[{title: 'Home'}]} />
              <View style={styles.topbar}>
                <Text style={styles.topbarTitle}>
                  {this.props.title}
                </Text>
              </View>
              {this.props.children}
            </View>
        );        
    }
}

class ExerciseCalendar extends React.Component {
    goToOtherPage(navigator) {
        navigator.push({name: 'exercise', index: 1});
    }
    render() {
        const row = (week, columns) => (
            <View key={week} style={styles.calendarWeek}>
              {columns}
            </View>
        );

        const cell = (dayi, week) => {
            let day = week * 7 + dayi;
            const color = day % 2 ? '#fafaff' : '#ffffff';
            return (
                <TouchableNativeFeedback
                  key={day+week}
                  onPress={() => this.goToOtherPage(this.props.nav)}
                  background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={{flex: 1, height:60, paddingLeft: 3, backgroundColor: color}}>
                    <Text>{day}</Text>
                  </View>
                </TouchableNativeFeedback>
            );
        }
        
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
              initialRoute={{name: 'home', index: 0}}
              renderScene={(route, navigator) => {
                  switch (route.name) {
                  case 'home':
                      return <HomePage nav={navigator} />
                  case 'exercise':
                      return <ExerciseView />
                  default:
                      return <HomePage />
                  }
              }}
              />
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    topbar: {
        height: 80,
        justifyContent: 'flex-end',
        backgroundColor: '#44aaee',
    },
    toolbar: {
        height: 50,
        backgroundColor: '#44aaee',        
    },
    topbarTitle: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    addButton: {
        backgroundColor: '#ee3322',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('ExerciseTracker', () => ExerciseTracker);
