import React from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: string, updatedTask: string) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <TaskItem 
        task={item} 
        editTask={editTask}
        removeTask={removeTask} 
        toggleTaskDone={toggleTaskDone}
      />}
      style={{
        marginTop: 32
      }}
    />
  )
}