import { Stack } from "expo-router";

export default function CourseLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Danh sách phòng học" }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
