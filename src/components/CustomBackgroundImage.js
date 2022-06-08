import { View, ActivityIndicator, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import { getImageUrl } from "../functions/KollegiumsFunctions";

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
      {image?.length > 0 && (
        <ImageBackground source={{ uri: image }} style={style}>
          {children}
        </ImageBackground>
      )}
      {!image && <ActivityIndicator></ActivityIndicator>}
    </View>
  );
};

export default CustomBackgroundImage;
