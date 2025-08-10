import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Movie } from "@/interfaces/interfaces";
import { Link, useRouter } from "expo-router";
import { icons } from "@/constants/icons";

type Props = {
  item: Movie;
};

const Card = ({ item }: Props) => {
  const router = useRouter();
  // console.log("id:", item?.id);
  const handlePress = () => {
    router.push(`/movies/${item?.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="w-full">
      <Image
        source={{
          uri: `${item?.image && item?.image}`,
        }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
        {item?.name}
      </Text>
      <View className="flex-row items-center justify-between mt-1">
        <View className=" flex-row mt-[4px] gap-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs font-bold text-white uppercaser">
            {item?.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(Card);
