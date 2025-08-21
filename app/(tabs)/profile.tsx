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
import React, { ReactNode, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { types } from "@babel/core";
import watch from "../pages/watch";

const profile = () => {
  const router = useRouter();
  type Navlinks = {
    title: string;
    icon: ReactNode; // 👈 can be any React element (e.g. <Ionicons />)
  };

  const {
    userData,
    favouriteMovies,
    getFavouriteMovies,
    userLoading,
    getWatchCount,
    watchedMovies,
  } = useUserStore();

  useEffect(() => {
    getFavouriteMovies(userData?.name);
    getWatchCount(userData?.name);
    // console.log("pro:", userData?.name);
  }, []);

  // useEffect(() => {
  //   console.log("length:", favouriteMovies?.favouriteCartMovies?.length);
  // }, [favouriteMovies]);

  return (
    <SafeAreaView className="flex-1 bg-primary  flex flex-col justify-start items-center relative p-4">
      <ScrollView className="">
        {userLoading && (
          <View className="absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
        <View className="flex-1 mb-28">
          <View className=" bg-drkb rounded-md   w-full  p-6">
            <View className="bg-primary border-[2px] rounded-md border-light-100  flex justify-center items-center p-4 gap-[2px]">
              <View className="">
                <Image
                  className=" h-28 w-28 rounded-full"
                  source={{
                    uri: `${userData?.image}`,
                  }}
                />
              </View>

              <Text className=" text-white font-bold text-lg">
                {userData?.userName}
              </Text>
              <Text className=" text-white ">{userData?.email}</Text>
              <View className="flex flex-row justify-center items-start">
                <Ionicons name="phone-portrait" size={18} color={"white"} />
                <Text className=" text-white ">{userData?.phone}</Text>
              </View>
            </View>

            <View className="flex justify-between items-center gap-4 mt-6 flex-row flex-wrap">
              <TouchableOpacity className=" box  ">
                <Ionicons name="person" size={20} color={"#D6C6FF"} />
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-semibold text-xs"
                >
                  Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="box   rounded-full ">
                <Ionicons name="key" size={20} color={"#D6C6FF"} />
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-semibold text-xs"
                >
                  Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="box  w-32 rounded-full h-32">
                <Ionicons name="log-out" size={20} color={"#D6C6FF"} />
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-semibold text-xs"
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ************ */}

          <View className=" bg-drkb rounded-md flex gap-5   w-full  p-6 mt-12">
            <View className="flex flex-row gap-4 justify-start items-center bg-primary border-[2px] border-light-100 rounded-md p-4">
              <View className="h-16 w-16 rounded-full bg-red-400 shadow-2xl shadow-red-400 flex justify-center items-center">
                <Ionicons name="heart-circle" size={40} color={"white"} />
              </View>
              <View className="flex  justify-center items-center gap-2">
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-semibold text-lg"
                >
                  Total Favourites
                </Text>
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-bold text-lg"
                >
                  {favouriteMovies?.favouriteCartMovies?.length}
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-4 justify-start items-center bg-primary border-[2px] border-light-100 rounded-md p-4">
              <View className="h-16 w-16 rounded-full bg-subMain shadow-2xl shadow-subMain flex justify-center items-center">
                <Ionicons name="chatbox" size={40} color={"white"} />
              </View>
              <View className="flex justify-center items-center gap-2">
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-semibold text-lg"
                >
                  Subscription Details
                </Text>
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-bold text-lg"
                >
                  {userData?.subscription}
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-4 justify-start items-center bg-primary border-[2px] border-light-100 rounded-md p-4">
              <View className="h-16 w-16 rounded-full bg-blue-600 shadow-2xl shadow-blue-600 flex justify-center items-center">
                <Ionicons name="time" size={40} color={"white"} />
              </View>
              <View className="flex justify-center items-center gap-2">
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-semibold text-lg"
                >
                  Watch Count
                </Text>
                <Text
                  style={{ color: "#D6C6FF" }}
                  className=" font-bold text-lg"
                >
                  {watchedMovies?.watchCartMovies?.length}
                </Text>
              </View>
            </View>

            {/* Watch History */}
            <Text className="text-gray-500 font-bold mt-8 ">Watch History</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {/* HEADER */}
                <View className="flex-row gap-4 bg-gray-200 border-b border-gray-300">
                  <View className="w-20 justify-center items-center py-2">
                    <Text className="font-semibold text-black">IMAGE</Text>
                  </View>
                  <View className="w-32 justify-center items-center py-2">
                    <Text className="font-semibold text-black">NAME</Text>
                  </View>
                  <View className="w-32 justify-center items-center py-2">
                    <Text className="font-semibold text-black">CATEGORY</Text>
                  </View>
                  <View className="w-24 justify-center items-center py-2">
                    <Text className="font-semibold text-black">YEAR</Text>
                  </View>
                  <View className="w-24 justify-center items-center py-2">
                    <Text className="font-semibold text-black">HOURS</Text>
                  </View>
                  <View className=" justify-center items-center py-2">
                    <Text className="font-semibold text-black">ACTIONS</Text>
                  </View>
                </View>

                {/* BODY */}
                {watchedMovies?.watchCartMovies?.map((item) => (
                  <View
                    key={item.id}
                    className="flex-row gap-4 p-4 my-2 border-b border-gray-300 items-center"
                  >
                    {/* IMAGE */}
                    <View className="w-20 justify-center items-center py-2">
                      <Image
                        source={{ uri: item?.movie?.image }}
                        className="w-12 h-12 rounded"
                        resizeMode="cover"
                      />
                    </View>

                    {/* NAME */}
                    <View className="w-32 justify-center items-center py-2">
                      <Text
                        numberOfLines={1}
                        className="text-white font-semibold text-center"
                      >
                        {item?.movie?.name}
                      </Text>
                    </View>

                    {/* CATEGORY */}
                    <View className="w-32 justify-center items-center py-2">
                      <Text className="text-white font-semibold text-center">
                        {item?.movie?.category?.tittle}
                      </Text>
                    </View>

                    {/* YEAR */}
                    <View className="w-24 justify-center items-center py-2">
                      <Text className="text-white font-semibold text-center">
                        {item?.movie?.year}
                      </Text>
                    </View>

                    {/* HOURS */}
                    <View className="w-24 justify-center items-center py-2">
                      <Text className="text-white font-semibold text-center">
                        {item?.movie?.time}
                      </Text>
                    </View>
                    {/* ACTIONS */}
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/movies/[id]",
                          params: { id: String(item?.movie?.id) },
                        });
                      }}
                      className="w-24 justify-center items-center py-5  bg-primary rounded-md border-[2px] border-light-100"
                    >
                      <Ionicons name="eye" size={18} color={"white"} />
                      <Text className="text-white font-semibold text-center">
                        watch
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
