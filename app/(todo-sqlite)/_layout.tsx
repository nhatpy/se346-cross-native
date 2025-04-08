import { Stack } from "expo-router";

export default function TodoSQLiteLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Danh sách các todo" }} />
      <Stack.Screen name="create" options={{ title: "Thêm todo" }} />
    </Stack>
  );
}
