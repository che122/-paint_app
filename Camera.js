import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
   
const Camera = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  useEffect(()=>{
    openCamera();
  },[])

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
  
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchCameraAsync();
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
  }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{left: 16, top: 6}} onPress={() => navigation.navigate("Tab")}>
                    <MaterialIcons name="home-filled" color="black" size={32}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image source={{uri: image}} style={{width: 360, height: 492}}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerbtn}>
                  <TouchableOpacity /*onPress={() => pickImage()}*/>
                      <MaterialIcons name="insert-photo" color="white" size={42}/>
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Image style={{width: 102, height: 102}} source={require('./assets/img/camera.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity /*onPress={() => openCamera()}*/>
                      <MaterialIcons name="refresh" color="white" size={42}/>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};
export default Camera;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    content: {
        position: "absolute",
        left: "3%",
        right: "0%",
        top: '15%',
        bottom: 240,
        backgroundColor: "white"
    },
    header: {
      width: 360,
      height: 44,
      top: 24,
      backgroundColor: 'white',
      position: "absolute",
      left: 0,
      right: 0,
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
