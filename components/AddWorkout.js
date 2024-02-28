import { Pressable, View, Text, Modal, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from 'moment';
import React, { useContext, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Styles from "../styles/Styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { WorkoutContext, SettingsContext } from "./Contexts";
import { MyTheme } from "../styles/MyTheme";


export default function AddWorkout() {

    const [workoutVisible, setWorkoutVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [type, setType] = useState('Choose type of workout');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('Set date');
    const [icon, setIcon] = useState('playlist-edit');
    const {workouts, setWorkouts} =  useContext(WorkoutContext);
    const {distanceMode} = useContext(SettingsContext);

    function dateSelected(day){
        setCalendarVisible(false);
        const formattedDate = moment(day.dateString).format('DD.MM.YYYY');
        setDate(formattedDate);
    }

    function addWorkout(){

        if (type === 'Choose type of workout') {
            Alert.alert('Please choose a type of workout.');
            return;
        }

        if (distance === '' || distance <= 0) {
            Alert.alert('Please enter a valid distance.');
            return;
        }

        if (duration === '' || duration <= 0) {
            Alert.alert('Please enter a valid duration.');
            return;
        }

        if (date === 'Set date') {
            Alert.alert('Please set a date.');
            return;
        }

        setWorkouts([...workouts, {type, distance, duration, date, distanceMode, icon}]);
        setType('Choose type of workout');
        setDistance('');
        setDuration('');
        setDate('Set date');
        setIcon('playlist-edit');

        Alert.alert('Workout added to diary.');
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Add workout</Text>
            <Modal visible={workoutVisible} transparent={true}>
                <View style={Styles.modalWorkout}>
                    <Pressable style={Styles.modalButton} onPress={() => {setType('Running');
                    setWorkoutVisible(false); setIcon('run-fast')}}>
                        <Text>Running</Text>
                        <MaterialCommunityIcons name="run-fast" size={24} color="black" />
                    </Pressable>
                    <Pressable style={Styles.modalButton} onPress={() => {setType('Swimming');
                    setWorkoutVisible(false); setIcon('swim')}}>
                        <Text>Swimming</Text>
                        <MaterialCommunityIcons name="swim" size={24} color="black" />
                    </Pressable>
                    <Pressable style={Styles.modalButton} onPress={() => {setType('Cycling');
                    setWorkoutVisible(false); setIcon('bicycle')}}>
                        <Text>Cycling</Text>
                        <MaterialCommunityIcons name="bicycle" size={24} color="black" />
                    </Pressable>
                    <Pressable style={Styles.closeButton} onPress={() => setWorkoutVisible(false)}>
                        <Text>Close</Text>
                        <MaterialCommunityIcons name="close" size={24} color="black" />
                    </Pressable>
                </View>
            </Modal>
            <Pressable style={Styles.setButton} onPress={() => setWorkoutVisible(true)}>
                <Text style={Styles.setButtonText}>{type}</Text>
                <MaterialCommunityIcons name={icon} size={24} color="black" />
            </Pressable>
            <TextInput mode="outlined" style={Styles.paperInput} theme = {{colors : {background: MyTheme.colors.surfaceVariant}}} value={distance} label={`Distance (${distanceMode}.)`} keyboardType="numeric" onChangeText={setDistance}/>
            <TextInput mode="outlined" style={Styles.paperInput} theme = {{colors : {background: MyTheme.colors.surfaceVariant}}} value={duration} label='Duration (m.)' keyboardType="numeric" onChangeText={setDuration}/>
            <Modal visible={calendarVisible}>
                <View style={Styles.modalCalendar}>
                    <Calendar style={Styles.calendar} onDayPress={dateSelected}/>
                    <Pressable style={Styles.closeButton} onPress={() => setCalendarVisible(false)}>
                        <Text>Close</Text>
                        <MaterialCommunityIcons name="close" size={24} color="black" />
                    </Pressable>
                </View>
            </Modal>
            <Pressable style={Styles.setButton} onPress={() => setCalendarVisible(true)}>
                <Text style={Styles.setButtonText}>{date}</Text>
                <MaterialCommunityIcons name="calendar" size={24} color="black" />
            </Pressable>
            <Button style={Styles.paperButton} mode="contained" onPress={addWorkout}>Add workout</Button>
        </View>
    );
}
