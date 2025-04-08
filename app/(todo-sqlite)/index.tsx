import React, { useState, useEffect } from "react";
import { Text, Button, FlatList, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import {
  getDBConnection,
  createTables,
  loadTodos,
  clearAllTodos,
  Todo,
} from "@/lib/database";

const ViewTodoScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const db = getDBConnection();
        createTables();
        loadTodos(setTodos);
      } catch (error) {
        console.error("Error initializing DB:", error);
      }
    };

    init();
  }, []);

  const handleClearTodos = async () => {
    try {
      const db = getDBConnection();
      clearAllTodos(() => setTodos([]));
    } catch (error) {
      console.error("Error clearing todos:", error);
    }
  };

  const handleCreateTodo = () => {
    router.push("/(todo)/create");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16, marginVertical: 4 }}>{item.text}</Text>
        )}
        style={{ marginVertical: 8 }}
      />
      <Button title="Clear All" color="red" onPress={handleClearTodos} />
      <Button title="Create Todo" onPress={handleCreateTodo} />
    </SafeAreaView>
  );
};

export default ViewTodoScreen;
