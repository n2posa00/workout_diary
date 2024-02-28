// Made by: Samuli Pohjola
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Styles from './styles/Styles';
import AddWorkout from './components/AddWorkout';
import Settings from './components/Settings';
import Diary from './components/Diary';
import { SettingsContext, WorkoutContext } from './components/Contexts';
import { MyTheme } from './styles/MyTheme';
import { useFont } from 'expo-font';

export default function App() {

  const [workouts, setWorkouts] = useState([
    {
      type: 'Running',
      distance: 5,
      distanceMode: 'km',
      duration: 30,
      date: '20.10.2023',
      icon: 'run'
    },
    {
      type: 'Swimming',
      distance: 0.5,
      distanceMode: 'km',
      duration: 15,
      date: '21.10.2023',
      icon: 'swim'
    },
    {
      type: 'Cycling',
      distance: 10,
      distanceMode: 'km',
      duration: 45,
      date: '22.10.2023',
      icon: 'bike'
    }
  ]);
  const [distanceMode, setDistanceMode] = useState('km');

  return (
    <SettingsContext.Provider value={{distanceMode, setDistanceMode}}>
      <WorkoutContext.Provider value={{workouts, setWorkouts}}>
          <PaperProvider theme={MyTheme}>
            <SafeAreaProvider>
              <Navigation/>
            </SafeAreaProvider>
          </PaperProvider>
      </WorkoutContext.Provider>
    </SettingsContext.Provider>
  );
}


function Navigation(){

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'home', title: 'Add workout', focusedIcon: 'pencil-plus', unfocusedIcon: 'pencil-plus-outline'},
    {key: 'diary', title: 'Diary', focusedIcon: 'book-open', unfocusedIcon: 'book-open-outline'},
    {key: 'Settings', title: 'Settings', focusedIcon: 'radius', unfocusedIcon: 'radius-outline'},
  ]);

  const scene = BottomNavigation.SceneMap({
    home: AddWorkout,
    diary: Diary,
    Settings: Settings,
  });

  return(
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={scene}
      barStyle={{ backgroundColor: '#ffffff' }}
    />
  );
}