import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';

export var gUrl = null;
export var cUrl = null;

const Paint = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
    
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        gUrl = result.uri;
      }
}

const openCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've refused to allow this appp to access your camera!");
    return;
  }

  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      cUrl = result.uri;
    }
}

      return (
          <View style={styles.container}>
              <Image style={styles.logo} source={require("./assets/img/logo.png")}/>
              <TouchableOpacity onPress={() => {openCamera(image); navigation.push("Camera");}}>
                  <Image style={styles.btnCamera} source={require("./assets/img/btnCamera.png")}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {pickImage(image); navigation.push("Gallery");}}>
                  <Image style={styles.btnGallery} source={require("./assets/img/btnGallery.png")}/>
              </TouchableOpacity>
          </View>
      )
  };
  export default Paint;

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: 'white',
      },
      logo: {
        position: "absolute",
        width: 222,
        height: 134.25,
        left: 85,
        top: 167
      },
      btnCamera: {
        position: "absolute",
        width: 293.76,
        height: 86,
        left: 60,
        top: 373
      },
      btnGallery: {
        position: "absolute",
        width: 293.76,
        height: 86,
        left: 60,
        top: 483
      }
  })
