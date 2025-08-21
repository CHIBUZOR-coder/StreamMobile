import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useUserStore } from "@/store/useUserStore";

const accoutRecovery = () => {
  const router = useRouter();

  const {
    userError,
    userLoading,
    userData,
    LoginUsers,
    success,
    userModalVisible,
    logout,
  } = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const HandleLogin = () => {
    LoginUsers(email, password);
  };
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    setModalVisible(userModalVisible);
  }, [userModalVisible]);
  useEffect(() => {
    console.log("success:", success);
  }, [success]);

  return (
    <SafeAreaView className="flex-1 bg-primary  flex flex-col justify-center items-center relative">
      {userLoading && (
        <View className="absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}

      <View className="absolute top-2 left-2 w-1/5  justify-center items-center p-2 h-20">
        <TouchableOpacity
          style={{
            boxShadow: "0px 0px 6px 3px rgba(255, 255, 255, 0.5)",
          }}
          onPress={() => {
            router.back();
          }}
          className="h-14 w-14 z-10 absolute  rounded-full border-2 border-light-100 flex justify-center items-center"
        >
          <Ionicons name="arrow-back" size={28} color={"#D6C6FF"} />
        </TouchableOpacity>

        <View className="h-16 w-16 absolute animate-ping  rounded-full bg-light-100  flex justify-center items-center"></View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Android back button
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-trans2 flex justify-center items-center">
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(false);
                success ? router.push({ pathname: "/" }) : "";
              }}
            >
              <View className="bg-white rounded-md w-[80%] p-4  min-h-[200px] flex justify-center items-center">
                {userError && (
                  <Text className="font-semibold text-center">
                    {userError && userError}
                  </Text>
                )}
                {success && (
                  <Text className="text-black font-semibold text-center">
                    {success && success}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView
        className="w-full px-6 "
        contentContainerStyle={{
          flexGrow: 1, // Fill screen height
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
        }}
      >
        <View className="w-full flex flex-col justify-center items-center  flex-1">
          <View className="bg-dark-100 border-[2px] border-white  rounded-md p-4 mt-12 flex justify-center items-center gap-5 w-full ">
            <View className=" rounded-full relative  h-20 w-20 bg-red-500">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dtjgj2odu/image/upload/v1739151976/logoround_awixqx.png",
                }}
                resizeMode="cover"
                className="absolute w-20 h-20 top-0 left-0"
              />
            </View>

            <View className="rounded-md border-[2px] border-border w-full   ">
              <TextInput
                className="w-full p-2 bg-primary rounded-md text-gray-500 "
                value={formData.email}
                onChangeText={(text) => {
                  handleChange("email", text);
                  console.log("email:", text);
                }}
                placeholder="samex@gmail.com"
                placeholderTextColor={"gray"}
              />
            </View>

            <View className="rounded-md border-[2px] border-border w-full    ">
              <TextInput
                className="w-full p-2 bg-primary rounded-md text-gray-500 "
                value={formData.password}
                secureTextEntry={true}
                onChangeText={(text) => {
                  handleChange("password", text);
                  console.log("password:", text);
                }}
                placeholder="password"
                placeholderTextColor={"gray"}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                HandleLogin();
              }}
              className="w-full bg-subMain rounded-md p-4 justify-center items-center"
            >
              <Text className="font-semibold text-white">Submit</Text>
            </TouchableOpacity>
          </View>

          <View className="w-full flex flex-row justify-center items-center gap-4 mb-48 p-4 ">
            <Text className="font-semibold text-lg text-white">
              Donn't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: "/pages/register" });
              }}
            >
              <Text className="font-semibold text-lg text-white">Signup</Text>
            </TouchableOpacity>
          </View>
          <View className="w-full flex flex-row justify-center items-center gap-4 mb-48 p-4 ">
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: "/pages/register" });
              }}
            >
              <Text className="font-semibold text-lg text-white">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default accoutRecovery;
