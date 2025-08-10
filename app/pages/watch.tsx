import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { images } from "@/constants/images";
import { useMovieStore } from "@/store/useMovieStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Movie } from "@/interfaces/interfaces";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";

const watch = () => {
  const { singleLoad, singleError, movies, singleMovie, getSingleMovie } =
    useMovieStore();
  const [movie, setMovie] = useState<Movie | null>(null);
  const videoRef = useRef<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoHeight, setVideoHeight] = useState(0);

  const { id } = useLocalSearchParams<{ id: string }>();

  const parsedId = parseInt(id);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const movieId = parseInt(id);
      getSingleMovie("getSingleMovie", movieId);
      console.log("id:", id);
    }
  }, [id]);

  useEffect(() => {
    if (singleMovie) {
      setMovie(singleMovie);
      console.log("singlemovieee:", singleMovie);
    }
  }, [singleMovie]);


  const truncateWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };


  return (
    <SafeAreaView className="flex-1 relative bg-primary py-20 p-4 ">
      <View className="bg-dark-100 p-4 flex gap-28">
        <View className="bg-primary p-6 flex gap-14 rounded-md border-[1px] border-gray-400">
          <View className=" w-full flex flex-row justify-between ">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className="font-semibold rounded-full border-[2px] relative border-white  flex justify-center items-center"
            >
              <Ionicons name="arrow-back" size={24} color={"white"} />
              <View className="absolute w-full h-full rounded-full bg-light-100 animate-ping"></View>
            </TouchableOpacity>

            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              className="text-white font-semibold text-lg"
            >
              {singleMovie?.name ? truncateWords(singleMovie.name, 3) : ""}
            </Text>
          </View>
          <View className=" w-full flex flex-row justify-between items-center ">
            <View className="font-semibold p-2 rounded-md bg-btn">
              <Ionicons name="heart" size={24} color={"white"} />
            </View>

            <View className="bg-btn p-2 font-semibold text-lg rounded-md">
              <Ionicons name="download" size={24} color={"white"} />
            </View>
          </View>
        </View>

        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setVideoHeight(height); // capture parent width
          }}
          className="video rounded-md h-[200px] border-[2px] border-white overflow-hidden"
        >
          {isPlaying ? (
            <Video
              ref={videoRef}
              source={{
                uri:
                  singleMovie?.video ??
                  "https://www.w3schools.com/html/mov_bbb.mp4",
              }}
              style={{ width: "100%", height: videoHeight }}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              shouldPlay
            />
          ) : (
            <TouchableOpacity
              onPress={() => setIsPlaying(true)}
              className="flex-1 justify-center items-center bg-black"
            >
              <Ionicons name="play" size={48} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default watch;
