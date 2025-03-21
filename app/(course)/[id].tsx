import { Course } from "@/constants/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

const courses: Record<string, Course> = {
  "1": {
    id: "1",
    code: "CS101",
    name: "Lập trình C",
    session: "Thứ 2 - 10:00 AM",
    room: "Phòng A101",
    lecturer: "Thầy Nam",
  },
  "2": {
    id: "2",
    code: "CS102",
    name: "Lập trình Java",
    session: "Thứ 3 - 2:00 PM",
    room: "Phòng B202",
    lecturer: "Cô Lan",
  },
  "3": {
    id: "3",
    code: "CS103",
    name: "Lập trình Web",
    session: "Thứ 5 - 8:00 AM",
    room: "Phòng C303",
    lecturer: "Thầy Huy",
  },
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = courses[id];

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Chi tiết lớp ${course?.code}`,
      headerShown: true,
      headerTitleAlign: "center",
      headerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "white",
      },
    });
  }, [navigation]);

  if (!course) {
    return (
      <View className="flex-1 p-6 bg-white">
        <Text className="text-lg text-red-500">Không tìm thấy lớp học!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">{course.name}</Text>
      <Text className="text-lg">
        📌 Mã môn: <Text className="font-bold">{course.code}</Text>
      </Text>
      <Text className="text-lg">
        👨‍🏫 Giảng viên: <Text className="font-bold">{course.lecturer}</Text>
      </Text>
      <Text className="text-lg">
        📅 Buổi học: <Text className="font-bold">{course.session}</Text>
      </Text>
      <Text className="text-lg">
        🏫 Phòng học: <Text className="font-bold">{course.room}</Text>
      </Text>
    </View>
  );
}
