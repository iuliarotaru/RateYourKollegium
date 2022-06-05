import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getImageUrl } from "../functions/KollegiumsFunctions";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

const CustomImage = ({ path, width, height }) => {
  const [image, setImage] = useState("");
  const [showFullScreen, setShowFullScreen] = useState(false);

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
        <View>
          <TouchableOpacity onPress={() => setShowFullScreen(true)}>
            <Image
              source={{ uri: image }}
              style={{ width: width, height: height }}
            />
          </TouchableOpacity>
          <Modal
            visible={showFullScreen}
            transparent={true}
            onRequestClose={() => setShowFullScreen(false)}
          >
            <ImageViewer
              imageUrls={[{ url: image }]}
              enableSwipeDown={true}
              onSwipeDown={() => setShowFullScreen(false)}
              onClick={() => setShowFullScreen(false)}
            />
          </Modal>
        </View>
      )}
      {!image && <ActivityIndicator></ActivityIndicator>}
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({});
