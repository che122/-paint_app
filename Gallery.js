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
import { discovery } from "./App";
import { spotify } from "./App";
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Audio } from 'expo-av';

const Gallery = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isMusic, setIsMusic] = useState(false);
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const [albumImage, setAlbumImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [token, setToken] = useState('');
  const searchTag = ['winter', 'love', 'tired', 'happy', 'cloud', 'sunny'];
  const sound = new Audio.Sound();

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '6c24124e1da04448bf18452649da81fe',
      scopes: ['user-read-email', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
          useProxy: true
      }),
    },
    discovery
);

const searchMusic = async () => {

  try {
    let date = new Date();
    let getTime = date.getTime();
    console.log(imgUrl);

    const res = await fetch(image);
    const blob = await res.blob();
    setImgUrl(await imageUpload(blob, getTime));

    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'FACE_DETECTION', maxResults: 5 },
          ],
          image: {
            source: {
              imageUri: imgUrl
            }
          }
        }
      ]
    });
    let response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key=' +
        'AIzaSyA9Fn00e7yx7emzDzfD5hd4pahZOJ5lfGI',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: body
      }
    );
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }


  spotify.searchTracks(searchTag[0], {limit: 1, offset: 10})
  .then(
      function (data) {
        setSong(data.tracks.items[0].name);
        setArtist(data.tracks.items[0].artists[0].name);
        setAlbumImage(data.tracks.items[0].album.images[2].url);
        setPreviewUrl(data.tracks.items[0].preview_url);
      },
      function (err) {
        console.error(err);
      }
  )
}

  useEffect(()=>{
    pickImage();
  },[]);

  useEffect(()=>{
    if (isMusic){
      if (response?.type === 'success') {
        const { access_token } = response.params;
        setToken(access_token);
        spotify.setAccessToken(access_token);
        searchMusic();
      }
    }
  }, [response])

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
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
          time: date.getHours() + ':' + date.getMinutes(),
          uid: currentUser.uid,
          uname: currentUser.displayName,
          songName: song,
          songArtist: artist,
          songPreview: previewUrl,
        };
        
        data.image = imgUrl;
        console.log(data);
        let result = addImage(data);
        if (result) {
          Alert.alert('사진이 성공적으로 저장되었습니다!');
          navigation.navigate("Tab");
        }
    };

    const playSound = async () => {
      if (!previewUrl) {
        Alert.alert('재생 불가', '미리듣기가 제공되지 않는 음원입니다.');
      }
      else {
      await sound.loadAsync(
        {uri: previewUrl},
        {shouldPlay: true}
      );
      console.log('Playing Sound');
      await sound.playAsync();
      }
    }

    const pauseSound = async () => {
      console.log('Pausing Sound');
      await sound.pauseAsync();
      await sound.unloadAsync();
    }

    const SaveIcon = () => {
      if (!isMusic) {
        return (<View></View>)
    }
    else {
        return (
        <View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', justifyContent: 'space-between',}}>
          <View style={{flexDirection: 'column', alignSelf: 'center', flex: 7, justifyContent: 'center', alignItems: 'flex-start', alignContent: 'center'}}>
            <View style={{flexDirection: 'column', alignSelf: 'center'}}>
              <Text style={{alignContent: 'center', alignSelf: 'center'}}>{song}</Text>
              <Text style={{alignContent: 'center', alignSelf: 'center'}}>{artist}</Text>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between',}}>
              <TouchableOpacity style={{alignSelf: 'center'}} onPress={()=>playSound()}><MaterialIcons name="play-arrow" color="black" size={32}/></TouchableOpacity>
              <TouchableOpacity style={{alignSelf: 'center'}} onPress={()=>pauseSound()}><MaterialIcons name="pause" color="black" size={32}/></TouchableOpacity>
            </View>
          </View>
          <View style={{marginRight: 15, justifyContent: 'center', bottom: 5, flex: 1,}}>
            <TouchableOpacity onPress={()=>upload()}>
              <MaterialIcons name="save-alt" color="black" size={32}/>
            </TouchableOpacity>
          </View>
        </View>
          )
    }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <View style={{marginLeft: 15, top: 35,}}>
                <TouchableOpacity onPress={() => navigation.replace("Tab")}>
                    <MaterialIcons name="home-filled" color="black" size={32}/>
                </TouchableOpacity>
              </View>
              <SaveIcon />
            </View>
            <View style={styles.content}>
                <Image source={{uri: image}} style={{width: 360, height: 492}}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerbtn}>
                  <TouchableOpacity onPress={() => pickImage()}>
                      <MaterialIcons name="insert-photo" color="white" size={42}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    if (token != '') {
                      searchMusic();
                      setIsMusic(true);
                    }
                    else {
                      promptAsync({useProxy: true});
                      setIsMusic(true);
                    }
                  }}>
                      <Image style={{width: 102, height: 102}} source={require('./assets/img/camera.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => pickImage()}>
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
      flex: 1,
      width: '100%',
      height: 70,
      top: 30,
      backgroundColor: 'white',
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      alignContent: 'stretch'
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
