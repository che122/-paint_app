import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';

export default function Setting () {
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName;
    const email = user.email;
    const password = user.password;
    const navigation = useNavigation();
    const [name, setName] = useState('');


    useEffect(()=>{
        setName(displayName);
    },[]);

    const handleSignOut=()=>{
        auth
        .signOut()
        .then(()=>{
          navigation.replace("Login")
        })
        .catch(error=>alert(error.message))
      }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image style={styles.logoView} source={require('./assets/img/logo.png')}/>
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{name}님</Text>
                </View>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Update")}>
                    <Text style={styles.btnText}>계정 정보 변경</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
                    <Text style={styles.btnText}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'row'
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
        alignContent: 'space-around',
        marginTop: '30%',
        padding: 0,
        gap: 16,
    },
    btn: {
        width: '100%',
        height: '10%',
        marginLeft: '6%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 20,
        fontWeight: '500'
    }
})