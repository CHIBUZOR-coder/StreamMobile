import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const register = () => {
  const router = useRouter();
  type PickedImage = {
    uri: string;
    name: string;
    size: number;
  } | null;
  const [pickedImage, setPickedImage] = useState<PickedImage>(null);

  useEffect(() => {
    console.log("image:", pickedImage);
  }, [pickedImage]);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    userName: "",
    name: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const pickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("We need permission to access your photos.");
  //     return;
  //   }
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true, // ✅ allows cropping
  //     quality: 1,
  //     base64: true,
  //   });

  //   if (!result.canceled) {
  //     const image = result.assets[0];
  //     setPickedImage({
  //       uri: image.uri,
  //       name: image.fileName || "selected-image.jpg",
  //       size: image.fileSize || 0,
  //     });
  //   } else {
  //     console.log("Image picking cancelled");
  //   }
  // };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("We need permission to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // ✅ use string array instead of MediaTypeOptions
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setPickedImage({
        uri: image.uri,
        name: image.fileName || "selected-image.jpg",
        size: image.fileSize || 0,
      });
    } else {
      console.log("Image picking cancelled");
    }
  };

  const { email, phone, userName, name, password, confirmpassword } = formData;

  const {
    fetchUser,
    userData,
    userError,
    userLoading,
    userModalVisible,
    success,
  } = useUserStore();

  const HandleRegister = () => {
    const image = pickedImage ? pickedImage : null;

    fetchUser(email, phone, userName, name, password, confirmpassword, image);
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setModalVisible(userModalVisible);
  }, [userModalVisible]);
  return (
    <SafeAreaView className="flex-1 bg-primary  flex flex-col justify-center items-center relative">
      {/* Loading Overlay */}
      {userLoading && (
        <View className="absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}

      {modalVisible && (
        <View className="absolute  w-full h-full bg-trans2 z-50 flex justify-center items-center">
          {userData ? (
            <Modal
              // visible={modalVisible}
              transparent={true}
              animationType="fade"
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                   router.push({ pathname: "/" });
                }}
                className="flex-1 bg-trans2 justify-center items-center"
              >
                {userError ? (
                  <View>{userError && userError}</View>
                ) : success ? (
                  <View className="bg-white rounded-md w-[80%] h-[300px] p-4 flex justify-center items-center">
                    <Text className="text-black font-semibold">
                      {success && success}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </Modal>
          ) : (
            <Text>nothing</Text>
          )}
        </View>
      )}
      <ScrollView className="w-full px-6">
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

          <View className="rounded-md border-[2px] border-border w-full  ">
            <TextInput
              className="w-full p-2 bg-primary rounded-md text-gray-500 "
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => {
                handleChange("name", text);
                console.log("name:", text);
              }}
              placeholderTextColor={"gray"}
            />
          </View>
          <View className="rounded-md border-[2px] border-border w-full   ">
            <TextInput
              className="w-full p-2 bg-primary rounded-md  text-gray-500 "
              placeholder="User Name"
              value={formData.userName}
              onChangeText={(text) => {
                handleChange("userName", text);
                console.log("userName:", text);
              }}
              placeholderTextColor={"gray"}
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
          <View className="rounded-md border-[2px] border-border w-full   ">
            <TextInput
              className="w-full p-2 bg-primary rounded-md text-gray-500 "
              value={formData.phone}
              onChangeText={(text) => {
                handleChange("phone", text);
                console.log("phone:", text);
              }}
              placeholder="09074639302"
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
          <View className="rounded-md border-[2px] border-border w-full  ">
            <TextInput
              className="w-full p-2 bg-primary rounded-md text-gray-500 "
              value={formData.confirmpassword}
              secureTextEntry={true}
              onChangeText={(text) => {
                handleChange("confirmpassword", text);
                console.log("confirm:", text);
              }}
              placeholder="Confirmpassword"
              placeholderTextColor={"gray"}
            />
          </View>

          <View className="rounded-lg w-full border-[2px] border-border">
            {pickedImage ? (
              <TouchableOpacity
                onPress={pickImage}
                style={{ alignItems: "center" }}
                className=" p-2"
              >
                <View className="w-full overflow-hidden rounded-md relative h-[200px]">
                  <Image
                    source={{ uri: pickedImage.uri }}
                    resizeMode="cover"
                    className="absolute left-0 top-0 w-full h-full"
                  />
                </View>
                <Text style={{ marginTop: 8, color: "white" }}>
                  Tap to change image
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                className="rounded-md relative w-full py-4 bg-primary overflow-hidden flex flex-row justify-center items-center"
              >
                <Ionicons
                  name="image"
                  size={40}
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <Text
                  className="text-gray-500 font-semibold"
                  style={{ color: "white", fontSize: 20 }}
                >
                  Add an image
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              HandleRegister();
            }}
            className="w-full bg-subMain rounded-md p-4 justify-center items-center"
          >
            <Text className="font-semibold text-white">Submit</Text>
          </TouchableOpacity>
        </View>

        <View className="w-full flex flex-row justify-center items-center gap-4 mb-48 p-4 ">
          <Text className="font-semibold text-lg text-white">
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push({ pathname: "/pages/login" });
            }}
          >
            <Text className="font-semibold text-lg text-white">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default register;
