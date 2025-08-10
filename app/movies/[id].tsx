import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState, ReactElement } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMovieStore } from "@/store/useMovieStore";
import { images } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import Carousel from "react-native-reanimated-carousel";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAvoidingView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "@/components/card";
import { Movie } from "@/interfaces/interfaces";

interface Casts {
  id: number;
  name: string;
  image: string;
  role: string;
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { singleLoad, singleError, movies, singleMovie, getSingleMovie } =
    useMovieStore();
  const [casts, setCasts] = useState<Casts[]>([]);
  // console.log("id", id);
  const { width: screenWidth } = Dimensions.get("window");
  const router = useRouter();
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [rating, setRating] = useState(""); // default rating
  const [reviewText, setReviewText] = useState(""); // for the textarea
  const [stars, setStars] = useState<ReactElement[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<Movie[] | null>(null);

  const makeStart = (length: number) => {
    const starsArray = [];
    for (let i = 0; i < length; i++) {
      starsArray.push(
        <View className="flex flex-row gap-4">
          <Ionicons key={i} name="star" size={16} color="yellow" />
        </View>
      );
    }

    setStars(starsArray);
  };

  useEffect(() => {
    if (id) {
      const movieId = parseInt(id);
      getSingleMovie("getSingleMovie", movieId);
      console.log("id:", id);
    }
  }, [id]);

  useEffect(() => {
    if (singleMovie) {
      setCasts(singleMovie?.casts);
      // console.log(singleMovie?.casts);
    }
  }, [singleMovie]);
  useEffect(() => {
    // console.log("Moviesssssssss:", movies);

    const related = movies?.filter(
      (item) => item?.categoryId === singleMovie?.categoryId
    );

    console.log("related:", related);

    setRelatedMovies(related);
  }, [movies]);

  // const casts = singleMovie?.casts || []

  // console.log("cast:", casts);

  function getYouTubeVideoId(url?: string) {
    if (!url) return "";
    const regex = /(?:\?v=|\/embed\/|\.be\/)([\w\-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url; // fallback if it's already the ID
  }

  return (
    <SafeAreaView className="flex-1 relative bg-cover bg-center bg-primary ">
      {/* <Image source={} className="absolute w-full h-full z-0" /> */}

      <ScrollView className="" keyboardShouldPersistTaps="handled">
        <Image source={images.bg} className="absolute w-full h-full z-0" />

        {singleLoad ? (
          <>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-20 self-center"
            />
          </>
        ) : (
          <View className="relative   z-20 ">
            <Image
              source={{ uri: singleMovie?.image }}
              className="absolute w-full h-full z-0 opacity-30"
              resizeMode="cover"
            />

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

            <View className="p-4 w-full">
              <Text className="text-2xl  text-white font-semibold mx-auto mt-24 ">
                {singleMovie?.name}
              </Text>

              <View className="rounded-lg overflow-hidden h-[300px] w-[200px] relative mx-auto mt-6">
                <Image
                  source={{ uri: singleMovie?.image }}
                  className="absolute w-full h-full "
                  resizeMode="cover"
                />
              </View>
              <View
                className="w-[100%] mx-auto border-2 border-dry mt-10 rounded-md "
                style={{
                  boxShadow: "0px 0px 6px 3px rgba(255, 255, 255, 0.5)",
                }}
              >
                {Platform.OS !== "web" && (
                  <YoutubePlayer
                    height={180}
                    play={false}
                    videoId={getYouTubeVideoId(singleMovie?.trailer)}
                  />
                )}
              </View>
              <View className="flex flex-row justify-center items-center gap-8 mt-4 ">
                <Text className="bg-subMain p-[4px] font-semibold text-white">
                  HD4K
                </Text>
                <View className="flex flex-row justify-center items-center gap-[2px]">
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color="rgba(242, 0, 0, 1)"
                  />

                  <View>
                    <Text className="text-white">{singleMovie?.year}</Text>
                  </View>
                </View>
                <View className="flex flex-row justify-center items-center gap-[2px]">
                  <Ionicons name="time" size={18} color="rgba(242, 0, 0, 1)" />

                  <View>
                    <Text className="text-white">{singleMovie?.time}</Text>
                  </View>
                </View>
              </View>

              <Text className="text-white mt-2 leading-6">
                {singleMovie?.description}
              </Text>
            </View>

            <View className="bg-primary p-4 flex flex-col justify-center items-center rounded-md gap-4 border-dryGray border-2 w-[70%] mx-auto">
              <View className="flex flex-row gap-2 ">
                <View className=" border-r-gray-500 border-r-2 w-[20%] flex justify-center items-center ">
                  <Ionicons
                    name="share"
                    size={20}
                    color={"rgb(255, 255, 255)"}
                  />
                </View>

                <Text className="col-span-2 text-white w-[80%]">
                  Language: {singleMovie?.language}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/pages/watch", // This should match the file name of your watch page
                    params: {
                      url: singleMovie?.id, // Pass the trailer URL
                    },
                  });
                }}
                className="w-[80%] flex flex-row bg-dry border-2 gap-3 rounded-[2rem] border-subMain p-2 justify-center items-center"
              >
                <Text className="text-white">
                  <Ionicons name="play" size={18} color={"white"} />
                </Text>
                <Text className="text-white">Watch</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-subMain w-[70%] my-8  mx-auto p-4 rounded-sm text-white flex flex-row justify-center items-center gap-4">
              <Text className="text-white font-semibold">Download</Text>

              <Text>
                <Ionicons name="download" size={18} color={"white"} />
              </Text>
            </View>
          </View>
        )}

