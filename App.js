// 면담 내용 :
// 풍경에는 풍경에 어울리는 bgm 추천
// 필터 추천 시 스케치처럼 보이게 해주는 필터 등 추가적 효과 보완 (색 필터만 씌우는 것 외에 다른 필터 필요)
// 그래픽 강조. 예쁘게 포장해서 발표 (보여지는 게 그럴듯하게)
// 시중에 나와있는 어플과 차별되는 포인트 적어도 2~3개 필요 (시장 조사)
// 공기실에서 졸업작품 참고 영상 받기

// 문제점 :
// 1. Navigation - 내비게이션 기능이 한 번에 안되고 될 때도 있고 안 될 때도 있음
// 2. Login 유지 - 앱 리로딩만 해도 로그인이 끊김
// 3. Camera 문제 - 카메라에서 사진 선택 후 앱에 다시 들어올 때 리로딩되는 경우
//    -> 처음 리로딩 문제는 해결, but 사진 재선택/갤러리로 이동하면 리로딩 발생
// 4. Gallery 분리 불가
// - 갤러리 버튼 클릭 시 바로 사진 선택 후 다른 화면에 사진 출력 불가 (방법을 모름...)
//   한 화면에 갤러리 버튼과 image가 동시에 존재해야 함
//   -> 해결!!

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Home from './Home';
import Login from './Login';
import Paint from './Paint';
import Friends from './Friends';
import Setting from './Setting';
import SignUp from './SignUp';
import Camera from './Camera';
import Gallery from './Gallery';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function TabScreen() {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return 
          }}), {headerShown: false}}>

          <Tab.Screen name = "홈" component = {Home}
          options={{ tabBarStyle: styles.bottomNav, tabBarLabelStyle: styles.bottomText,
            tabBarActiveTintColor: 'yellow', tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color, size})=> ( <Ionicons name="home-sharp" color = {color} size={size}/>),}}/>
          <Tab.Screen name = "Paint" component = {Paint}
          options={{ tabBarStyle: styles.bottomNav, tabBarLabelStyle: styles.bottomText,
            tabBarActiveTintColor: 'yellow', tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color, size})=> ( <MaterialIcons name="format-paint" color = {color} size={size}/>),}}/>
          <Tab.Screen name = "친구목록" component ={Friends}
          options={{ tabBarStyle: styles.bottomNav, tabBarLabelStyle: styles.bottomText,
            tabBarActiveTintColor: 'yellow', tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color, size})=> ( <Ionicons name="people-sharp" color = {color} size={size}/>),}}/>
           <Tab.Screen name = "My" component = {Setting}
          options={{ tabBarStyle: styles.bottomNav, tabBarLabelStyle: styles.bottomText,
            tabBarActiveTintColor: 'yellow', tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color, size})=> ( <Ionicons name="settings-sharp" color = {color} size={size}/>),}}/>
        </Tab.Navigator>);
}

function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Tab" component={TabScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Gallery" component={Gallery} />
    </Stack.Navigator>
    </NavigationContainer>);
}

export default App;

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    height: 80,
    left: 18,
    right: 18,
    bottom: 50,
    backgroundColor: "#00A3FF",
    borderRadius: 20,
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 8
  }
})
