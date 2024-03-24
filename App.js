import React  from "react";
import {View,Text,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import MainScreen from './components/MainScreen';



const Stack = createNativeStackNavigator();




export default class App extends React.Component{


  render(){
    return(
      <React.StrictMode>
     
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Welcome">
        <Stack.Screen name="." component={WelcomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="To Do App" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
 
      </React.StrictMode>

    )
  }
}

