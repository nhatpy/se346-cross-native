import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Course } from "@/constants/types";

const courses: Course[] = [
  {
    id: "1",
    code: "CS101",
    name: "Lập trình C",
    session: "Thứ 2 - 10:00 AM",
    room: "Phòng A101",
    lecturer: "Thầy Nam",
  },
  {
    id: "2",
    code: "CS102",
    name: "Lập trình Java",
    session: "Thứ 3 - 2:00 PM",
    room: "Phòng B202",
    lecturer: "Cô Lan",
  },
  {
    id: "3",
    code: "CS103",
    name: "Lập trình Web",
    session: "Thứ 5 - 8:00 AM",
    room: "Phòng C303",
    lecturer: "Thầy Huy",
  },
];

export default function CourseListScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 mb-3 bg-gray-100 rounded-lg border border-gray-300"
            onPress={() => router.push(`/(course)/${item.id}`)}
          >
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-600">📅 {item.session}</Text>
            <Text className="text-gray-600">🏫 {item.room}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
