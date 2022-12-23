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
import Setting from './Setting';
import SignUp from './SignUp';
import Camera from './Camera';
import Gallery from './Gallery';
import SpotifyWebApi from 'spotify-web-api-js';
import Timelist from './Timelist';
import UpdateProfile from './UpdateProfile'

export const spotify = new SpotifyWebApi();

// Endpoint
export const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function TabScreen() {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return 
          }}), {headerShown: false}}>

          <Tab.Screen name = "Home" component = {Home}
          options={{ tabBarStyle: styles.bottomNav, tabBarLabelStyle: styles.bottomText,
            tabBarActiveTintColor: 'yellow', tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color, size})=> ( <Ionicons name="home-sharp" color = {color} size={size}/>),}}/>
          <Tab.Screen name = "Paint" component = {Paint}
          options={{ tabBarStyle: styles.bottomNav, tabBarLabelStyle: styles.bottomText,
            tabBarActiveTintColor: 'yellow', tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color, size})=> ( <MaterialIcons name="format-paint" color = {color} size={size}/>),}}/>
          <Tab.Screen name = "Timelist" component ={Timelist}
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
      <Stack.Screen name="Timelist" component={Timelist} />
      <Stack.Screen name="Update" component={UpdateProfile} />
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
    bottom: 20,
    backgroundColor: "#00A3FF",
    borderRadius: 20,
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 8
  }
})
