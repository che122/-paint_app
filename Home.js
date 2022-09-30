import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert} from 'react-native';
import { getAuth } from "firebase/auth";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, query, where, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';

export default function Home () {
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName;
    const email = user.email;
    const password = user.password;
    const userId = user.uid;
    const [items, setItems] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [isData, setIsData] = useState(false);

    const [fontsLoaded] = useFonts({
        'GmarketSansTTFBold': require('./assets/fonts/GmarketSansTTFBold.ttf'),
      });

    useEffect(()=> {
        const loadItem = () => {
            getDocs(query(collection(db, "image/"), where("uid", "==", userId))).then((querySnapshot) => {
            const item = [];
            const mark = {};
            querySnapshot.forEach((doc) => {
                item.push({...doc.data(), key: doc.id, });
                const formattedDate = doc.data().date;
                mark[formattedDate] = {
                    ...markedDates[formattedDate],
                    marked: true,
                };
                if (doc.data()) {
                    setIsData(true);
                }
                else {
                    setIsData(false);
                }
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

    const BottomContent = () => {
        if (!isData && fontsLoaded) {
            return (
            <View style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center', flex: 1, marginBottom: '50%'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'GmarketSansTTFBold'}}>아직 오늘의 페인트가 없어요! :(</Text>
            </View>)
        }
        else {
            return (<FlatList
            data={items}
            renderItem={({ item }) => (
              <View style={{flex: 1, width: '85%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image source={{uri: item.image}} style={{width: 100, height: 100, margin: '3%', marginTop: '5%'}}/>
                <View style={{flexDirection: 'column', width: '85%'}}>
                <Text>Date: {item.date}</Text>
                <Text>Artist: {item.songArtist}</Text>
                <Text>Song Name: {item.songName}</Text>
                <TouchableOpacity onPress={async ({item}) => {
                    await deleteDoc(getDoc(db, "images/", item.key));
                }}>
                    <Ionicons name="trash-outline" size={24}/>
                </TouchableOpacity>
                </View>
              </View>
            )}/>)
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
                <BottomContent />
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