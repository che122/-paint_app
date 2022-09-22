import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
   
  const Paint = () => {
    const navigation = useNavigation();
    const [imgUrl, setimgUrl] = useState(null);

      return (
          <View style={styles.container}>
              <Image style={styles.logo} source={require("./assets/img/logo.png")}/>
              <TouchableOpacity onPress={() => navigation.push('Camera')}>
                  <Image style={styles.btnCamera} source={require("./assets/img/btnCamera.png")}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Gallery")}>
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