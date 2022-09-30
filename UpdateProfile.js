import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Alert, TextInput} from 'react-native';
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';

export default function UpdateProfile () {
    const auth = getAuth();
    const user = auth.currentUser;
    const beforeName = user.displayName;
    const beforeEmail = user.email;
    const beforePassword = user.password;
    const [name, setName] = useState('');


    useEffect(()=>{
        setName(beforeName);
    },[]);

    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')

    const navigation = useNavigation();

    const updateMyProfile = () => {
        updateProfile(user, {
            displayName: newName,
            email: newEmail,
            password: newPassword
        }).then(() => {
            Alert.alert('계정 정보 변경', '정보가 성공적으로 변경되었습니다!');
            navigation.goBack();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.head}>
                    <Image style={styles.logoView} source={require('./assets/img/logo.png')}/>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>{name}님</Text>
                    </View>
                </View>
                <View style={styles.title}>
                    <TouchableOpacity style={{marginBottom: '23%'}} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" color="black" size={40}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'black', marginLeft: '20%', marginTop: '10%'}}>계정 정보 변경</Text>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputViewInside}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                        backgroundColor: '#F4F6F9', width: '90%', height: 45, borderRadius: 99, paddingLeft: 10,
                        alignSelf: "stretch", flexGrow: 0, left: 30, top: -40}}>
                            <MaterialIcons name="perm-identity" size={24} color="skyblue" />
                            <TextInput value={newName} onChangeText={text => setNewName(text)}
                            style={{ padding: 10, backgroundColor: '#F4F6F9', fontWeight: 'bold' }} placeholder="이름"/>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                        backgroundColor: '#F4F6F9', width: '90%', height: 45, borderRadius: 99, paddingLeft: 10,
                        alignSelf: "stretch", flexGrow: 0, left: 30, top: -20}}>
                            <MaterialIcons name="alternate-email" size={24} color="skyblue" />
                            <TextInput value={newEmail} onChangeText={text => setNewEmail(text)}
                            style={{ padding: 10, backgroundColor: '#F4F6F9', fontWeight: 'bold' }} placeholder="E-mail"/>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                        backgroundColor: '#F4F6F9', width: '90%', height: 45, borderRadius: 99, paddingLeft: 10,
                        alignSelf: "stretch", flexGrow: 0, left: 30}}>
                            <MaterialIcons name="lock" size={24} color="skyblue" />
                            <TextInput placeholder="비밀번호" value={newPassword}
                            onChangeText={text => setNewPassword(text)} style={{ padding: 10, backgroundColor: '#F4F6F9', fontWeight: 'bold' }}
                            secureTextEntry />
                        </View>
                        <TouchableOpacity onPress={updateMyProfile} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', left: '25%', top: 20,
                            width: '60%', height: 45, borderRadius: 99,
                            alignSelf: "stretch", flexGrow: 0, backgroundColor: "#00A3FF"}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    head: {
        flex: 1,
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
    title: {
        flex: 1.5,
        marginLeft: '5%',
        marginTop: '7%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputView: {
        flex: 5,
        display: 'flex',
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: '10%',
        marginTop: '10%',
        gap: 6,
        width: 360,
        alignSelf: 'stretch',
    },
    inputViewInside: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        gap: 16,
        height: 160,
        flexGrow: 0,
        alignSelf: 'stretch'
    },
})