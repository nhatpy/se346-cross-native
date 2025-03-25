import { Employee } from "@/constants/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Chi tiết nhân viên " + id,
      headerShown: true,
      headerTitleAlign: "center",
      headerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "white",
      },
    });
  }, [navigation]);

  const [employee, setEmployee] = useState<Employee | null>(null);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeAge, setEmployeeAge] = useState<string>("");
  const [employeeSalary, setEmployeeSalary] = useState<string>("");
  const [profile_image, setProfile_image] = useState<string>("");

  const [isDataChange, setIsDataChange] = useState<boolean>(false);
  const handleToggle = () => {
    setIsDataChange(!isDataChange);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://blackntt.net:88/api/v1/employee/${id}`
        );
        const data = await response.json();
        setEmployee(data);
        setEmployeeName(data.employee_name || "");
        setEmployeeAge(data.employee_age?.toString() || "");
        setEmployeeSalary(data.employee_salary?.toString() || "");
        setProfile_image(data.profile_image || "");
        console.log(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, [isDataChange]);

  const updateEmployee = async () => {
    if (!employee) return;

    const updatedData = {
      employee_name: employeeName,
      employee_age: parseInt(employeeAge) || 0,
      employee_salary: parseInt(employeeSalary) || 0,
      profile_image: profile_image,
    };

    try {
      await fetch(`http://blackntt.net:88/api/v1/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      handleToggle();
      setIsModalOpened(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const deleteEmployee = async () => {
    if (!employee) return;

    try {
      await fetch(`http://blackntt.net:88/api/v1/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleDelete = () => {
    deleteEmployee();
    router.push("/(employee)");
  };

  return (
    <ScrollView className="flex-1 p-6 bg-gray-100">
      <View className="bg-white shadow-md rounded-lg p-6">
        <TouchableOpacity
          onPress={() => setIsModalOpened(true)}
          className="bg-blue-500 p-3 rounded-md mb-4"
        >
          <Text className="text-white text-center font-semibold">
            Cập nhật thông tin nhân viên
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteEmployee}
          className="bg-red-500 p-3 rounded-md mb-4"
        >
          <Text className="text-white text-center font-semibold">
            Xóa thông tin nhân viên
          </Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold">Mã nhân viên: {employee?.id}</Text>
        <Text className="text-gray-600 text-base">
          Tên: {employee?.employee_name}
        </Text>
        <Text className="text-gray-600 text-base">
          Độ tuổi: {employee?.employee_age}
        </Text>
        <Text className="text-gray-600 text-base">
          Mức lương: {employee?.employee_salary}
        </Text>

        {employee?.profile_image && (
          <Image
            source={{ uri: employee.profile_image }}
            className="w-24 h-24 rounded-full mt-4 mx-auto"
          />
        )}
      </View>

      <Modal visible={isModalOpened} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 w-4/5 rounded-lg shadow-lg">
            <Text className="text-lg font-bold mb-4 text-center">
              Cập nhật nhân viên
            </Text>

            <TextInput
              className="border border-gray-300 p-3 rounded-md mb-2"
              placeholder="Tên nhân viên"
              value={employeeName}
              onChangeText={setEmployeeName}
            />

            <TextInput
              className="border border-gray-300 p-3 rounded-md mb-2"
              placeholder="Độ tuổi"
              value={employeeAge}
              onChangeText={setEmployeeAge}
              keyboardType="numeric"
            />

            <TextInput
              className="border border-gray-300 p-3 rounded-md mb-2"
              placeholder="Mức lương"
              value={employeeSalary}
              onChangeText={setEmployeeSalary}
              keyboardType="numeric"
            />

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => setIsModalOpened(false)}
                className="bg-gray-400 flex-1 p-3 rounded-md mr-2"
              >
                <Text className="text-white text-center font-semibold">
                  Hủy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={updateEmployee}
                className="bg-blue-500 flex-1 p-3 rounded-md"
              >
                <Text className="text-white text-center font-semibold">
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
