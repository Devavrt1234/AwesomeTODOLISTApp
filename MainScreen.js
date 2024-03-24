import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator, Alert } from 'react-native';
import Colors from '../Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import React from 'react';
import tempData from '../TemPData';
import { AntDesign } from '@expo/vector-icons';
import TodoList from './TodoList';
import AddListModal from './AddListModal';
import { getFirestore, collection, addDoc, initializeFirestore, doc, updateDoc, deleteDoc, db } from '../Fire';
import { LogBox } from 'react-native';
import { collectionGroup, getDocs, setDoc, deleteField, QuerySnapshot } from '@firebase/firestore';
import { firebase } from 'firebase/compat/app'

// import 'firbase/compat/auth'



LogBox.ignoreAllLogs();
export default class App extends React.Component {


  state = {
    addTodoVisible: false,
    lists: tempData,
    fetchedlists: [],

  }



  addTodoLists = async (list) => {

    try {

      // console.log(list.todos[list.todos.length-1])



      const docRef = doc(db, 'users', "0GHDv4QlMr8TCgKr17dk");


      const data = {


        // lists: [...this.state.lists],

        // isAdded: true,

        isAdded:true,
        color:list.color,
        name:list.name,
        todos:list.todos,
        

      }
 


      setDoc(docRef, data)
        .then(docRef => {



          console.log("Entire Document has been updated successfully", docRef.id);
        })

      //  setTitle("");
    } catch (e) {
      console.error('Error adding document', e);
    }


    // this.getTodoList();
    setTitle("");

  }


  // deleteTheListsFieldfromserver = () => {

  //   const docRef = doc(db, "users", "0GHDv4QlMr8TCgKr17dk");

  //   const data = {

      
  //     isAdded:false,
  //     color:lists.todos.color,
  //     name:lists.name,
  //     todos:list.todos, 
     

  //   }

  //   updateDoc(docRef, data)
  //     .then(() => {
  //       console.log("Code Field has been deleted successfully");
  //     })
  //     .catch(() => {
  //       console.log(error);
  //     })

  //   this.getTodoList();
  //   // setTitle("");

  // }



  getTodoList = async () => {


    const docRef = collection(db, "users");

    // console.log(docRef)
    const QuerySnapshot = await getDocs(docRef);

    // console.log(db)
    // TO GET SUB COLLECTION FROM FIREBASE DATABASE

    // if (docSnap.exists()) {
    //   // console.log(docSnap.data());

    //   this.setState({ fetchedlists: { ...docSnap.data() } })

    QuerySnapshot.forEach((doc)=>{

      console.log(doc.id,"==>",doc.data())
      this.setState({ fetchedlists: [{ ...doc.data() }] })
    })

      // console.log(this.state.fetchedlists[2].todos)
    } 

    

  




  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }



  // fetch or read the data from firestore


  renderList = (list) => {
    return (
      <TodoList list={list} lists={this.state.lists}   addTodoLists={this.addTodoLists} />

    )


  }

  renderList1 = (list) => {
    return (
      <TodoList list={list} getTodoList={this.getTodoList} addTodoLists={this.addTodoLists} />

    )


  }

  addList = (list) => {
    this.setState({ lists: [...this.state.lists, { ...list, id: Math.floor(Math.random() * 100) + 1, todos: [] }] })

    console.log(this.state.lists);
  }


  deletelastlistonebyone = () => {

    this.state.lists.pop()

  }




  render() {




    return (
      <ImageBackground resizeMode='cover' style={{ flex: 1 }} source={require('../assets/Todoimage.jpg')}>


        <View style={styles.container}>
          <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
            <AddListModal closeModal={() => this.toggleAddTodoModal()} addTodoLists={this.addTodoLists} getTodoList={this.getTodoList} addList={this.addList} />
          </Modal>

          <View style={{ marginVertical: wp(4), position: 'absolute', top: hp(3), left: wp(3) }}>
            <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
              <AntDesign name="plus" size={hp(5.5)} color={'#fff'} />
            </TouchableOpacity>



          </View>

          <Text style={[styles.add, { color: '#00ff00', }]}>Add/<Text style={{ color: 'crimson' }}>Delete</Text></Text>

          <View style={{ marginVertical: wp(4), position: 'absolute', top: hp(3), right: wp(2) }}>
            <TouchableOpacity style={{
              borderColor: 'crimson', borderWidth: wp(2), padding: wp(2), alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff4',
              borderRadius: wp(6),
            }} onPress={() => { this.deletelastlistonebyone() }}>
              <AntDesign name="minus" size={hp(5.5)} color={'#fff'} />
            </TouchableOpacity>



          </View>


          {
            this.state.fetchedlists.length !== 0 ?
              <View style={{ height: hp(45), paddingLeft: wp(3), marginBottom: hp(2) }}>
                <FlatList data={this.state.fetchedlists} keyExtractor={item => item.name} horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    this.renderList1(item)
                  )}
                />
              </View> :


              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.historyadd, { color: 'white' }]}>Please...Press Button to See your Saved List</Text>
                
                <ActivityIndicator style={{ position: 'absolute', top: hp(35), borderColor: 'transparent', backgroundColor: '#0002', borderWidth: 6, borderRadius: 100,margin:wp(2) }} color={'crimson'} size={150} />
                {/* <ActivityIndicator  style={{position:'absolute',top:hp(33)}} color={'white'} size={250} /> */}





              </View>


          }
          <TouchableOpacity style={{ backgroundColor: 'crimson', borderRadius: 20, marginBottom: hp(1), borderColor: 'black', borderRightWidth: wp(2), borderBottomWidth: wp(2) }} onPress={()=> this.getTodoList()}>
            <Text style={styles.titleadd}>
               Press me To Save Lists & See..
            </Text>
          </TouchableOpacity>

          <View style={{ height: hp(20), paddingLeft: wp(2), marginBottom: hp(4) }}>
            <FlatList data={this.state.lists} keyExtractor={item => item.name} horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                this.renderList(item)
              )}
            />
          </View>




        </View>



      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0007',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: hp(2),
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: wp(9),
    fontWeight: '800',
    color: '#000',
    paddingHorizontal: wp(4),
  },
  addList: {
    borderWidth: wp(2),
    borderColor: '#00ff00',
    borderRadius: wp(6),
    padding: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff4',
  },
  add: {

    fontWeight: '900',
    fontSize: wp(6.7),
    // marginTop:hp(2),
    // marginBottom:hp(3),
    top: hp(6),
    position: 'absolute',
    marginLeft: wp(3.6),

  },
  titleadd: {

    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp(2),
    fontStyle: 'italic',
    textAlign: 'justify',
    padding: wp(2),

  },
  historyadd: {
    fontWeight: '900',
    fontSize: wp(6.7),

    marginLeft: wp(3.6),
  }

});


