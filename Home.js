import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import { getAuth } from "firebase/auth";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";

export default function Home () {
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName;
    const email = user.email;
    const password = user.password;
    const userId = user.uid;
    const [items, setItems] = useState([]);
    const [markedDates, setMarkedDates] = useState({});

    useEffect(()=> {
        const loadItem = () => {
            getDocs(query(collection(db, "image/"), where("uid", "==", userId))).then((querySnapshot) => {
            const item = [];
            const mark = {};
            querySnapshot.forEach((doc) => {
                item.push({...doc.data(), key: doc.id, /*ref: imageUrl,*/});
                const formattedDate = doc.data().date;
                mark[formattedDate] = {
                    ...markedDates[formattedDate],
                    marked: true,
                };
            });
            setItems(item);
            setMarkedDates(mark);
        });};

        loadItem();
    }, []);

    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
    );

    const markedSelectedDates = {
      ...markedDates,
      [selectedDate]: {
        selected: true,
        marked: markedDates[selectedDate]?.marked,
      }
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image style={styles.logoView} source={require('./assets/img/logo.png')}/>
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{displayName}님</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Calendar
                //current={format(new Date(), 'yyyy-MM-dd')}
                //items={agendaItems}
                //renderItem={renderItem}
                markedDates={markedSelectedDates}
                theme={{    
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688',
                }} 
                onDayPress={(day) => {
                  setSelectedDate(day.dateString)
                }}/>
                <FlatList
                data={items}
                renderItem={({ item }) => (
                  <View style={{flex: 1, width: '85%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                    <Image source={{uri: item.image}} style={{width: 100, height: 100, margin: '7%'}}/>
                    <Text>{item.date}</Text>
                  </View>
                )}/>
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
        fontWeight: "400",
        fontSize: 18,
        lineHeight: 18,
        color: "#FFFFFF",
        flexGrow: 0
    },
    content: {
        display: "flex",
        flex: 1,
        flexDirection:'column',
        alignContent: 'center',
        padding: 0,
        gap: 16,
        top: 100
    },
})
