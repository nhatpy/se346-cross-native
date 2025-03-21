import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    if (username === "User1" && password === "123456") {
      setMessage("");
      router.push("/(course)");
    } else setMessage("Invalid username or password");
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-2xl font-bold mb-7">Login</Text>

      <View className="w-full mb-4">
        <Text className="text-sm font-bold mb-1">Username</Text>
        <TextInput
          className="w-full h-11 border border-black rounded-lg px-3 text-base"
          placeholder="Your Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-sm font-bold mb-1">Password</Text>
        <TextInput
          className="w-full h-11 border border-black rounded-lg px-3 text-base"
          secureTextEntry
          placeholder="Your Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        className="w-full bg-black py-4 rounded-lg items-center mt-5"
        onPress={handleLogin}
      >
        <Text className="text-white text-base font-bold">
          Confirm and Continue
        </Text>
      </TouchableOpacity>

      {message !== "" && (
        <Text className="mt-5 text-base font-bold text-red-500">{message}</Text>
      )}
    </View>
  );
}
