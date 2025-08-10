import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Movie } from "@/interfaces/interfaces";
import { Link, useRouter } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = {
  item: Movie;
  index: number;
};

export default function TrendingCard({ item, index }: Props) {
  const router = useRouter();
  // console.log("id:", item?.id);
  const handlePress = () => {
    console.log(item?.id);

   router.push(`/movies/${item?.movieId}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="w-32  relative">
      <Image
        className="w-full h-48 rounded-lg"
        resizeMode="cover"
        source={{ uri: item?.image }}
      />

      <View className="absolute w-full h-full top-0 left-0 opacity-30 bg-black"></View>
      <View className="absolute bottom-8 left-[-10px] px-2 py-1 rounded-full ">
        <MaskedView
          maskElement={
            <View className="w-16 h-16 items-center justify-center">
              <Text className="font-bold text-black text-5xl">{index + 1}</Text>
            </View>
          }
        >
          {/* Color that will be revealed in the shape of the number */}
          <View className="bg-white w-16 h-16" />
        </MaskedView>
      </View>

      <View className="text-sm font-bold mt-2 ">
        <Text className="text-light-200" numberOfLines={1}>
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
