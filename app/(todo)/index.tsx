import { Text, Button, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect, useRouter } from "expo-router";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const ViewTodoScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();

  useFocusEffect(() => {
    loadTodos();
  });

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) setTodos(JSON.parse(storedTodos));
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const clearTodos = async () => {
    try {
      await AsyncStorage.removeItem("todos");
      setTodos([]);
    } catch (error) {
      console.error("Error clearing todos:", error);
    }
  };

  const handleCreateTodo = () => {
    router.push("/(todo)/create");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-base my-1">{item.text}</Text>
        )}
        className="my-2"
      />
      <Button title="Clear All" color="red" onPress={clearTodos} />
      <Button title="Create Todo" onPress={handleCreateTodo} />
    </SafeAreaView>
  );
};

export default ViewTodoScreen;
