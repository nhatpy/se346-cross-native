import { Stack } from "expo-router";

export default function EmployeeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Danh sách nhân viên" }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
