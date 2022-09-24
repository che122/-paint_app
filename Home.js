import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
//import { AntDesign } from '@expo/vector-icons'; 
//import { MaterialCommunityIcons } from '@expo/vector-icons'; 
//import { Ionicons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
//import { BorderlessButton } from "react-native-gesture-handler";

export default function Home () {
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName;
    const email = user.email;
    const password = user.password;

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image style={styles.logoView} source={require('./assets/img/logo.png')}/>
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{displayName}님</Text>
                </View>
                <Calendar style={styles.calendar} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: 'white'
    },
    head: {
        position: "absolute",
        justifyContent: "space-between",
        height: 96,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "#00A3FF",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    logoView: {
        position: "absolute",
        width: 139,
        height: 83,
        left: 12,
        top: 0
    },
    nameView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        position: "absolute",
        width: 100,
        height: 18,
        left: 282,
        top: 67
    },
    nameText: {
        width: 100,
        height: 18,
        fontFamily: "GmarketSansTTFMedium",
        fontWeight: "400",
        fontSize: 18,
        lineHeight: 18,
        color: "#FFFFFF",
        flexGrow: 0
    },
    calendar: {
        display: "flex",
        justifyContent: 'center',
        alignContent: 'center',
        padding: 0,
        gap: 16,
        top: 200
    }
})
