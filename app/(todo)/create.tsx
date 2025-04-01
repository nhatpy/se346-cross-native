import { Text, TextInput, Button, SafeAreaView } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const CreateTodoScreen = () => {
  const [newTodo, setNewTodo] = useState("");
  const router = useRouter();

  const addTodo = async () => {
    if (newTodo.trim()) {
      const newEntry: Todo = {
        id: Math.random(),
        text: newTodo,
        completed: false,
      };
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        let todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
        todos.push(newEntry);
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
        setNewTodo("");
        router.push("/(todo)");
        console.log("Todo added successfully");
      } catch (error) {
        console.error("Error saving todo:", error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      <Text className="text-lg font-bold">Create New Todo</Text>
      <TextInput
        placeholder="Enter new todo"
        value={newTodo}
        onChangeText={setNewTodo}
        className="border p-2 w-3/4 my-2"
      />
      <Button title="Save" onPress={addTodo} />
    </SafeAreaView>
  );
};

export default CreateTodoScreen;
