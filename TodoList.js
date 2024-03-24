import React from "react";
import { StyleSheet,Text,View,TouchableOpacity,Modal } from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from "../Colors";
import TodoModal from "./TodoModal";
export default class TodoList extends React.Component{

   
    // console.log(list.todos.filter(todo=>todo.completed));
  
    state={
        showListVisble:false
    }

    toggleListModal(){
        this.setState({showListVisble:!this.state.showListVisble})
    }
    render(){
        
        const list=this.props.list;
        // console.log('----')
        // console.log(list)
        const completedCount=list.todos.filter(todo=>todo.completed).length;
        const remainingCount=list.todos.length-completedCount;
    return (
    <View>
        <Modal animationType="slide" visible={this.state.showListVisble} onRequestClose={()=>this.toggleListModal()}>
          <TodoModal list={list}  lists={this.props.lists}  closeModal={()=>this.toggleListModal()}  addTodoLists={this.props.addTodoLists} />
        </Modal>
       <TouchableOpacity style={[styles.listContainer,{backgroundColor:list.color}]} onPress={()=>this.toggleListModal()}>
        <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
        </Text>

        <View style={{}}>
            <View style={{alignItems:'center'}}>
                <Text style={styles.count}>{remainingCount}</Text>
                <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={styles.count}>{completedCount}</Text>
                <Text style={styles.subtitle}>Completed</Text>
            </View>
        </View>
       </TouchableOpacity>
    </View>
    )
}
}

const styles=StyleSheet.create({
    listContainer:{
        paddingVertical:hp(4),
        paddingHorizontal:wp(4),
        borderRadius:wp(6),
        marginHorizontal:wp(6),
        marginVertical:wp(7),
        alignItems:'center',
        width:wp(53),
        height:hp(40),
        borderWidth:wp(2.1),
        borderColor:'#fff9',

    },
    listTitle:{
       fontSize:wp(6.5),
       fontWeight:'700',
       color:Colors.white,
       marginBottom:hp(1),
    },
    
    count:{
       fontSize:wp(8.5),
       fontWeight:'200',
       color:Colors.white
    },
    subtitle:{
        fontSize:wp(4.5),
        fontWeight:'700',
        color:Colors.white
    }
})