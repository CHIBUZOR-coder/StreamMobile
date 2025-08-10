import Card from "@/components/card";
import SearchBar from "@/components/searchBar";
import TrendingCard from "@/components/trendingCard";
import { images } from "@/constants/images";
import { Movie } from "@/interfaces/interfaces";
import { useMovieStore } from "@/store/useMovieStore";
import { useTrendStore } from "@/store/useTrendingMovies";

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  RefreshControl,
} from "react-native";

export default function Index() {
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMovies("api/getMovies");
    await getTrendingMovies("getTrending");
    setRefreshing(false);
  };

  const router = useRouter();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { movies, fetchMovies, loading, error } = useMovieStore();
  const { getTrendingMovies, trendingmovies, trendLoading, trendeError } =
    useTrendStore();

  useEffect(() => {
    fetchMovies("api/getMovies"); // fetches popular movies
  }, []);
  useEffect(() => {
    getTrendingMovies("getTrending"); // fetches popular movies
  }, []);

  useEffect(() => {
    // console.log("Fetched Movies:", movies);
    // console.log("Fetched casts:", casts);
    console.log("Fetch Error:", error);
  }, [movies, error]); // log whenever movies or error changes

  return (
    <View className="flex-1 bg-primary relative bg-cover bg-lig bg-center">
      <Image source={images.bg} className="absolute w-full h-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar barStyle="light-content" />
        <Image
          source={{
            uri: "https://res.cloudinary.com/dtjgj2odu/image/upload/v1739151976/logoround_awixqx.png",
          }}
          className=" mx-auto w-16 h-16 mt-20"
        />

        {loading || trendLoading ? (
          <>
            {refreshing === false &&
            loading === true &&
            trendLoading === true ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-20 self-center"
              />
            ) : (
              <></>
            )}
          </>
        ) : error || trendeError ? (
          <Text>{error || trendeError}</Text>
        ) : (
          <View className="flex-1 mt-5 mb-16">
            <SearchBar
              onPress={() =>
                router.push({
                  pathname: "/search",
                })
              }
              placeholder="Search for a movie"
            />

            {trendingmovies && (
              <>
                <Text className="text-lg text-white font-bold mt-5">
                  Trending Movies
                </Text>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingmovies}
                  className="mt-2"
                  renderItem={({ item, index }) => (
                    <TrendingCard item={item} index={index} />
                  )}
                />
              </>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5">
                Latest Movies
              </Text>
            </>
            <FlatList
              data={movies}
              renderItem={({ item }) => (
                <View className="w-1/2  px-3 mb-4">
                  <Card item={item} />
                </View>
              )}
              keyExtractor={(item) => item?.id.toString()}
              numColumns={2}
              className="mt-2"
              scrollEnabled={false}
              initialNumToRender={6}
              maxToRenderPerBatch={8}
              windowSize={5}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
