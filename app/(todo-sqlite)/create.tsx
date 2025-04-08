import React, { useState, useEffect } from "react";
import { Text, TextInput, Button, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { getDBConnection, createTables, insertTodo } from "@/lib/database";

const CreateTodoScreen: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    createTables();
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      insertTodo(newTodo, false, () => {
        setNewTodo("");
        router.push("/(todo)");
      });
    }
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
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Create New Todo</Text>
      <TextInput
        placeholder="Enter new todo"
        value={newTodo}
        onChangeText={setNewTodo}
        style={{ borderWidth: 1, padding: 8, width: "75%", marginVertical: 8 }}
      />
      <Button title="Save" onPress={addTodo} />
    </SafeAreaView>
  );
};

export default CreateTodoScreen;
