import Styles from "../styles/Styles";
import { View, Text, FlatList } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useContext } from "react";
import { WorkoutContext, SettingsContext } from "./Contexts";
import { Card, Divider } from "react-native-paper";

export default function Diary() {

    const {workouts = []} = useContext(WorkoutContext);
    const {distanceMode} = useContext(SettingsContext);

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Diary</Text>
            <View style={Styles.total}>
                <View style={Styles.totalContainer}>
                    <MaterialCommunityIcons name="run" size={24} color="black" paddingRight={10} />
                    <Text style={{marginLeft: 20}}>Total run distance: {Number(distanceRunTotal(workouts, distanceMode)).toFixed(1)} {distanceMode}.</Text>
                </View>
                <Divider bold={true} style={{ backgroundColor: 'black' }}/>
                <View style={Styles.totalContainer}>
                    <MaterialCommunityIcons name="swim" size={24} color="black" paddingRight={10} />
                    <Text style={{marginLeft: 20}}>Total swim distance: {Number(distanceSwimTotal(workouts, distanceMode)).toFixed(1)} {distanceMode}.</Text>
                </View>
                <Divider bold={true} style={{ backgroundColor: 'black' }}/>
                <View style={Styles.totalContainer}>
                    <MaterialCommunityIcons name="bike" size={24} color="black" paddingRight={10} />
                    <Text style={{marginLeft: 20}}>Total cycle distance: {Number(distanceCycleTotal(workouts, distanceMode)).toFixed(1)} {distanceMode}.</Text>
                </View>
            </View>
            <FlatList
            data={workouts}
            renderItem={({item}) => <Item workout={item} distanceMode={distanceMode}/>}
            />
        </View>
    );
}

function Item({workout, distanceMode}){

    let distance = 0;
    if (workout.distanceMode === 'km' && distanceMode === 'mi') {
        distance = workout.distance * 0.621371; 
    } else if (workout.distanceMode === 'mi' && distanceMode === 'km') {
        distance = workout.distance / 0.621371; 
    } else {
        distance = workout.distance;
    }

    let distanceNumber = Number(distance);
    let formattedDistance = distanceNumber.toFixed(1);

    return (

        <Card style={Styles.item}>
            <Card.Content>
                <View style={Styles.itemHeader}>
                    <MaterialCommunityIcons name={workout.icon} size={24} color="black" paddingRight={10} />
                    <Text style={Styles.itemHeaderText}>{workout.type}</Text>
                </View>
                <Divider bold={true} style={{ backgroundColor: 'black' }}/>
                <Text>{'Date: ' + workout.date + '.'}</Text>
                <Divider bold={true} style={{ backgroundColor: 'black' }}/>
                <Text>{'Distance: ' + formattedDistance + ' ' + distanceMode + '.'}</Text>
                <Divider bold={true} style={{ backgroundColor: 'black' }}/>
                <Text>{'Duration: ' + workout.duration + ' min.'}</Text>
                <Divider bold={true} style={{ backgroundColor: 'black' }}/>
            </Card.Content>
        </Card>
    
    );
}

function distanceRunTotal(workouts, distanceMode){
    let total = 0;
    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].type === 'Running') {
            let distance = 0;
            if (workouts[i].distanceMode === 'km' && distanceMode === 'mi') {
                distance = workouts[i].distance * 0.621371192; 
            } else if (workouts[i].distanceMode === 'mi' && distanceMode === 'km') {
                distance = workouts[i].distance / 0.621371192; 
            } else {
                distance= workouts[i].distance;
            }
            
            total += Number(distance);

        }
    }
    return total;
}

function distanceSwimTotal(workouts, distanceMode){
    let total = 0;
    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].type === 'Swimming') {
            let distance = 0;
            if (workouts[i].distanceMode === 'km' && distanceMode === 'mi') {
                distance = workouts[i].distance * 0.621371; 
            } else if (workouts[i].distanceMode === 'mi' && distanceMode === 'km') {
                distance = workouts[i].distance / 0.621371; 
            } else {
                distance = workouts[i].distance;
            }
            
            total += Number(distance);

        }
    }
    return total;
}

function distanceCycleTotal(workouts, distanceMode){
    let total = 0;
    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].type === 'Cycling') {
            let distance = 0;
            if (workouts[i].distanceMode === 'km' && distanceMode === 'mi') {
                distance = workouts[i].distance * 0.621371; 
            } else if (workouts[i].distanceMode === 'mi' && distanceMode === 'km') {
                distance = workouts[i].distance / 0.621371; 
            } else {
                distance = workouts[i].distance;
            }
            
            total += Number(distance);

        }
    }
    return total;
}