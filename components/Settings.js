import { Button, RadioButton } from "react-native-paper";
import React, { useState, useContext } from "react";
import Styles from "../styles/Styles";
import { View, Text, Alert } from "react-native";
import { SettingsContext } from "./Contexts";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';  

export default function Settings() {

    const [mode, setMode] = useState('km');
    const { distanceMode, setDistanceMode } = useContext(SettingsContext);

    function save() {
        setDistanceMode(mode);
        Alert.alert('Settings saved.');
    }

    function currentMode() {
        if (distanceMode === 'km') {
            return 'Kilometers.';
        } else {
            return 'Miles.';
        }
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Settings</Text>
            <View style={Styles.settingContainer}>
                <MaterialCommunityIcons name="flag-checkered" size={24} color="black" />
                <Text style={Styles.settingMode}>The current setting is: {currentMode()}</Text>
            </View>
            <RadioButton.Group onValueChange={newValue => {
                setMode(newValue)
                setDistanceMode(mode)
            }} value={mode}>
                <View style={[Styles.radio, { borderTopLeftRadius: 10 }]}>
                    <RadioButton value='km' />
                    <Text>Kilometers</Text>
                </View>
                <View style={[Styles.radio, { borderBottomRightRadius: 10 }]}>
                    <RadioButton value='mi' />
                    <Text>Miles</Text>
                </View>
            </RadioButton.Group>
            <Button style={[Styles.paperButton, { marginTop: 10 }]} mode='contained' onPress={save}>Save</Button>
        </View>
    );
}