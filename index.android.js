/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Navigator
} from 'react-native';

import {WorkoutDB} from './services/WorkoutDatabase';

import {Page} from './components/Page';
import {HomePage} from './components/HomePage';
import {ExerciseView} from './components/ExerciseView';

function ExerciseTracker() {
  function sceneRenderer(route, navigator) {
    switch (route.name) {
      case 'home':
        return <HomePage nav={navigator} />;
      case 'exercise':
        return <ExerciseView forDate={route.date} />;
      default:
        return <HomePage />;
    }
  }
  
  return (
    <Navigator
        initialRoute={{name: 'home'}}
        renderScene={sceneRenderer} />
  );
}

AppRegistry.registerComponent('ExerciseTracker', () => ExerciseTracker);
