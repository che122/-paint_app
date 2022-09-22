import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { gUrl } from "./Paint";
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';

const Gallery = () => {
  const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{left: 16, top: 10}} onPress={() => navigation.pop()}>
                    <MaterialIcons name="home-filled" color="black" size={32}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image source={{uri: gUrl}} style={{width: 360, height: 492}}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerbtn}>
                  <TouchableOpacity onPress={() => pickImage()}>
                      <MaterialIcons name="insert-photo" color="white" size={42}/>
                  </TouchableOpacity>
                  <TouchableOpacity /*onPress={() => navigation.navigate("Tab")}*/>
                      <Image style={{width: 102, height: 102}} source={require('./assets/img/camera.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity /*onPress={() => navigation.navigate("Tab")}*/>
                      <MaterialIcons name="refresh" color="white" size={42}/>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};
export default Gallery;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    header: {
      width: 360,
      height: 44,
      top: 24,
      backgroundColor: 'white',
      left: 0,
      right: 0,
    },
    content: {
      position: "absolute",
      left: "3%",
      right: "0%",
      top: '15%',
      bottom: 240,
      backgroundColor: "white"
    },
    footer: {
      position: "absolute",
      height: 72,
      left: 18,
      right: 18,
      bottom: 108,
      backgroundColor: "#00A3FF",
      //backdrop-filter: blur(2.5px);
      borderRadius: 20
    },
    footerbtn: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 0,
      gap: 48,
      position: "absolute",
      height: 102,
      left: 33,
      right: 32,
      bottom: -15
    }
})
