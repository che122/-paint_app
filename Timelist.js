import React, {useEffect, useState} from "react";
import Timeline from 'react-native-timeline-flatlist';
import {StyleSheet, View, Text, Image} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import { getAuth } from "firebase/auth";

export default function Timelist () {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;
    const [data, setData] = useState([]);
    const [isData, setIsData] = useState(false);

    useEffect(()=> {
        const getTimelineItems = () => {
            getDocs(query(collection(db, "image/"))).then((querySnapshot) => {
            const dt = [];
            querySnapshot.forEach((doc) => {
                dt.push({
                    time: doc.data().time, title: doc.data().uname,
                    imageUrl: doc.data().image, description: doc.data().songArtist + "\n- " + doc.data().songName
                });
                if (doc.data()) {
                    setIsData(true);
                }
                else {
                    setIsData(false);
                }
            });
            setData(dt);
        });};
        getTimelineItems();
    }, []);

    const renderDetail = (rowData, sectionID, rowID) => {
        let title = <Text style={[styles.rowTitle]}>{rowData.title}</Text>;
        var desc = null;
        if (rowData.description && rowData.imageUrl)
          desc = (
            <View style={styles.descriptionContainer}>
              <Image
                source={{uri: rowData.imageUrl}}
                style={styles.imageStyle}
              />
              <Text style={styles.textDescriptionStyle}>
                {rowData.description}
              </Text>
            </View>
        );
        return (
            <View style={{flex: 1}}>
              {title}
              {desc}
            </View>
          );
    };
    return (
        <View style={styles.container}>
            <Timeline data={data}
            circleSize={20}
            circleColor="#00A3FF"
            lineColor="black"
            timeContainerStyle={{minWidth: 60}}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: '#FFCC33',
              color: 'white',
              padding: 5,
              borderRadius: 13,
            }}
            descriptionStyle={{color: 'black'}}
            options={{
              style: {margin: '3%', marginTop: '15%', paddingTop: 5},
            }}
            innerCircle={'icon'}
            renderDetail={renderDetail}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: 'white'
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50,
      },
      imageStyle: {
        width: 70,
        height: 70,
        borderRadius: 25,
      },
      textDescriptionStyle: {
        marginLeft: 10,
        color: 'gray',
      },
});