        {singleMovie && (
          <View className="p-4 ">
            <View className="flex flex-row justify-start items-center gap-4 ">
              <Text className="text-white font-semibold text-lg">Casts</Text>
              <Text className="">
                <Ionicons name="people" size={18} color="rgba(242, 0, 0, 1)" />
              </Text>
            </View>
            <View
              className="border-2 border-dry mt-2 relative"
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setCarouselWidth(width); // capture parent width
              }}
              style={{
                boxShadow: "0px 0px 6px 3px rgba(255, 255, 255, 0.5)",
                width: "100%",
              }}
            >
              {carouselWidth > 0 && (
                <Carousel
                  width={carouselWidth} // ✅ dynamic width
                  height={400}
                  autoPlay
                  loop
                  data={singleMovie ? casts : []}
                  scrollAnimationDuration={1000}
                  autoPlayInterval={3000}
                  renderItem={({ item }: any) => (
                    <View className="relative h-[400px] w-full">
                      <Image
                        source={{ uri: item?.cast?.image }}
                        className="absolute w-full h-full "
                        resizeMode="cover"
                      />

                      <View className="bg-dry absolute bottom-0 left-0 w-full flex justify-center items-center p-4">
                        <Text className="text-lg font-semibold text-white">
                          {item.cast.name}
                        </Text>
                        <Text className="text-white text-sm italic">
                          {item.cast.role}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          </View>
        )}

        <View className="flex flex-row gap-4 px-4 mt-12   justify-start items-center">
          <Text>
            <Ionicons name="bookmark" color={"red"} size={18} />
          </Text>
          <Text className="text-lg text-white font-semibold">Reviews</Text>
        </View>
        <View className="px-4">
          <View className="bg-dark-100 px-3 pt-8 pb-3 mt-2">
            <View className="flex gap-4">
              <Text className="text-xl text-white font-semibold ">
                Review {singleMovie?.name}
              </Text>
              <Text className="text-gray-500 leading-6">
                Write a review for this movie. It will be Posted on this page.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dignissimos placeat perspiciatis quisquam enim quibusdam ipsa
                sed, consequatur minima natus sapient
              </Text>
            </View>
            <View className="mt-8">
              <Text className="text-gray-500 font-semibold ">
                Select Rating
              </Text>
              <View className="bg-white rounded-md mt-2">
                <Picker
                  selectedValue={rating}
                  onValueChange={(itemValue) => {
                    setRating(itemValue);
                    makeStart(Number(itemValue)); // ✅ generate stars based on selected value
                  }}
                >
                  <Picker.Item label="Rate Movie" value="" />
                  <Picker.Item label="0 - Poor" value="0" />
                  <Picker.Item label="2 - Fair" value="2" />
                  <Picker.Item label="3 - Very Good" value="3" />
                  <Picker.Item label="4 - Excellent" value="4" />
                  <Picker.Item label="5 - Masterpiece" value="5" />
                </Picker>
              </View>

              <View className="my-2">
                <Text>{stars}</Text>
              </View>

              <Text className="text-gray-500 mt-4 text-lg font-semibold ">
                Message
              </Text>
              <View className="bg-primary h-[200px] mt-2 border-2 border-white">
                <TextInput
                  className="w-full h-full flex justify-start text-white p-2"
                  multiline
                  placeholder="Enter your message"
                  placeholderTextColor={"gray"}
                  value={reviewText} // ✅ bind state
                  onChangeText={setReviewText} // ✅ update state
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  console.log("Review submitted:", reviewText, rating)
                }
                className="bg-subMain w-full mx-auto p-4 rounded-sm justify-center items-center mt-2"
              >
                <Text className="text-white font-semibold">Submit</Text>
              </TouchableOpacity>

              <View className="mt-12 flex gap-3 pb-8">
                <Text className="text-white font-semibold text-xl">
                  Reviews
                </Text>

                <View className="rounded-[1rem] border-white border-2 p-4 w-[70%] ">
                  <Text className="text-white">No Reviews</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-12 ">
          <View className="px-4 flex flex-row items-center gap-5">
            <Text>
              <Ionicons name="albums" color={"red"} size={18} />
            </Text>
            <Text className="text-white text-lg font-semibold">
              Related Movies
            </Text>
          </View>
          {relatedMovies && (
            <>
              <FlatList
                data={relatedMovies}
                renderItem={({ item }) => (
                  <View className="w-1/2  px-4 mb-6">
                    <Card item={item} />
                  </View>
                )}
                numColumns={2}
                className="mt-4"
                scrollEnabled={false}
                initialNumToRender={6}
                maxToRenderPerBatch={8}
                windowSize={5}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MovieDetails;
