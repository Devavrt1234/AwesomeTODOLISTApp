import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground, Text, View,Image, TouchableOpacity } from 'react-native';
import Colors from '../Colors';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import React, { useEffect } from 'react';



    
export default class App extends React.Component{



  render(){

   //useEffect,useNavigation hooks can not be used inside the class comopnents
//    so directly navigate using this.props

setTimeout(()=>{
    this.props.navigation.navigate('To Do App');
   },3000)
   
  return (
    
    <ImageBackground resizeMode='cover' style={{flex:1,borderWidth:wp(3),borderColor:'crimson'}} source={require('./ToDoImage2.jpeg')}>
    <View style={styles.container}>
      <View style={{flexDirection:'row',position:'absolute',top:hp(3)}}>
        <View style={styles.divider}/>
        <Text style={styles.title}>
          Todo<Text style={{fontWeight:'500',color:Colors.white}}>Lists<Text style={{fontWeight:'700',color:Colors.red}}>App</Text></Text>
        </Text>

        <View style={styles.divider}/>
       
      </View>  

          
          <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('To Do App')}}>
          <Image style={{borderColor:'crimson',borderWidth:wp(2.7),position:'relative',top:hp(4),right:wp(7),height:hp(53),width:wp(67)}} source={require('../assets/Todoimage.jpg')}/>
          <Text style={{position:'absolute',top:hp(30.8),left:wp(21),fontSize:hp(3.2),fontWeight:'900',color:Colors.red,marginBottom:hp(4)}}>Welcome,</Text>
          <Text style={{position:'absolute',top:hp(27),left:wp(19),fontSize:hp(3.5),fontWeight:'900',color:Colors.blue,marginBottom:hp(4)}}>Hello User,</Text>
          <Text style={{position:'absolute',top:hp(35),left:wp(19),fontSize:hp(2.5),fontWeight:'900',color:Colors.blue,marginBottom:hp(4)}}>Tap on me and</Text>
          <Text style={{position:'absolute',top:hp(39),left:wp(21),fontSize:hp(2),fontWeight:'900',color:Colors.red,marginBottom:hp(4)}}>Make ToDoList.</Text>
          
          </TouchableOpacity>
        
          
         
          
    </View>
          

    
    </ImageBackground>
    
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0002',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider:{
    backgroundColor:'white',
    height:hp(2),
    flex:1,
    alignSelf:'center',
  },
  title:{
    fontSize:wp(10),
    fontWeight:'800',
    color:'red',
    paddingHorizontal:wp(4),
  }
});
