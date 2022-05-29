import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getImageUrl } from "../functions/KollegiumsFunctions";
import { ActivityIndicator } from "react-native";

const CustomImage = ({ path }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    getImageUrl(path, setImage);
  });

  return (
    <View>
      {image.length > 0 && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {!image && <ActivityIndicator></ActivityIndicator>}
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({});
