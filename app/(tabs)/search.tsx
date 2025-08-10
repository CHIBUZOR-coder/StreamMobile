import Card from "@/components/card";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Movie } from "@/interfaces/interfaces";
import { useMovieStore } from "@/store/useMovieStore";

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const search = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [isQuery, setIsQuery] = useState<string | null>(null);
  const [isNomatch, setIsNomatch] = useState<string | null>(null);

  const router = useRouter();

  const {
    movies,
    fetchMovies,
    loading,
    error,
    addTrending,
    searchMovies,
    searchResults,
  } = useMovieStore();
  const [hasAddedTrending, setHasAddedTrending] = useState(false);

  useEffect(() => {
    if (!isFetch || !isQuery?.trim()) return;

    const delayDebounce = setTimeout(() => {
      searchMovies("api/getMovies", isQuery);
      setIsFetch(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [isFetch, isQuery]);

  useEffect(() => {
    if (!isQuery?.trim() || searchResults?.length === 0 || hasAddedTrending)
      return;

    const topMovie = searchResults[0];

    if (topMovie?.id) {
      const debounce = setTimeout(() => {
        console.log("Adding to trending:", topMovie.id);
        addTrending("addTrending", topMovie.id);
      }, 700);

      return () => clearTimeout(debounce);
    }
  }, [searchResults, isQuery]);

  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2 mt-16 w-[95%] mb-4 mx-auto">
        <Image
          source={icons.search}
          className="w-4 h-4 "
          resizeMode="contain"
          tintColor={"#ab8bff"}
        />

        <TextInput
          placeholder={""}
          placeholderTextColor={"#ab8bff"}
          className="flex-1 ml-2 text-white"
          onChangeText={(text) => {
            setIsQuery(text);
            console.log(text);

            // if (movies.length === 0) {
            //   setIsNomatch(`No movies matched {isQuery}`);
            //   return;
            // }

            setIsFetch(true); // Trigger fetch
          }}
        />
      </View>
      <FlatList
        data={isQuery?.trim() ? searchResults : []}
        renderItem={({ item, index }) => {
          const isLastOdd =
            searchResults.length % 2 !== 0 &&
            index === searchResults.length - 1;

          return (
            <View
              className={` ${
                isLastOdd ? "w-[70%]" : "w-1/2"
              } flex justify-center items-center px-3 mb-4`}
            >
              <Card item = {item} />
            </View>
          );
        }}
        keyExtractor={(item) => item?.id.toString()}
        numColumns={2}
        className="mt-2 mb-14"
        scrollEnabled={true}
        contentContainerStyle={{
          alignItems: "center",
        }}
        ListHeaderComponent={
          <>
            <View className="mb-10">
              {loading ? (
                <>
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="mt-20 self-center"
                  />
                </>
              ) : isQuery?.trim() && searchResults?.length > 0 ? (
                <View>
                  <Text className="text-placeholder font-semibold text-lg">
                    Search results for {isQuery}
                  </Text>
                </View>
              ) : isQuery?.trim() && searchResults?.length === 0 ? (
                <Text className="text-placeholder font-semibold text-lg text-center">
                  No result Mantch {isQuery}
                </Text>
              ) : (
                <Text className="text-placeholder font-semibold text-lg text-center">
                  Start typing to search for movies
                </Text>
              )}
            </View>
          </>
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
