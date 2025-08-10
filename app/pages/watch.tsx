import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";


const watch = () => {
  return (
    <ScrollView className="flex-1 relative">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
    </ScrollView>
  );
};

export default watch;
