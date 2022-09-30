import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity,KeyboardAvoidingView, StyleSheet , Text, View ,TextInput} from 'react-native';
import { auth } from './firebase';
import {useState} from "react";
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';

const Login=()=>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation()
    
    /*useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace("Tab")
                //navigator
            }
        })
        return unsubscribe
    },[])
    */

    const handleLogin =()=>{
        auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials =>{
            const user=userCredentials.user;
            console.log('Logged in with ', user,email);
            navigation.navigate("Tab");
        })
        .catch(error => alert(error.message))

        //auth.setPersistence(auth, local)
        //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    }
    
    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.content}>
                <Image style={styles.logo} source={require('./assets/img/logo.png')}/>
                {/* 이메일, 비밀번호, 로그인 버튼 */}
                <View style={styles.inputView}>
                    <View style={styles.inputViewInside}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                        backgroundColor: '#F4F6F9', width: '90%', height: 45, borderRadius: 99, paddingLeft: 10,
                        alignSelf: "stretch", flexGrow: 0, left: 30, top: -20}}>
                            <MaterialIcons name="alternate-email" size={24} color="skyblue" />
                            <TextInput value={email} onChangeText={text => setEmail(text)}
                            style={{ padding: 10, backgroundColor: '#F4F6F9', fontWeight: 'bold' }} placeholder="E-mail"/>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                        backgroundColor: '#F4F6F9', width: '90%', height: 45, borderRadius: 99, paddingLeft: 10,
                        alignSelf: "stretch", flexGrow: 0, left: 30}}>
                            <MaterialIcons name="lock" size={24} color="skyblue" />
                            <TextInput placeholder="비밀번호" value={password}
                            onChangeText={text => setPassword(text)} style={{ padding: 10, backgroundColor: '#F4F6F9', fontWeight: 'bold' }}
                            secureTextEntry />
                        </View>
                        <TouchableOpacity onPress={handleLogin} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', left: '25%', top: 20,
                            width: '60%', height: 45, borderRadius: 99,
                            alignSelf: "stretch", flexGrow: 0, backgroundColor: "#00A3FF"}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={styles.findPassword}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text styles={styles.text_style}>비밀번호 찾기</Text>
                            <Image style={{width: 18, height: 18}} source={require('./assets/img/next_icon.png')} />
                        </TouchableOpacity>
                    </View> */}
                </View>

                {/* sns 로그인 */}
                <View style={styles.snsView}>
                    <View style={styles.loginText}>
                        <Text style={styles.snsText}>- SNS 로그인 -</Text>
                    </View>
                    <View style={styles.snsImage}>
                        <Image style={{width: 36, height: 36, borderRadius: 3, flexGrow: 0}} source={require("./assets/img/Kakaotalk.png")}/>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "flex-start",
                        padding: 0, gap: 34, width: 30, height: 36, flexGrow: 0}}></View>
                        <Image style={{width: 36, height: 36, borderRadius: 3, flexGrow: 0}} source={require("./assets/img/Google.png")}/>
                    </View>
                </View>

                {/* 회원가입 */}
                <View style={styles.signupBtn}>
                    <Text style={styles.signupText}>
                        아직 회원이 아니신가요?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{
                            width: 48, height: 13, fontWeight: "400",
                            fontSize: 13, lineHeight: 13, display: "flex", alignItems: "center",
                            textDecorationLine: "underline", color: "#00A3FF", flexGrow: 0
                        }}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*<View style={styles.eclipse}>
            </View>*/}
        </KeyboardAvoidingView>
    )
};

export default Login;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    logo: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        position: 'absolute',
        width: 222,
        height: 134.25,
        top: -180
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        padding: 0,
        gap: 26,
        position: 'absolute',
        height: 408,
        left: 0,
        right: 0,
        bottom: 68
    },
    inputView: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingTop: 12, 
        paddingBottom: 32,
        gap: 6,
        width: 360,
        height: 214,
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
    findPassword: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        gap: 2,
        width: 87,
        height: 24,
    },
    text_style: {
        fontWeight: "700",
        fontSize: 11,
        lineHeight: 13,
        color: "#00A3FF",
    },
    snsView: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 0,
        gap: 15,
        width: 300,
        height: 91,
        flexGrow: 0
    },
    loginText: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        gap: 10,
        width: 73,
        height: 24,
        flexGrow: 0
    },
    snsText:{
        display: "flex",
        alignItems: 'center',
        width: 73,
        height: 12,
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 12,
        color: "#888888",
        flexGrow: 0
    },
    snsImage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 0,
        paddingLeft: 1,
        paddingTop: 10,
        gap: 34,
        width: 106,
        height: 36,
        flexGrow: 0
    },
    signupBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        paddingTop: 30,
        paddingLeft: 5,
        gap: 6,
        width: 187,
        height: 24,
        flexGrow: 0
    },
    signupText: {
        width: 133,
        height: 13,
        fontWeight: "400",
        fontSize: 13,
        lineHeight: 13,
        display: 'flex',
        alignItems: 'center',
        color: "#888888",
        flexGrow: 0
    },
    eclipse: {
        position: "relative",
        width: 481,
        height: 137.5,
        backgroundColor: "#00A3FF",
    }
});