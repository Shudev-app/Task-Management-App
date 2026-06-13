import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { FlatList, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const [task,setTask] = useState('');
  const [todos,setTodos] = useState<{task: string; done: boolean}[]>([]);

  function addTodo() {

    if (task === '') return;

    setTodos([...todos,{
      task: task,
      done: false,
    }]);
    setTask('');
    setTimeout(() => {
      Keyboard.dismiss();
    },50)
   
  };

  function delTodos(indexDel:number) {
    const newTodos = todos.filter((todo,index) => {
      return index !== indexDel;
    });
    setTodos(newTodos);
  };

  function editTodos(indexEdit: number) {
    setTask(todos[indexEdit].task);

    const newTodos = todos.filter((todo,index) => {
      return index !== indexEdit;
    })
    setTodos(newTodos);
  };

  function toggleDone(indexToggle:number) {
    const newTodos = [...todos];
    newTodos[indexToggle].done = !todos[indexToggle].done;

    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{'<To Do>'}</Text>

      <TextInput
      placeholder='タスクを入力'
      value={task}
      onChangeText={setTask}
      style={styles.input}
      />
  
      <Pressable onPress={addTodo} style={styles.addButton}>
        <Text style={styles.addButtonText}>追加</Text>
      </Pressable>
 

      <FlatList 
        data={todos}
        renderItem={({item,index}) => (

          <View key={index} style={styles.TaskCard}>
            <Checkbox value={item.done} onValueChange={() => {toggleDone(index);}}  style={styles.checkbox}/>
            <View style={styles.printTaskTextview}>
              <Text style={{
                fontSize: 18,
                textDecorationLine: 
                  item.done
                    ? 'line-through'
                    : 'none',}}
              >
                {item.task}
              </Text>
            </View>
            
            <View style={styles.buttons}>
              <Pressable onPress={() => {editTodos(index)}} style={styles.taskButtonPushArea}>
                <Image source={require("../assets/images/editicon.png")} style={styles.image} />
              </Pressable>

              <Pressable onPress={() => {delTodos(index)}} style={styles.taskButtonPushArea}>
                <Image source={require("../assets/images/delicon.png")} style={styles.image} />
              </Pressable>
            </View>

          </View>
        )}
      />

    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  input: {
    borderWidth:1,
    padding:10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  TaskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3,
  },
  checkbox: {
    marginHorizontal: 5,
  },
  printTaskTextview: {
    flex: 1,
    flexShrink: 1,
  },
  buttons: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  taskButtonPushArea: {
    padding: 6,
  },
  image: {
    width: 24,
    height: 24,
  },

});






