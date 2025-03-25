import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Employee } from "@/constants/types";

export default function CourseListScreen() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [isDataChange, setIsDataChange] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://blackntt.net:88/api/v1/employees");
      const data = await response.json();
      setEmployees(data);
    };
    fetchData();
  }, [isDataChange]);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeAge, setEmployeeAge] = useState<string>("");
  const [employeeSalary, setEmployeeSalary] = useState<string>("");
  const [profile_image] = useState<string>("");

  const handleToggle = () => {
    setIsDataChange(!isDataChange);
  };

  const createNewEmployee = async () => {
    const updatedData = {
      employee_name: employeeName,
      employee_age: parseInt(employeeAge) || 0,
      employee_salary: parseInt(employeeSalary) || 0,
      profile_image: profile_image,
    };

    const response = await fetch("http://blackntt.net:88/api/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log(data);
    handleToggle();
    setIsModalOpened(false);
  };

  return (
    <>
      <View className="flex-1 p-4 bg-white">
        <TouchableOpacity
          onPress={() => setIsModalOpened(true)}
          className="bg-green-500 p-3 rounded-md mb-4"
        >
          <Text className="text-white text-center font-semibold">
            Thêm thông tin nhân viên
          </Text>
        </TouchableOpacity>
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 mb-3 bg-gray-100 rounded-lg border border-gray-300"
              onPress={() => router.push(`/(employee)/${item.id}`)}
            >
              <Text className="text-lg font-bold">Mã nhân viên {item.id}</Text>
              <Text className="text-gray-600">
                Tên nhân viên {item.employee_name}
              </Text>
              <Text className="text-gray-600">
                Độ tuổi: {item.employee_age}
              </Text>
              <Text className="text-gray-600">
                Mức lương hiện tại: {item.employee_salary}
              </Text>
              <Image
                source={{ uri: item.profile_image }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          )}
        />
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
                onPress={createNewEmployee}
                className="bg-blue-500 flex-1 p-3 rounded-md"
              >
                <Text className="text-white text-center font-semibold">
                  Tạo mới
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
