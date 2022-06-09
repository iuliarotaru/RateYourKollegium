import {
  StyleSheet,
  View,
  Image,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { getImageUrl } from "../functions/KollegiumsFunctions";
import ImageViewer from "react-native-image-zoom-viewer";

const CustomImage = ({ path, width, height }) => {
  const [image, setImage] = useState("");
  const [showFullScreen, setShowFullScreen] = useState(false);

  //Fetch the image from url when the component is mounted
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
        <View>
          <TouchableOpacity onPress={() => setShowFullScreen(true)}>
            <Image
              source={{ uri: image }}
              style={{ width: width, height: height }}
            />
          </TouchableOpacity>
          {/* Image Lightbox implementation */}
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
