import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'


import { ItemWrapper } from './ItemWrapper';


interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, updatedTaskText: string) => void;
  task: any
}

export function TaskItem({ toggleTaskDone, removeTask, editTask, task }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [taskUpdatedText, setTaskUpdatedText] = useState<string>(task.title);

  const textInputRef = useRef<TextInput>(null)

  const handleStartEditing = () => setIsUpdating(true);
  const handleCancelEditing = () => {
    setTaskUpdatedText(task.title);
    setIsUpdating(false)
  };

  const handleSubmitEditing = () => {
    editTask(task.id, taskUpdatedText);
    setIsUpdating(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isUpdating) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isUpdating])

  console.log('isUpdating', isUpdating)

  return (
    <ItemWrapper index={task.id}>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${task.id}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker } 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          {!isUpdating ? (
            <Text style={task.done ? styles.taskTextDone : styles.taskText}>
              {task.title}
            </Text> 
            ) : (
              <TextInput 
                ref={textInputRef}
                value={taskUpdatedText} 
                onChangeText={(text) => setTaskUpdatedText(text)}
                editable={isUpdating}
                onSubmitEditing={handleSubmitEditing}
                style={task.done ? styles.taskTextDone : styles.taskText}
              />
            )}
        </TouchableOpacity>
      </View>
        {isUpdating && (
          <TouchableOpacity
            testID={`trash-${task.id}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleCancelEditing()}
          >
            <Text> 
              <Icon 
                name="x"
                size={24}
                color="#4b4b4b"
              />
            </Text>
          </TouchableOpacity>
        )}
        {!isUpdating && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              testID={`trash-${task.id}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => handleStartEditing()}
            >
               <Icon 
                name="edit-2"
                size={16}
                color="#4b4b4b"
              />
            </TouchableOpacity>
            <TouchableOpacity
              testID={`trash-${task.id}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(task.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </View>
        )}
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: -28,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
  },
  addButton: {
    backgroundColor: '#FFF',
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
});