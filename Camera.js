import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import {db} from './firebase';
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"
import format from "date-fns/format";
   
const Camera = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  useEffect(()=>{
    openCamera();
  },[])

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
  
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchCameraAsync();
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const imageUpload = async (blob, date) => {
    const storageRef = ref(storage, 'image/' + date)
    const snapshot = await uploadBytes(storageRef, blob);
    const imageUrl = await getDownloadURL(storageRef);
    blob.close();

    return imageUrl;
  }

  const addImage = async (content) => {
    try {
      await setDoc(doc(db, "image/", new Date() + "D"), content);
      return true
    } catch(err) {
      Alert.alert('이미지에 문제가 있습니다.', err.message)
      return false
    }
  }

  const upload = async () => {
    console.log('업로드 준비중!');
    if (!image){
      Alert.alert('이미지를 등록해주세요');
      return;
    }
    const currentUser = getAuth().currentUser;
    let date = new Date();
    let getTime = date.getTime();
    let data = {
      image: image,
      date: format(date, 'yyyy-MM-dd'),
      time: getTime,
      uid: currentUser.uid,
    };
    const response = await fetch(image);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob, getTime);
    data.image = imageUrl;
    console.log(data);
    let result = addImage(data);
    if (result) {
      Alert.alert('사진이 성공적으로 저장되었습니다!');
    }
};

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{left: 16, top: 10}} onPress={() => navigation.navigate("Tab")}>
                    <MaterialIcons name="home-filled" color="black" size={32}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image source={{uri: image}} style={{width: 360, height: 492}}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerbtn}>
                  <TouchableOpacity onPress={() => upload()}>
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
})import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import {db} from './firebase';
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"
import format from "date-fns/format";
   
const Camera = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  useEffect(()=>{
    openCamera();
  },[])

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
  
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchCameraAsync();
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const imageUpload = async (blob, date) => {
    const storageRef = ref(storage, 'image/' + date)
    const snapshot = await uploadBytes(storageRef, blob);
    const imageUrl = await getDownloadURL(storageRef);
    blob.close();

    return imageUrl;
  }

  const addImage = async (content) => {
    try {
      await setDoc(doc(db, "image/", new Date() + "D"), content);
      return true
    } catch(err) {
      Alert.alert('이미지에 문제가 있습니다.', err.message)
      return false
    }
  }

  const upload = async () => {
    console.log('업로드 준비중!');
    if (!image){
      Alert.alert('이미지를 등록해주세요');
      return;
    }
    const currentUser = getAuth().currentUser;
    let date = new Date();
    let getTime = date.getTime();
    let data = {
      image: image,
      date: format(date, 'yyyy-MM-dd'),
      time: getTime,
      uid: currentUser.uid,
    };
    const response = await fetch(image);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob, getTime);
    data.image = imageUrl;
    console.log(data);
    let result = addImage(data);
    if (result) {
      Alert.alert('사진이 성공적으로 저장되었습니다!');
    }
};

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{left: 16, top: 10}} onPress={() => navigation.navigate("Tab")}>
                    <MaterialIcons name="home-filled" color="black" size={32}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image source={{uri: image}} style={{width: 360, height: 492}}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerbtn}>
                  <TouchableOpacity onPress={() => upload()}>
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
