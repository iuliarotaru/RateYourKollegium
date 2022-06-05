import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getImageUrl } from "../functions/KollegiumsFunctions";
import { ActivityIndicator } from "react-native";
import { ImageBackground } from "react-native";

const CustomBackgroundImage = ({ path, children, style }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const handleGetImageUrl = async () => {
      const imageUrl = await getImageUrl(path);
      if (isMounted) {
        setImage(imageUrl);
      }
    };

    handleGetImageUrl();

    return () => {
      isMounted = false;
    };
  });

  return (
    <View>
      {image.length > 0 && (
        <ImageBackground source={{ uri: image }} style={style}>
          {children}
        </ImageBackground>
      )}
      {!image && <ActivityIndicator></ActivityIndicator>}
    </View>
  );
};

export default CustomBackgroundImage;

const styles = StyleSheet.create({});
