import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, ImageBackground } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { getFirestore, collection, addDoc, getDocs, initializeFirestore, doc, updateDoc, deleteDoc, db } from '../Fire';
import { arrayUnion,setDoc  } from '@firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
export default class TodoModal extends React.Component {
    state = {
        newTodo: '',
      
    }

    

    toggleTodoCompleted = (index) => {
        let list = this.props.list
        list.todos[index].completed = !list.todos[index].completed;
        this.updateListOnToggle(list);
        this.props.addTodoLists(list);
   
      
    

      

    }


    updateListOnToggle(list){

    
         
     
        this.setState({lists:list.todos.map((item)=>{

            return item.id==list.id?list:item
           })
        })

     

    
       
    }


    deleteTheTaskFromLists(index){

        let list = this.props.list
         console.log(index);
        
         list.todos.splice(index,1);
       
         this.updateListOnToggle(list);
         this.props.addTodoLists(list);
      
    }




    addTodo = () => {
        let list = this.props.list;

        list.todos.push({ title: this.state.newTodo, completed: false })

    

        // console.log(this.state.todos);

        this.updateListOnToggle(list);
        this.props.addTodoLists(list);
      
        this.setState({ newTodo: "" })

    }



    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity style={{ paddingHorizontal: wp(7)  }}   onPress={() => this.toggleTodoCompleted(index)} >
                    <Ionicons name={todo.completed ? 'ios-square' : 'ios-square-outline'} size={hp(4)} color={todo.completed ? Colors.black : Colors.white} />
                </TouchableOpacity>

               
                <Text onPress={() => this.toggleTodoCompleted(index)} style={[styles.todo, { textDecorationLine: todo.completed ? 'line-through' : 'none', color: todo.completed ? Colors.black : Colors.white }]}>
                    {todo.title}
                </Text>


               
                <TouchableOpacity style={{position:'absolute',right:wp(2)}} onPress={()=>this.deleteTheTaskFromLists(index)}>
                <MaterialIcons name="delete"  size={45} color={todo.completed ? "crimson" : Colors.white} />
                </TouchableOpacity>
            </View>
        )
    }
    render() {

        const list = this.props.list
        // console.log('00000000000')
        // console.log(list.todos);
        const taskCount=list.todos.length
        const completedCount=list.todos.filter(todo=>todo.completed).length;

        return (
            // <View style={styles.container}>
            //     <Text>List Modal</Text>
            // </View>

            <ImageBackground resizeMode='cover' style={{ flex: 1, }} source={require('./BackGroundImageMain1.jpeg')}>
                <View style={{ flex: 1, backgroundColor: '#0003' }}>

                    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding090 '>
                        <SafeAreaView style={styles.container}>
                            <TouchableOpacity style={{ position: 'absolute', top: hp(3), right: wp(3), zIndex: 10 }} onPress={this.props.closeModal}>
                                <AntDesign name="close" size={hp(4)} color={Colors.white} />


                            </TouchableOpacity>

                            <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                                <View>
                                    <Text style={styles.title}>
                                        {list.name}
                                    </Text>
                                    <Text style={styles.taskCount}>
                                        {completedCount} of {taskCount} tasks
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.section, { flex: 4 }]}>

                                <FlatList data={list.todos}
                                    renderItem={({ item, index }) => this.renderTodo(item, index)}
                                    keyExtractor={item => item.title}
                                    contentContainerStyle={{ paddingHorizontal: wp(1), paddingVertical: hp(2) }}
                                    showsVerticalScrollIndicator={false}
                                />

                            </View>


                            <View style={[styles.section, styles.footer]} >
                                <TextInput value={this.state.newTodo} style={[styles.input, { borderColor: list.color }]} onChangeText={text => this.setState({ newTodo: text })} />
                                <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                                    <AntDesign name="plus" size={hp(6)} color={'white'} />
                                </TouchableOpacity>
                            </View>

                        </SafeAreaView>
                    </KeyboardAvoidingView>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0005'
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {

        justifyContent: 'flex-end',
        marginLeft: wp(6.5),

        borderBottomWidth: wp(2),
    },
    title: {
        fontSize: hp(4),
        fontWeight: '800',
        color: Colors.white,
    },
    taskCount: {
        marginTop: hp(1),
        marginBottom: hp(4),
        color: Colors.lightGray,
        fontWeight: '700',
        fontSize: hp(2.5),
    },
    footer: {
        paddingHorizontal: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: hp(6.5),
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: wp(2),
        marginRight: wp(2),
        paddingHorizontal: wp(3),
        color: Colors.white,
        fontSize: hp(3),
    },
    addTodo: {
        borderRadius: wp(2.5),
        padding: wp(1.5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: wp(3),
       
        flexDirection: 'row',
        alignItems: 'center',
    },
    todo: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: wp(5.5),
    }

})