import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find(task => task.title === newTaskTitle);

    if(taskExists) return Alert.alert(
      'Task já cadastrada',
      'Você não pode cadastrar uma task com o mesmo nome'
    )

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    const newTasks = tasks.map(task => {
      if(task.id !== id) return task;

      task.done = !task.done;

      return task
    })

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item',
      [
        {
          text: 'Sim',
          onPress: () => {
            const tasksFiltered = tasks.filter(task => task.id !== id);

            setTasks(tasksFiltered);
          }
        },
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
      ]
    )

    
  }

  function handleEditTask(id: number, updatedTaskText: string) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    const task = tasks[taskIndex]
    
    if(!task) return;

    const updatedTasks = tasks.map(task => {
      if(task.id !== id) return task;

      task.title = updatedTaskText;

      return task;
    });

    setTasks(updatedTasks); 
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})