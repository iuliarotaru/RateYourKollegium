import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";
import { userAtom } from "../atoms/UserAtom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import StarRating from "./StarRating";
import KollegiumComment from "./KollegiumComment";
import PrimaryButton from "./PrimaryButton";
import * as ImagePicker from "expo-image-picker";
import { addCommentsToKollegium } from "../functions/KollegiumsFunctions";
import { Colors } from "../styles/Theme";
import CustomText from "./CustomText";

const KollegiumComments = ({
  givenComment,
  kollegium,
  setCommentsCoords,
  kollegiumRating,
}) => {
  const [user, setUser] = useRecoilState(userAtom);

  const [comment, setComment] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [commentImageUri, setCommentImageUri] = useState(null);
  const [rating, setRating] = useState(0);

  const [writeReview, setWriteReview] = useState(false);

  const handleComment = () => {
    Keyboard.dismiss();
    if (comment.length > 0) {
      addCommentsToKollegium(
        comment,
        commentImage,
        rating,
        user.username,
        kollegium.id
      );
      setComment("");
      setCommentImage(null);
      setCommentImageUri(null);
      setRating(0);
    } else {
      Alert.alert("Error", "add a comment");
    }
  };

  const handleFileInput = async () => {
    if (commentImageUri) {
      setCommentImage(null);
      setCommentImageUri(null);
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const fetchResponse = await fetch(result.uri);
        const fileBlob = await fetchResponse.blob();
        setCommentImage(fileBlob);
        setCommentImageUri(result.uri);
      }
    }
  };

  const toggleWriteReviewVisibility = () => {
    if (!writeReview) {
      setWriteReview(true);
    } else {
      setWriteReview(false);
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        setCommentsCoords(event.nativeEvent.layout.y);
      }}
    >
      {user && (
        <View>
          <View style={styles.writeReview}>
            <View style={styles.writeReviewTopButton}>
              <CustomText
                style={styles.sectionTitle}
              >{`Reviews(${kollegium?.comments.length})`}</CustomText>
              <StarRating rating={kollegiumRating} setRating={null} />
            </View>

            <PrimaryButton
              onPress={toggleWriteReviewVisibility}
              title="Write a review"
              style={{ maxWidth: "100%" }}
            ></PrimaryButton>
          </View>
          {writeReview && (
            <View style={styles.writeReview}>
              <CustomText style={styles.sectionTitle}>
                Add an image of the kollegium
              </CustomText>
              <TouchableOpacity onPress={() => handleFileInput()}>
                <View style={styles.imageUploadContainer}>
                  <FontAwesome name="camera" size={25} />
                  <CustomText style={styles.imageUploadText}>
                    {commentImageUri
                      ? "Click here to remove"
                      : "Click here to upload"}
                  </CustomText>
                </View>
              </TouchableOpacity>
              {commentImageUri && (
                <Image
                  source={{ uri: commentImageUri }}
                  style={styles.commentImage}
                />
              )}
              <CustomText style={[styles.sectionTitle]}>
                Write a review
              </CustomText>
              <TextInput
                onChangeText={setComment}
                value={comment}
                placeholder="Please write a descriptive review based on your experience"
                style={styles.commentInput}
                multiline
                numberOfLines={20}
              />
              <CustomText style={[styles.sectionTitle]}>
                Rate your overall experience
              </CustomText>

              <View style={styles.commentRatingContainer}>
                <StarRating rating={rating} setRating={setRating} size={25} />
                <PrimaryButton
                  onPress={() => handleComment()}
                  title="Post"
                  style={{
                    width: "fit-content",
                    paddingHorizontal: 40,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      )}
      {kollegium?.comments.map((comment, index) => {
        return <KollegiumComment comment={comment} key={`comment-${index}`} />;
      })}
    </View>
  );
};

export default KollegiumComments;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  writeReview: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  writeReviewTopButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  imageUploadContainer: {
    backgroundColor: "#F9EFE6",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    borderRadius: 20,
    marginVertical: 20,
  },
  imageUploadText: {
    marginTop: 10,
    color: "#666666",
  },
  commentImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  commentInput: {
    backgroundColor: Colors.light,
    padding: 20,
    borderRadius: 25,
    minHeight: 125,
    paddingTop: 25,
    marginVertical: 20,
  },
  commentRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
