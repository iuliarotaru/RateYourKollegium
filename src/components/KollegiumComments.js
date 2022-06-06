import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import React from "react";
import { userAtom } from "../atoms/UserAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import KollegiumComment from "./KollegiumComment";
import PrimaryButton from "./PrimaryButton";
import * as ImagePicker from "expo-image-picker";
import { addCommentsToKollegium } from "../functions/KollegiumsFunctions";

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
              <Text>{`Reviews(${kollegium?.comments.length})`}</Text>
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
              <Button
                onPress={() => handleFileInput()}
                title={commentImageUri ? "Remove Image" : "Upload Image"}
              ></Button>
              {commentImageUri && (
                <Image
                  source={{ uri: commentImageUri }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <TextInput
                onChangeText={setComment}
                value={comment}
                placeholder="Add a comment"
              />
              <StarRating rating={rating} setRating={setRating} />
              <Button
                onPress={() => handleComment()}
                title="Add a comment"
              ></Button>
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
  writeReview: {
    marginHorizontal: 20,
  },
});
