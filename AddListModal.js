import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,TextInput,ScrollView,ImageBackground} from 'react-native';
import Colors from '../Colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TemPData from '../TemPData';
// import tempData from '../TemPData';
// import { ScrollView } from 'react-native-gesture-handler';


export default class AddListModal extends React.Component{
    
    backgroundColors=["#5CD859","#24A6D9","#5958D9","#D159D8","#D85963","#D88559","#161414","#D159D8","#882209","#D159D8","#D85963","#D88559","#161414","#843c54","#00ff00","#5a45bd","#22d933","#ff9900","#ba4533","#ffcb0d","#cd6090"]
    state={
        name:"",
        color:this.backgroundColors[0],
    }
  

    // const [name,setName]=useState("");
    // const[color,setColor]=useState(backgroundColors[0]);
   

    renderColors=()=>{

        
        return this.backgroundColors.map((color,index)=>{

            return(
           
            <TouchableOpacity key={index} 
            style={[styles.colorSelect,{backgroundColor:color,borderColor:'white',borderWidth:4,}]}
            onPress={()=>this.setState({color})}
            />
           
            );
        });
    }

    createTodo=()=>{
     
    //    console.log('hi i am called');
       

        const {name,color}=this.state;
        const list={name,color};
        this.props.addList(list);
        this.props.getTodoList();
        this.setState({name:""})
        this.props.closeModal();

    }
    
    render(){
       return(

        <ImageBackground resizeMode='cover' style={{flex:1}} source={require('./BackGroundImageMain1.jpeg')}>

             
<TouchableOpacity style={{position:'absolute',top:hp(3),right:wp(3)}} onPress={()=>this.props.closeModal()}>
                <AntDesign name="close" size={hp(4)} color={Colors.red} />
            </TouchableOpacity>
        <KeyboardAvoidingView style={styles.container} behaviour='padding'>

           


            <View style={{alignSelf:'stretch',marginHorizontal:32,height:hp(30)}}>
                <Text style={[styles.title,{color:this.state.color}]}>Create Todo Lists:</Text>
                <TextInput placeholderTextColor={'white'} style={styles.input} placeholder='List Name?' value={this.state.name} onChangeText={text=>this.setState({name:text})}/>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection:'row',justifyContent:'space-between',marginTop:wp(2),  paddingHorizontal:wp(2),}}>
                {this.renderColors()}
                </ScrollView>

                 
                <TouchableOpacity style={[styles.create,{backgroundColor:this.state.color,boderWidth:24,borderColor:Colors.white}]} onPress={()=>this.createTodo()}>
                   <Text style={{color:'#fff',fontWeight:'500',fontSize:wp(6)}}>Create:</Text>
                </TouchableOpacity>
            </View>
           
        </KeyboardAvoidingView>
        
        </ImageBackground>
       );

       }
    }
const styles=StyleSheet.create({
    container:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0007',
        position:'relative',
        top:hp(13),
       
    },
    title:{
        fontSize:hp(5.5),
        fontWeight:'900',
        alignSelf:'center',
        marginBottom:hp(2),
        textDecorationLine:'underline',
        textDecorationStyle:'solid',
        position:'absolute',
        top:hp(-13),


    },

    input:{
     borderWidth:StyleSheet.hairlineWidth,
     borderColor:Colors.white,
     borderRadius:12,
     height:hp(7.5),
     marginTop:hp(2.2),
     marginBottom:hp(1.6),
     paddingHorizontal:16,
     fontSize:hp(3),
     color:Colors.white,
    

    },
    create:{
        marginTop:hp(4),
        height:hp(8.5),
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:5,
        borderColor:'white',
        
       
       
    },
    colorSelect:{
        width:wp(9),
        height:wp(9),
        borderRadius:50,
        marginHorizontal:hp(1),
        paddingVertical:hp(2),
      
      


    }
})